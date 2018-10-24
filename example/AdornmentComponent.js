import * as React from "react";
import {observer} from "mobx-react";

const AdornmentComponent = props => {
    const todaysHours = props.resource.todaysEvents.reduce((hours, event) => {
        hours += event.duration;
    }, 0)

    return (
        <div style={{width: "200px", height: "100%"}}>
            <p> {todaysHours} </p>
        </div>
    )
}

export default observer(AdornmentComponent);
