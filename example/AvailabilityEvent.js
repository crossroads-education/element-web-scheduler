import * as React from "react";

const AvailabilityEvent = props => (
    <div className={props.mustAddCssClass} style={{ background: props.backgroundColor, margin: 0 }}>
        <span style={{ marginLeft: '4px', lineHeight: `${props.mustBeHeight}px`, color: "black" }}/>
    </div>
);

export default AvailabilityEvent;