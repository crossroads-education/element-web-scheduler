import * as React from "react";

const ShiftEvent = props => (
    <div className={props.mustAddCssClass} style={{ position: "relative", background: props.backgroundColor, margin: 0, margin: "4px 0 4px 4px", height: `calc(${props.mustBeHeight}px - 8px)`, borderRadius: 3, border: "solid 1px #1E589A", width: "calc(100% - 7.5px)"}}>
        <div style={{ width: "6px", height: `calc(${props.mustBeHeight}px - 12px)`, left: -2, top: 1, backgroundColor: "white", border: "solid 1px black", borderRadius: 6, position: "absolute"}}/>
        <span style={{marginLeft: "8px", lineHeight: `calc(${props.mustBeHeight}px - 8px)`}}> {props.event.title} </span>
        <div style={{ width: "6px", height: `calc(${props.mustBeHeight}px - 12px)`, right: -2, top: 1, backgroundColor: "white", border: "solid 1px black", borderRadius: 6, position: "absolute" }} />
    </div>
)

export default ShiftEvent;