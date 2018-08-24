import * as React from "react";
import moment from "moment";

const CreatedShift = props => {

    const {schedulerData, left, width} = props;

    const start = moment(schedulerData.selectDate).hour(schedulerData.config.dayStartFrom);

    const offsetInCells = left / schedulerData.getContentCellWidthInPixels();
    const startTime = moment(start).add(offsetInCells * schedulerData.config.minuteStep, "minutes");

    const widthInCells = width / schedulerData.getContentCellWidthInPixels();

    const endTime = moment(startTime).add(widthInCells * schedulerData.config.minuteStep, "minutes");

    return (
        <div
            className={props.mustAddCssClass}
            style={{
                position: "relative",
                background: "rgb(48, 145, 255)",
                margin: "4px 0 4px 4px",
                height: 'calc(100% - 8px)',
                borderRadius: 3,
                border: "solid 1px #1E589A",
                width: "calc(100% - 7.5px)"
            }}
        >
            <span style={{ marginLeft: "8px", lineHeight: `calc(100% - 8px)` }}>
                {startTime.format("h:mm a").slice(0, -1) + " " + endTime.format("h:mm a").slice(0, -1)}
            </span>
        </div>
    );
}

export default CreatedShift;