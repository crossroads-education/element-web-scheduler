import React, {Component} from 'react'
import { AvailabilityDemoData } from  '../src/AvailabilityDemoData'
import Scheduler, {SchedulerData, ViewTypes} from '../src/index'
import Nav from './Nav'
import ViewSrcCode from './ViewSrcCode'
import withDragDropContext from './withDnDContext'
import { extendMoment } from 'moment-range';
import uuid from 'uuid/v4';

const AvailabilityPalette = (props) => (
    <form>
        <fieldset style={{ padding: 10, border: "1px solid silver", width: 300, margin: "auto" }}>
            <legend style={{ fontSize: "1em", display: "inline-block", marginBottom: 0, width: "auto" }}>Select a availability type</legend>
            <div>
                <input type="radio" id="unavailable" onChange={() => props.onChange("unavailable")} name="availability" checked={props.mode === "unavailable"} />
                <label htmlFor="unavailable">&nbsp;&nbsp;unavailable</label>
            </div>

            <div>
                <input type="radio" id="tentative" onChange={() => props.onChange("tentative")} name="availability" checked={props.mode === "tentative"} />
                <label htmlFor="tentative">&nbsp;&nbsp;tentative</label>
            </div>

            <div>
                <input type="radio" id="available" onChange={() => props.onChange("available")} name="availability" checked={props.mode === "available"} />
                <label htmlFor="available">&nbsp;&nbsp;available</label>
            </div>
        </fieldset>    
    </form>
);

class AvailablitySchedule extends Component{
    constructor(props){
        super(props);

        let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Day, false, false, { 
            minuteStep: 15,
            eventItemTopMargin: 0,
            rowHeight: 22,
            eventItemLeftMargin: 1,
            eventItemRightMargin: 1,
            selectedAreaBackground: this.getAvailibilityBackground("available"),
            dayCellWidth: 20,
            dayStartFrom: 6,
            dayStopTo: 17,
            views: [],
            selectedAreaZIndex: 2,
            tableBgZIndex: 3,
            selectedAreaBorder: '1px solid #aaa'
        }, {
            isNonWorkingTimeFunc: () => false
        });
        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(AvailabilityDemoData.resources);
        schedulerData.setEvents(AvailabilityDemoData.events);
        this.state = {
            viewModel: schedulerData,
            availabilityBrush: "available"
        }
    }

    setAvailabilityBrush = (mode) => {
        console.log(this.state.viewModel);
        this.state.viewModel.config.selectedAreaBackground = this.getAvailibilityBackground(mode); // FIXME: don't change state outside of setState!
        this.setState({ availabilityBrush: mode });
    }

    render(){
        const {viewModel} = this.state;
        return (
            <div>
                <Nav />
                <AvailabilityPalette mode={this.state.availabilityBrush} onChange={this.setAvailabilityBrush}/>
                <br/>
                <div>
                    <h3 style={{textAlign: 'center'}}>Custom event style<ViewSrcCode srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/CustomEventStyle.js" /></h3>
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked}
                               viewEventClick={this.ops1}
                               viewEventText="Ops 1"
                               viewEvent2Text="Ops 2"
                               viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd}
                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                               eventItemTemplateResolver={this.eventItemTemplateResolver}
                    />
                </div>
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(AvailabilityDemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(AvailabilityDemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(AvailabilityDemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(AvailabilityDemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        const newEvent = {
            id: null,
            title: '',
            start: start,
            end: end,
            resourceId: slotId,
            type: this.state.availabilityBrush,
            disableInteractions: true
        }
        this.insertEvent(newEvent, schedulerData);
    }

    insertEvent = (newEvent, schedulerData) => {
        const moment = extendMoment(schedulerData.localeMoment);
        const resultEvents = [newEvent];
        
        let newRange = moment.range(newEvent.start, newEvent.end);

        schedulerData.events.forEach(evt => {
            if (evt.resourceId !== newEvent.resourceId) {
                resultEvents.push(evt);
            } else {
                const range = moment.range(evt.start, evt.end);
                if (newEvent.type === evt.type) {
                    if (range.overlaps(newRange, { adjacent: true })) {
                        newRange = range.add(newRange, { adjacent: true });
                    } else {
                        resultEvents.push(evt);
                    }
                } else {
                    if (range.overlaps(newRange)) {
                        range.subtract(newRange).forEach(res => resultEvents.push({ ...evt, id: null, start: res.start, end: res.end }));
                    } else {
                        resultEvents.push(evt);
                    }
                }
            }
        });
        resultEvents.forEach(evt => evt.id = evt.id || uuid());
        newEvent.start = newRange.start;
        newEvent.end = newRange.end;

        schedulerData.setEvents(resultEvents);

        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if(confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if(confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if(confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            })
        }
    }

    getAvailibilityBackground = (mode) => {
        if (mode === 'available') return 'white';
        if (mode === 'tentative') return "repeating-linear-gradient(45deg, white, white 2.5px, #D8D8D8 2.5px, #D8D8D8 5px)";
        if (mode === 'unavailable') return "#D8D8D8";
        return "black"
    }

    eventItemTemplateResolver = (schedulerData, event, bgColor, isStart, isEnd, mustAddCssClass, mustBeHeight, agendaMaxEventWidth) => {
        const titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
        return <div key={event.id} className={mustAddCssClass} style={{ background: this.getAvailibilityBackground(event.type), margin: 0}}>
            <span style={{marginLeft: '4px', lineHeight: `${mustBeHeight}px`, color: "black"}}>{titleText}</span>
        </div>;
    }
}

export default withDragDropContext(AvailablitySchedule)
