import * as React from "react";
import moment from "moment";
import injectSheet from "react-jss";
import { EventWrapper } from "../src/"

const styles = {
    shiftEvent: props => ({
        backgroundColor: props.backgroundColor,
        height: "calc(100% - 8px)",
        width: "calc(100% - 8px)",
        borderRadius: 4,
        border: "solid 1px rgba(255,255,255,0.4)"
    }),
    shiftTitle: {
        marginLeft: "8px", 
        lineHeight: "100% - 8px",
        userSelect: "none"
    }
}

const ShiftEvent = props => {
    const start = moment(props.eventModel.start, "HH:mm:ss").format("h:mm A");
    const end = moment(props.eventModel.end, "HH:mm:ss").format("h:mm A");
    return (
        <div className={props.classes.shiftEvent}>
            <span className={props.classes.shiftTitle}> {start} - {end} </span>
        </div>
    )
};

const styled = injectSheet(styles)(ShiftEvent);

export default EventWrapper(styled);