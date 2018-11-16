import * as React from "react";
import {observer, inject} from "mobx-react";

const AdornmentComponent = inject("Store")(observer(props => {
    const todaysHours = props.resource.todaysEvents.reduce((hours, event) => {
        return hours += event.duration;
    }, 0)

    return (
        (props.Store.editing) ? 
            <div style={{width: "200px", height: "100%"}}>
                <span> {todaysHours} </span>
            </div>
        : null
    )
}));

export const AdornmentHeader = inject("Store")(observer(props => (
    (props.Store.editing) ?
        <div style={{width: "100%", height: "100%"}}>
            <span> Hours Today </span>
        </div> : null
)));
export default AdornmentComponent;
