import * as React from "react";


const ResourceComponent = props => (
    <div
        style={{ width: "60px" }}
    >
        <span> {props.name} </span>
    </div>
    
);

const ResourceHeader = props => (
    <div style={{ height: "100%", width: "60px", borderRight: "solid 1px #e6e6e6" }}>
        <span> Day </span>
    </div>
)

export { ResourceHeader };

export default ResourceComponent;