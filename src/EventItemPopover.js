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
        statusColor: PropTypes.string.isRequired,
        subtitleGetter: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
    }

    opOne = () => {
        this.props.viewEventClick(schedulerData, eventItem);
    }

    opTwo = () => {
        this.props.viewEvent2Click(schedulerData, eventItem);
    }

    render(){
        const {schedulerData, eventItem, title, startTime, endTime, statusColor,subtitleGetter, viewEventClick, viewEventText, viewEvent2Click, viewEvent2Text} = this.props;
        const {localeMoment, config} = schedulerData;
        let start = localeMoment(startTime), end = localeMoment(endTime);
        let dateFormat = config.eventItemPopoverDateFormat;
        let Content = (config.popoverComponent) ? config.popoverComponent : DefaultEventItemPopover;
        let contentProps = (config.popoverComponent) ? 
            {
                schedulerData,  
                eventItem,
                eventOne: viewEventClick,
                eventTwo: viewEvent2Click,
                ...eventItem.popoverProps
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
                opTwoClick: this.opTwo
            };
        return (
            <Content
                {...contentProps}
            />
        )
    }
}

export default EventItemPopover
