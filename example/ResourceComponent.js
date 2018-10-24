import * as React from "react";


const ResourceComponent = props => (
    <div
        style={{
            width: "60px"
        }}
    >
        <span> {props.name} </span>
    </div>
    
);

export default ResourceComponent;