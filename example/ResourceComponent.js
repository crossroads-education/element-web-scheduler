import * as React from "react";


const ResourceComponent = props => (
    <div
        style={{ width: "60px" }}
    >
        <span> {props.name} </span>
    </div>
    
);

const ResourceHeader = props => (
    <div style={{ height: "100%", width: "100%", borderRight: "solid 1px #bcbcbc" }}>
        <span />
    </div>
)

export { ResourceHeader };

export default ResourceComponent;