import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import moment from "moment";
import Event from "./Event";
import * as _ from "lodash";

const styles = {
    rowEventContainer: {
        width: "100%",
        height: "100%",
        position: "relative"
    }
}



@injectSheet(styles)
export default class Row extends React.Component {

    static propTypes = {
        events: PropTypes.arrayOf(PropTypes.object).isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !_.isEqual(nextProps.events, this.props.events) ||
            !_.isEqual(nextProps.start, this.props.start) ||
            !_.isEqual(nextProps.end, this.props.end) 
        )
    }

    timespan = (start,end) => moment(end).diff(moment(start),"hours");

    width = (eventStart, eventEnd, dayLength) => {
        let eventLength = this.timespan(eventStart, eventEnd);

        return eventLength / dayLength;
    }

    offset = (eventStart, scheduleStart, dayLength) => {
        let startDiff = this.timespan(scheduleStart, eventStart);

        return startDiff/ dayLength;
    }
    render() {
        const scheduleTimespan = this.timespan(this.props.start, this.props.end);

        return (
            <div className={this.props.classes.rowEventContainer}>
                {this.props.events.map(event => (
                    <Event
                        key={event.id}
                        event={event}
                        width={this.width(event.start,event.end,scheduleTimespan)}
                        offset={this.offset(event.start,this.props.start,scheduleTimespan)}
                        resize={this.props.resizeEvent}
                        stopResize={this.props.stopResizeEvent}
                        active={this.props.activeLayer===event.layer}
                    />
                ))}
            </div>
        )
    }
    
}