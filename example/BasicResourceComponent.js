import * as React from "react";

const ResourceComponent = props => (
    <div style={{ height: "100%" }}>
        <span> {props.name} </span>
        <img src={props.imgUrl} style={{ height: "100%", width: "auto" }} />
    </div>
);

export default ResourceComponent;