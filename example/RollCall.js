import React, {Component} from 'react'
import { RollCallDemoData } from  '../src/RollCallDemoData'
import Scheduler, {SchedulerData, ViewTypes} from '../src/index'
import Nav from './Nav'
import ViewSrcCode from './ViewSrcCode'
import withDragDropContext from './withDnDContext'
import uuid from 'uuid/v4';

class RollCallSchedule extends Component{
    constructor(props){
        super(props);

        let schedulerData = new SchedulerData('2017-12-18', ViewTypes.Day, false, false, { 
            minuteStep: 15,
            eventItemTopMargin: 0,
            rowHeight: 38,
            eventItemHeight: 38-2*4-2, // margin & border width
            schedulerContentWidth: 1000,
            eventItemLeftMargin: 1,
            eventItemRightMargin: 1,
            dayStartFrom: 6,
            dayStopTo: 17,
            views: [],
            selectedAreaZIndex: 2,
            backgroundLayer: 3,
            creatable: false,
            layers: [0, 1],
            interactiveLayer: 1
        }, {
            isNonWorkingTimeFunc: () => false
        });
        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(RollCallDemoData.resources);
        schedulerData.setEvents(RollCallDemoData.events);
        this.state = {
            viewModel: schedulerData
        }
    }

    render() {
        const {viewModel} = this.state;
        return (
            <div>
                <Nav />
                <div>
                    <h3 style={{textAlign: 'center'}}>Custom event style<ViewSrcCode srcCodeUrl="https://github.com/StephenChou1017/react-big-scheduler/blob/master/example/CustomEventStyle.js" /></h3>
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               eventItemClick={this.eventClicked}
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

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    getAttendanceStyle = ({isHere, isScheduled, isOver, isLeftMost, isRightMost}) => {
        const style = { backgroundColor: "black" }; // will be black for unsupported combinations of isHere, isScheduled and isOver.
        if (isOver) {
            if (isHere) { // was here - if scheduled green, otherwise yellow
                style.backgroundColor = (isScheduled) ? "#94D99D" : "#E8D08D";
                style.border = (isScheduled) ? "1px solid #6DA774" : "1px solid #CCB780";
            }
            else if (isScheduled) { // was not here but scheduled (red)
                style.backgroundColor = "#F26A6A";
                style.border = "1px solid #C45746";
            }
        } else if (isScheduled) { // scheduled in the future (gray)
            style.backgroundColor = "#ECECEC";
            style.border = "1px solid #AFAFAF";
        }

        if (isLeftMost) {
            style.borderBottomLeftRadius = 2;
            style.borderTopLeftRadius = 2;
        }
        if (isRightMost) {
            style.borderBottomRightRadius = 2;
            style.borderTopRightRadius = 2;
        }

        return style;
    }

    eventItemTemplateResolver = (schedulerData, event, bgColor, isStart, isEnd, mustAddCssClass, mustBeHeight, agendaMaxEventWidth) => {
        const titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
        return <div key={event.id} className={mustAddCssClass} style={{ ...this.getAttendanceStyle(event), margin: "4px 0"}}>
            <span style={{marginLeft: '4px', lineHeight: `${mustBeHeight}px`, color: "black"}}>{titleText}</span>
        </div>;
    }
}

export default withDragDropContext(RollCallSchedule)
