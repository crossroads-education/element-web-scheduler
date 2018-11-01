import * as React from "react";


const ResourceComponent = props => (
    <div
        style={{
            width: "60px",
            height: "30px"
        }}
    >
        <span> {props.name} </span>
    </div>
    
);

export default ResourceComponent;