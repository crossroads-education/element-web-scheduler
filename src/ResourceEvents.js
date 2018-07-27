import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import AddMore from './AddMore'
import Summary from './Summary'
import SelectedArea from './SelectedArea'
import {ViewTypes, DATETIME_FORMAT, SummaryPos} from './index'
import {getPos} from './Util'

class ResourceEvents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelecting: false,
            left: 0,
            width: 0,
        }
    }

    static propTypes = {
        resourceEvents: PropTypes.object.isRequired,
        schedulerData: PropTypes.object.isRequired,
        dndSource: PropTypes.object.isRequired,
        onSetAddMoreState: PropTypes.func,
        updateEventStart: PropTypes.func,
        updateEventEnd: PropTypes.func,
        moveEvent: PropTypes.func,
        conflictOccurred: PropTypes.func,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        newEvent: PropTypes.func,
        eventItemTemplateResolver: PropTypes.func,
    }

    componentDidMount() {
        const {schedulerData} = this.props;
        const {config} = schedulerData;
        if(config.creatable === true) {
            this.eventContainer.addEventListener('mousedown', this.initDrag, false);
        }
    }

    componentWillReceiveProps(np) {
        this.eventContainer.removeEventListener('mousedown', this.initDrag, false);
        if(np.schedulerData.config.creatable)
            this.eventContainer.addEventListener('mousedown', this.initDrag, false);
    }

    initDrag = (ev) => {
        ev.stopPropagation();
        if(ev.buttons !== undefined && ev.buttons !== 1) return;
        if((ev.srcElement || ev.target) !== this.eventContainer) return;

        const {schedulerData} = this.props;
        let cellWidth = schedulerData.getContentCellWidthInPixels();
        let pos = getPos(this.eventContainer);
        let startX = ev.clientX - pos.x;
        let leftIndex = Math.floor(startX/cellWidth);
        let left = leftIndex*cellWidth;
        let rightIndex = Math.ceil(startX/cellWidth);
        let width = (rightIndex - leftIndex)*cellWidth;

        this.setState({
            startX: startX,
            left: left,
            leftIndex: leftIndex,
            width: width,
            rightIndex: rightIndex,
            isSelecting: true
        });

        document.documentElement.addEventListener('mousemove', this.doDrag, false);
        document.documentElement.addEventListener('mouseup', this.stopDrag, false);
    }

    doDrag = (ev) => {
        ev.stopPropagation();

        const { startX } = this.state;
        const {schedulerData} = this.props;
        const {headers} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidthInPixels();
        let pos = getPos(this.eventContainer);
        let currentX = ev.clientX - pos.x;
        let leftIndex = Math.floor(Math.min(startX, currentX)/cellWidth);
        leftIndex = leftIndex < 0 ? 0 : leftIndex;
        let left = leftIndex*cellWidth;
        let rightIndex = Math.ceil(Math.max(startX, currentX)/cellWidth);
        rightIndex = rightIndex > headers.length ? headers.length : rightIndex;
        let width = (rightIndex - leftIndex)*cellWidth;

        this.setState({
            leftIndex: leftIndex,
            left: left,
            rightIndex: rightIndex,
            width: width,
            isSelecting: true
        });
    }

    stopDrag = (ev) => {
        ev.stopPropagation();
        const {schedulerData, newEvent, resourceEvents} = this.props;
        const {headers, events, config, viewType, localeMoment} = schedulerData;
        const { leftIndex, rightIndex } = this.state;
        document.documentElement.removeEventListener('mousemove', this.doDrag, false);
        document.documentElement.removeEventListener('mouseup', this.stopDrag, false);
        console.log(leftIndex, rightIndex);
        let startTime = headers[leftIndex].time;
        let endTime = resourceEvents.headerItems[rightIndex - 1].end;
        if(viewType !== ViewTypes.Day)
            endTime = localeMoment(resourceEvents.headerItems[rightIndex - 1].start).hour(23).minute(59).second(59).format(DATETIME_FORMAT);
        let slotId = resourceEvents.slotId;
        let slotName = resourceEvents.slotName;

        this.setState({
            startX: 0,
            leftIndex: 0,
            left: 0,
            rightIndex: 0,
            width: 0,
            isSelecting: false
        });

        let hasConflict = false;
        if(config.checkConflict){
            let start = localeMoment(startTime),
                end = localeMoment(endTime);

            events.forEach((e) =>{
                if(schedulerData._getEventSlotId(e) === slotId) {
                    let eStart = localeMoment(e.start),
                        eEnd = localeMoment(e.end);
                    if((start >= eStart && start < eEnd) || (end > eStart && end <= eEnd) || (eStart >= start && eStart < end) || (eEnd > start && eEnd <= end))
                        hasConflict = true;
                }
            });
        }

        if(hasConflict) {
            const {conflictOccurred} = this.props;
            if(conflictOccurred != undefined){
                conflictOccurred(schedulerData, 'New', {
                    id: undefined,
                    start: startTime,
                    end: endTime,
                    slotId: slotId,
                    slotName: slotName,
                    title: undefined,
                });
            }
            else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
        }
        else {
            if(newEvent != undefined)
                newEvent(schedulerData, slotId, slotName, startTime, endTime);
        }
    }

    render() {
        const {resourceEvents, schedulerData, connectDropTarget, dndSource} = this.props;
        const {viewType, startDate, endDate, config, localeMoment} = schedulerData;
        const {isSelecting, left, width} = this.state;
        let cellWidth = schedulerData.getContentCellWidth();
        let cellMaxEvents = schedulerData.getCellMaxEvents();
        let rowWidth = schedulerData.getContentTableWidth();
        let DnDEventItem = dndSource.getDragSource();

        let selectedArea = isSelecting ? <SelectedArea {...this.props} left={left} width={width} /> : <div />;

        let eventList = {};

        resourceEvents.headerItems.forEach((headerItem, index) => {

            if (headerItem.count > 0 || headerItem.summary != undefined) {
                const layerCount = {};
                let isTop = config.summaryPos === SummaryPos.TopRight || config.summaryPos === SummaryPos.Top || config.summaryPos === SummaryPos.TopLeft;
                let marginTop = resourceEvents.hasSummary && isTop ? config.eventItemTopMargin + config.eventItemLineHeight : config.eventItemTopMargin;
                let renderEventsMaxIndex = headerItem.addMore === 0 ? cellMaxEvents : headerItem.addMoreIndex;
                const leftCorrection = (index === 0) ? 1 : 2;
                const widthCorrection = (index === 0) ? 1 : 2;
                headerItem.events.forEach((evt, idx) => {
                    if(idx < renderEventsMaxIndex && evt !== undefined && evt.render) {
                        let durationStart = localeMoment(startDate);
                        let durationEnd = localeMoment(endDate).add(1, 'days');
                        if(viewType === ViewTypes.Day){
                            durationStart = localeMoment(startDate).add(config.dayStartFrom, 'hours');
                            durationEnd = localeMoment(endDate).add(config.dayStopTo + 1, 'hours');
                        }
                        let layer = (config.layers) ? evt.eventItem.layer : 0;
                        if (!eventList[layer]) eventList[layer] = [];
                        let eventStart = localeMoment(evt.eventItem.start);
                        let eventEnd = localeMoment(evt.eventItem.end);
                        let isStart = eventStart >= durationStart;
                        let isEnd = eventEnd <= durationEnd;
                        let left = index*cellWidth;
                        let width = evt.span * cellWidth;
                        let offset = idx;
                        if(config.layers) {
                            if (!layerCount[evt.eventItem.layer]) layerCount[evt.eventItem.layer] = 0;
                            offset = layerCount[evt.eventItem.layer];
                            layerCount[evt.eventItem.layer]++;
                        }
                        if(left + width >= 100) {
                            width = 100 - left;
                        }
                        let top = offset * config.eventItemLineHeight;
                        let eventItem = <DnDEventItem
                                            {...this.props}
                                            key={evt.eventItem.id}
                                            eventItem={evt.eventItem}
                                            isStart={isStart}
                                            isEnd={isEnd}
                                            isInPopover={false}
                                            left={left}
                                            width={width}
                                            top={top}
                                            leftIndex={index}
                                            rightIndex={index + evt.span}
                                            widthExtra={(config.eventItemRightMargin - config.eventItemLeftMargin - widthCorrection)}
                                            leftExtra={(config.eventItemLeftMargin - leftCorrection)}
                                        />
                        eventList[layer].push(eventItem);
                    }
                });

                if(headerItem.addMore > 0) {
                    let left = index * cellWidth;
                    let width = cellWidth;
                    if (left + width >= 100) {
                        width = 100 - left;
                    }
                    let top = marginTop + headerItem.addMoreIndex*config.eventItemLineHeight;
                    let addMoreItem = <AddMore
                                            {...this.props}
                                            key={headerItem.time}
                                            headerItem={headerItem}
                                            number={headerItem.addMore}
                                            left={left}
                                            width={width}
                                            top={top}
                                            clickAction={this.onAddMoreClick}
                                        />;
                    const layer = (config.layers) ? config.interactiveLayer : 0;
                    if (!eventList[layer]) eventList[layer] = [];              
                    eventList[layer].push(addMoreItem);
                }

                if(headerItem.summary != undefined) {
                    let top = isTop ? 1 : resourceEvents.rowHeight - config.eventItemLineHeight + 1;
                    let left = index * cellWidth + config.eventItemLeftMargin + xCorrection;
                    let width = Math.max(0, evt.span * cellWidth + 1 - config.eventItemRightMargin - config.eventItemLeftMargin - xCorrection);
                    let key = `${resourceEvents.slotId}_${headerItem.time}`;
                    let summary = <Summary key={key} schedulerData={schedulerData} summary={headerItem.summary} left={left} width={width} top={top} />;
                    

                    const layer = (config.layers) ? config.interactiveLayer : 0;
                    
                    eventList[layer].push(summary);
                }
            }
        });

        let eventContent;
        if(config.layers) {
            const content = config.layers.map(layer => {
                if (layer !== config.interactiveLayer) {
                    return (
                        (eventList[layer]) ? (
                            <div ref={this.eventContainerRef} className="event-container" style={{ position: "absolute", height: resourceEvents.rowHeight, zIndex: layer, pointerEvents: "none", width: "100%" }}>
                                {eventList[layer]}
                            </div>
                        ) : null
                    )
                }
            });
            content.push(
                connectDropTarget(
                    <div ref={this.eventContainerRef} className="event-container" style={{ height: resourceEvents.rowHeight, zIndex: config.interactiveLayer}}>
                        {selectedArea}
                        {eventList[config.interactiveLayer]}
                    </div>
                )
            );
            eventContent = content;
        } else {
            eventContent = connectDropTarget(
                <div ref={this.eventContainerRef} className="event-container" style={{ height: resourceEvents.rowHeight }}>
                    {selectedArea}
                    {eventList[0]}
                </div>
            );
        }

        return (
            <div style={{position: "relative" }}>
                {eventContent}
            </div>
        );
    }

    onAddMoreClick = (headerItem) => {
        const {onSetAddMoreState, resourceEvents, schedulerData} = this.props;
        if(!!onSetAddMoreState){
            const {config} = schedulerData;
            let cellWidth = schedulerData.getContentCellWidth();
            let index = resourceEvents.headerItems.indexOf(headerItem);
            if(index !== -1){
                let left = index*(cellWidth -1);
                let pos = getPos(this.eventContainer);
                left = left + pos.x;
                let top = pos.y;
                let height = (headerItem.count + 1) * config.eventItemLineHeight + 20;

                onSetAddMoreState({
                    headerItem: headerItem,
                    left: left,
                    top: top,
                    height: height
                });
            }
        }
    }

    eventContainerRef = (element) => {
        this.eventContainer = element;
    }
}

export default ResourceEvents
