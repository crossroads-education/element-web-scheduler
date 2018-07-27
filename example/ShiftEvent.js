import * as React from "react";

const ShiftEvent = props => (
    <div className={props.mustAddCssClass} style={{ background: props.backgroundColor, margin: 0, margin: "4px 0 4px 2px", height: `calc(${props.mustBeHeight}px - 8px)`, borderRadius: 8, border: "solid 1px #1E589A"}}>
        <span style={{marginLeft: "4px", lineHeight: `calc(${props.mustBeHeight}px - 4px)`}}> {props.event.title} </span>
    </div>
)

export default ShiftEvent;