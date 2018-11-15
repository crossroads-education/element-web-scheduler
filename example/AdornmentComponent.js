import * as React from "react";
import {observer, inject} from "mobx-react";

const AdornmentComponent = inject("editing")(observer(props => {
    const todaysHours = props.resource.todaysEvents.reduce((hours, event) => {
        return hours += event.duration;
    }, 0)

    return (
        (props.editing) ? 
            <div style={{width: "200px", height: "100%"}}>
                <span> {todaysHours} </span>
            </div>
        : null
    )
}));

export const AdornmentHeader = () => (
    <div>
        <span> Hours <br/> Today </span>
    </div>
)

export default AdornmentComponent;
