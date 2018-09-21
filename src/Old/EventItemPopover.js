import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import DefaultEventItemPopover from "./DefaultEventItemPopover";

class EventItemPopover extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        eventItem: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        statusColor: PropTypes.string,
        subtitleGetter: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
    }

    handleClick = (e) => {
        this.props.closePopover();
    }

    opOne = () => {
        this.props.viewEventClick(schedulerData, eventItem);
    }

    opTwo = () => {
        this.props.viewEvent2Click(schedulerData, eventItem);
    }

    render(){
        const {schedulerData, eventItem, title, startTime, endTime, statusColor,subtitleGetter, viewEventClick, viewEventText, viewEvent2Click, viewEvent2Text, popoverComponent} = this.props;
        const {localeMoment, config} = schedulerData;
        let start = localeMoment(startTime), end = localeMoment(endTime);
        let dateFormat = config.eventItemPopoverDateFormat;
        let PopoverComponent = (popoverComponent) ? popoverComponent : DefaultEventItemPopover;
        let contentProps = (popoverComponent) ? 
            {
                schedulerData,  
                eventItem,
                eventOne: viewEventClick,
                eventTwo: viewEvent2Click,
                
            } :
            {
                statusColor,
                title,
                subtitle: (subtitleGetter) ? subtitleGetter(schedulerData, eventItem) : "",
                startTime: start.format("HH:mm"),
                startDate: start.format(dateFormat),
                endTime: end.format("HH:mm"),
                endDate: end.format(dateFormat),
                eventOps: (viewEventText || viewEvent2Text),
                opOne: viewEventText,
                opTwo: viewEvent2Text,
                opOneClick: this.opOne,
                opTwoClick: this.opTwo, 
                userStyle: this.props.userStyle
            };
        return (
            <PopoverComponent
                {...contentProps}
                closePopover={this.handleClick}
                popoverProps={this.props.popoverProps}
            />
        )
    }
}

export default EventItemPopover