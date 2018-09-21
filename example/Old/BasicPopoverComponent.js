import * as React from "react";

const BasicPopoverComponent = props => (
    <div>
        <p> {props.eventItem.title} </p>
        <p> {props.message} </p>
        <p> {props.message2} </p>
    </div>
)

export default BasicPopoverComponent