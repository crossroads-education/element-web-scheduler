import React, {Component} from 'react'
import {PropTypes} from 'prop-types' 
//import moment from 'moment'
//import 'moment/locale/zh-cn';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, DemoData} from '../src/index'
import Nav from './Nav'
import Tips from './Tips'
import ViewSrcCode from './ViewSrcCode'
import withDragDropContext from './withDnDContext'
import ResourceComponent from "./BasicResourceComponent";
import PopoverComponent from "./BasicPopoverComponent";
import moment from "moment";

const userStyle = {
    addMorePopoverOverlay: {
        border: "none"
    },
    timelineEventContent: {
        color: "#ff7f00"
    },
    timelineEvent: {
        color: "red"
    },
    slotItem: {
        border: "none"
    }
}

class basicHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { time, workingHour, itemIndex, schedulerData} = this.props;
        return (
            <div key={time} style={{width: "100%", position: "relative"}}>
                <span style={{position:"absolute", left: "-5px"}}> {moment(time).format("ha").slice(0, -1)} </span>
            </div>
        )
    }
}

class Adornment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ display: "flex", width: 100 }}>
                <div style={{ height: "100%" }}>
                    <p> {this.props.message} </p>
                </div>
                <div style={{ height: "100%" }}>
                    <p> {this.props.message2} </p>
                </div>
            </div>
        );
    }
}

class AdornmentHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ display: "flex", width: 100 }}>
                <div style={{ height: "100%" }}>
                    <p> Message 1 </p>
                </div>
                <div style={{ height: "100%" }}>
                    <p> Message 2 </p>
                </div>
            </div>
        );
        
    }
}

class Basic extends Component{
    constructor(props){
        super(props);

        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        let schedulerData = new SchedulerData({events:DemoData.events, resources:DemoData.resources},
            ViewTypes.Day, false, false, { 
            interactiveLayer: 4, 
            layers: [1, 4], 
            eventItemLeftMargin: 0, 
            
            displayResourceHeader: false
        });
        schedulerData.localeMoment.locale('en');
        this.state = {
            viewModel: schedulerData
        }
    }

    render(){
        const {viewModel} = this.state;
        viewModel.setDate("12-20-2017");
        return (
            <div>
                <Nav />
                <div>
                    <h3 style={{textAlign: 'center'}}>Basic example<ViewSrcCode srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/Basic.js" /></h3>
                    <Scheduler 
                        schedulerData={viewModel}
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
                        userStyle={userStyle}
                        adornmentHeader={<AdornmentHeader/>}
                        adornmentComponent={Adornment}
                        headerComponent={basicHeader}
                        resourceComponent={ResourceComponent}
                        popoverComponent={PopoverComponent}
            />
                </div>
                <Tips />
            </div>
        )
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
        if(confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)){

            let newFreshId = 0;
            schedulerData.events.forEach((item) => {
                if(item.id >= newFreshId)
                    newFreshId = item.id + 1;
            });

            let newEvent = {
                id: newFreshId,
                title: 'New event you just created',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: 'purple'
            }
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            })
        }
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
}

export default withDragDropContext(Basic)
