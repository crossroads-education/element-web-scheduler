import * as React from "react";
import memoize from "memoize-one";
import moment from "moment";
import {PropTypes} from "prop-types";

export default class DayTimeOverlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
    }

    static PropTypes = {
        start: PropTypes.object.isRequired,
        end: PropTypes.object.isRequired,
        containerWidth: PropTypes.number.isRequired,
        contentWidth: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState({time: new Date()})
    }
    
    width = (start, end, current) => {
        const s = this.minutes(start), 
                e = this.minutes(moment(end).add(1 , "hours")),
                c = this.minutes(current);
        const percentage = (c - s) / (e - s);
        return percentage * 100;
    };

    minutes(date) {
        return moment(date).startOf("day").diff(moment(date), "minutes");
    }

    render() {
        const { start, end, containerWidth, contentWidth , left } = this.props;
        const { time } = this.state;
        const percentage = this.width(start, end, time);
        return (
            <div style={{width: containerWidth, position: "relative"}}>
                <div style={{left, position: "absolute", width: contentWidth, zIndex: 40, height: "100%"}}>
                    <div style={{ width: percentage + "%", height: "calc(100% - 5px)", backgroundColor: "rgba(161, 135, 248 , 8%)", position: "absolute", borderRight: "solid 2px #A187F8"}}/>
                </div>
                {this.props.children}
            </div>
        );
    }

}
