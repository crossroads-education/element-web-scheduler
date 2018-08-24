import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {Popover} from 'antd';
import EventItemPopover from './EventItemPopover'
import {ViewTypes, DATETIME_FORMAT} from './index'
import injectSheet from "react-jss";
import classNames from "classnames";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const styles = theme => ({
    roundClass: props => {
        return {...props.isStart ? 
            (props.isEnd ? 
                theme.roundAll : 
                theme.roundHead
            ) : 
            (props.isEnd ? 
                theme.roundTail : 
                theme.roundNone 
            )
        };
    },
    eventItem: props => ({
        height: props.schedulerData.config.eventItemHeight,
        backgroundColor: props.eventItem.bgColor || props.schedulerData.config.defaultEventBgColor,
        extend: props.userStyle.eventItem
    }),
    eventItemTitle: {
        marginLeft: "10px",
        lineHeight: props => props.schedulerData.config.eventItemHeight + "px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        overflowText: "ellipsis",
        extend: props => props.userStyle.eventItemTitle
    },
    eventItemContainer: {
        extend: theme.timelineEvent
    },
    startResizer: {
        extend: [{...theme.eventResizer}, {...theme.eventStartResizer}]
    },
    endResizer: {
        extend: [{...theme.eventResizer}, {...theme.eventEndResizer}]
    },
    popoverContainer: {
        "& .ant-popover-inner-content": {
            padding: 0
        },
        "& .ant-popover-arrow": {
            top: "-3px !important"
        },
        padding: 0
    }
});

@injectSheet(styles)
class EventItem extends Component {
    constructor(props) {
        super(props);
        this.popoverRef = React.createRef();
        const {left, top, width} = props;
        this.state = {
            left: left,
            top: top,
            width: width,
        };
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        eventItem: PropTypes.object.isRequired,
        isStart: PropTypes.bool.isRequired,
        isEnd: PropTypes.bool.isRequired,
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        isInPopover: PropTypes.bool.isRequired,
        leftIndex: PropTypes.number.isRequired,
        rightIndex: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        updateEventStart: PropTypes.func,
        updateEventEnd: PropTypes.func,
        moveEvent: PropTypes.func,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText: PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        conflictOccurred: PropTypes.func,
        eventItemTemplateResolver: PropTypes.func,
    }

    componentWillReceiveProps(np) {
        const {left, top, width} = np;
        this.setState({
            left: left,
            top: top,
            width: width,
        });

        this.subscribeResizeEvent(np);
    }

    componentDidMount() {
        this.subscribeResizeEvent(this.props);
    }

    handleOpen = (event) => {
        this.setState({popoverVisible: true});
    }
    
    handleClose = () => {
        this.setState({popoverVisible: false});
    }

    eventClickHandler = () => {
        if (!!this.props.eventItemClick) this.props.eventItemClick(this.props.schedulerData, this.props.eventItem);
        this.handleOpen();
    }

    initStartDrag = (ev) => {
        ev.stopPropagation();
        if (ev.buttons !== undefined && ev.buttons !== 1) return;

        const {schedulerData} = this.props;
        schedulerData._startResizing();
        this.setState({
            startX: ev.clientX
        });

        document.documentElement.addEventListener('mousemove', this.doStartDrag, false);
        document.documentElement.addEventListener('mouseup', this.stopStartDrag, false);
    }

    doStartDrag = (ev) => {
        ev.stopPropagation();

        const {left, width, rightIndex, schedulerData} = this.props;
        const { startX } = this.state;  
        const tableWidth = schedulerData.getContentTableWidth();    

        let delta = (ev.clientX - startX);
        
        let cellWidth = schedulerData.getContentCellWidthInPixels();

        let cellDelta  = Math.floor(delta / cellWidth);

        let cellWidthDelta = cellDelta * cellWidth;
        
        let newLeft = (((left / 100 * tableWidth) + cellWidthDelta) / tableWidth) * 100;
        let newWidth = ((((width / 100) * tableWidth) - cellWidthDelta) / tableWidth) * 100;
        let offset = 0.5;
        let minWidth = ((cellWidth) / tableWidth) * 100;
        let maxWidth = ((rightIndex * cellWidth) / tableWidth) * 100 - offset;
        if (newWidth < minWidth) {
            newWidth = minWidth - offset;
            newLeft = maxWidth - minWidth + offset
        }
        else if (newWidth > maxWidth) {
            newWidth = maxWidth;
            newLeft = offset
        }

        this.setState({left: newLeft, width: newWidth});
    }

    stopStartDrag = (ev) => {
        ev.stopPropagation();
        document.documentElement.removeEventListener('mousemove', this.doStartDrag, false);
        document.documentElement.removeEventListener('mouseup', this.stopStartDrag, false);

        const {width, leftIndex, rightIndex, schedulerData, eventItem, updateEventStart} = this.props;
        schedulerData._stopResizing();
        const {viewType, events, config, localeMoment} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidthInPixels();
        let offset = leftIndex > 0 ? 5 : 6;
        let minWidth = cellWidth - offset;
        let maxWidth = rightIndex * cellWidth - offset;
        const {startX} = this.state;
        let deltaWidth = startX - ev.clientX;
        let newWidth = ((width / 100) * schedulerData.getContentTableWidth()) + deltaWidth;
        let deltaX = ev.clientX - startX;
        let sign = Math.sign(deltaX);
        let count = Math.abs(deltaX) / cellWidth;
        count = (sign > 0) ? Math.floor(count) : Math.ceil(count);
        count = count * sign;
        if (newWidth < minWidth) {
            count = rightIndex - leftIndex - 1;
        } else if (newWidth > maxWidth) {
            count = -leftIndex;
        }
            
        let newStart = localeMoment(eventItem.start).add(viewType === ViewTypes.Day ? count * config.minuteStep : count, viewType === ViewTypes.Day ? 'minutes' : 'days').format(DATETIME_FORMAT);

        let hasConflict = false;
        if (config.checkConflict) {
            let start = localeMoment(newStart),
                end = localeMoment(eventItem.end),
                slotId = schedulerData._getEventSlotId(eventItem);

            for (let e of events) {
                if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                    if (config.layers && e.layer !== eventItem.layer) break;
                    let eStart = localeMoment(e.start),
                        eEnd = localeMoment(e.end);
                    if ((start >= eStart && start < eEnd) || (end > eStart && end <= eEnd) || (eStart >= start && eStart < end) || (eEnd > start && eEnd <= end))
                        hasConflict = true;
                }
            }
        }

        if (hasConflict) {
            const {conflictOccurred, left, top, width} = this.props;
            this.setState({
                left: left,
                top: top,
                width: width,
            });

            if (conflictOccurred != undefined) {
                conflictOccurred(schedulerData, 'StartResize', eventItem);
            }
            else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
            this.subscribeResizeEvent(this.props);
        }
        else {
            if (updateEventStart != undefined)
                updateEventStart(schedulerData, eventItem, newStart);
        }
    }

    initEndDrag = (ev) => {
        ev.stopPropagation();
        if (ev.buttons !== undefined && ev.buttons !== 1) return;

        const {schedulerData} = this.props;
        schedulerData._startResizing();
        this.setState({
            endX: ev.clientX
        });

        document.documentElement.addEventListener('mousemove', this.doEndDrag, false);
        document.documentElement.addEventListener('mouseup', this.stopEndDrag, false);
    }

    doEndDrag = (ev) => {
        ev.stopPropagation();
        const {width, leftIndex, schedulerData} = this.props;
        const {headers} = schedulerData;
        const { endX } = this.state;
        const tableWidth = schedulerData.getContentTableWidth();
        let delta = (ev.clientX - endX);
        let cellWidth = schedulerData.getContentCellWidthInPixels();

        let cellDelta = Math.ceil(delta / cellWidth);

        let cellWidthDelta = cellDelta * cellWidth;

        let newWidth = ((((width/100) * tableWidth) + cellWidthDelta) / tableWidth) * 100;
        let offset = 0.5;
        let minWidth = (cellWidth + offset) / tableWidth * 100;
        let maxWidth = (((headers.length - leftIndex) * cellWidth ) / tableWidth * 100) - offset;
        if (newWidth < minWidth)
            newWidth = minWidth;
        else if (newWidth > maxWidth)
            newWidth = maxWidth;

        this.setState({width: newWidth});
    }

    stopEndDrag = (ev) => {
        ev.stopPropagation();
        document.documentElement.removeEventListener('mousemove', this.doEndDrag, false);
        document.documentElement.removeEventListener('mouseup', this.stopEndDrag, false);

        const {width, leftIndex, rightIndex, schedulerData, eventItem, updateEventEnd} = this.props;
        const widthInPixels = (width / 100) * schedulerData.getContentTableWidth();
        schedulerData._stopResizing();
        const {headers, viewType, events, config, localeMoment} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidthInPixels();

        let offset = leftIndex > 0 ? 5 : 6;
        let minWidth = cellWidth - offset;
        let maxWidth = (headers.length - leftIndex) * cellWidth - offset;
        const {endX} = this.state;

        let newWidth = (widthInPixels + ev.clientX - endX);
        let deltaX = newWidth - widthInPixels;
        let sign = deltaX < 0 ? -1 : (deltaX === 0 ? 0 : 1);
        let count = (sign < 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
        if (newWidth < minWidth)
            count = leftIndex - rightIndex + 1;
        else if (newWidth > maxWidth)
            count = headers.length - rightIndex;
        let newEnd = localeMoment(eventItem.end).add(viewType === ViewTypes.Day ? count * config.minuteStep : count, viewType === ViewTypes.Day ? 'minutes' : 'days').format(DATETIME_FORMAT);
        let hasConflict = false;
        if (config.checkConflict) {
            let start = localeMoment(eventItem.start),
                end = localeMoment(newEnd),
                slotId = schedulerData._getEventSlotId(eventItem);

            events.forEach((e) => {
                if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                    let eStart = localeMoment(e.start),
                        eEnd = localeMoment(e.end);
                    if ((start >= eStart && start < eEnd) || (end > eStart && end <= eEnd) || (eStart >= start && eStart < end) || (eEnd > start && eEnd <= end))
                        hasConflict = true;
                }
            });
        }

        if (hasConflict) {
            const {conflictOccurred, left, top, width} = this.props;
            this.setState({
                left: left,
                top: top,
                width: width,
            });

            if (conflictOccurred != undefined) {
                conflictOccurred(schedulerData, 'EndResize', eventItem);
            }
            else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
            this.subscribeResizeEvent(this.props);
        }
        else {
            if (updateEventEnd != undefined)
                updateEventEnd(schedulerData, eventItem, newEnd);
        }
    }

    render() {
        const {classes, eventItem, isStart, isEnd, isInPopover, eventItemClick, schedulerData, isDragging, connectDragSource, connectDragPreview, eventItemTemplateResolver} = this.props;
        const {config, localeMoment} = schedulerData;
        const {left, width, top} = this.state;

        let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, eventItem);
        let content = (
            <EventItemPopover
                {...this.props}
                eventItem={eventItem}
                title={eventItem.title}
                startTime={eventItem.start}
                endTime={eventItem.end}
                statusColor={classes.eventItem.backgroundColor}
                userStyle={this.props.userStyle}
                closePopover={() => {this.handleClose()}}
            />
                

        );

        let start = localeMoment(eventItem.start);
        let eventTitle = isInPopover ? `${start.format('HH:mm')} ${titleText}` : titleText;
        let startResizeDiv = (this.startResizable(this.props)) ? <div className={classes.startResizer} ref='startResizer'/>: null;
        let endResizeDiv = (this.endResizable(this.props)) ? <div className={classes.endResizer} ref='endResizer'/> : null;

        let eventItemTemplate = eventItemTemplateResolver ?
            eventItemTemplate = eventItemTemplateResolver(schedulerData, eventItem, eventItem.bgColor || config.defaultEventBgColor , isStart, isEnd, 'event-item', config.eventItemHeight, undefined) 
            : (
                <div className={classNames(classes.roundClass, classes.eventItem)} key={eventItem.id}>
                    <span className={classes.eventItemTitle}>{eventTitle}</span>
                </div>
            );
        const aStyle = {left: left + "%", width: width + "%", top};
        if (this.props.eventItem.disableInteractions) aStyle.pointerEvents = "none";
        
        let a = <a className={classes.eventItemContainer} style={aStyle} onClick={this.eventClickHandler}>
            {eventItemTemplate}
            {startResizeDiv}
            {endResizeDiv}
        </a>;

        let renderContent = null;

        if (!isDragging) {
            if (schedulerData._isResizing() || !config.eventItemPopoverEnabled) {
                renderContent = (
                    <div>
                        {
                            connectDragPreview(
                                connectDragSource(a)
                            )
                        }
                    </div>
                );
            } else {
                renderContent = (
                    <Popover 
                        visible={this.state.popoverVisible} 
                        placement="bottomLeft" 
                        content={
                            this.state.popoverVisible && (
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    {content}
                                </ClickAwayListener>
                            )
                        }
                        overlayClassName={this.props.classes.popoverContainer}
                    >
                        {
                            connectDragPreview(
                                connectDragSource(a)
                            )
                        }
                    </Popover>
                );
            }
        }

        return (
            renderContent
        );
    }

    startResizable = (props) => {
        const {eventItem, isInPopover, schedulerData} = props;
        const {config} = schedulerData;
        return config.startResizable === true && isInPopover === false
            && (eventItem.resizable == undefined || eventItem.resizable !== false)
            && (eventItem.startResizable == undefined || eventItem.startResizable !== false);
    }

    endResizable = (props) => {
        const {eventItem, isInPopover, schedulerData} = props;
        const {config} = schedulerData;
        return config.endResizable === true && isInPopover === false
            && (eventItem.resizable == undefined || eventItem.resizable !== false)
            && (eventItem.endResizable == undefined || eventItem.endResizable !== false);
    }

    subscribeResizeEvent = (props) => {
        if (this.refs.startResizer != undefined) {
            this.refs.startResizer.removeEventListener('mousedown', this.initStartDrag, false);
            if (this.startResizable(props))
                this.refs.startResizer.addEventListener('mousedown', this.initStartDrag, false);
        }
        if (this.refs.endResizer != undefined) {
            this.refs.endResizer.removeEventListener('mousedown', this.initEndDrag, false);
            if (this.endResizable(props))
                this.refs.endResizer.addEventListener('mousedown', this.initEndDrag, false);
        }
    }
}

export default EventItem