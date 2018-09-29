import * as React from "react";
import SchedulerStore from "./Stores/SchedulerStore";

const SchedulerInjector = (Scheduler) => (props) => {
    const store = new SchedulerStore(
            props.resources, 
            props.events, 
            props.startTime, 
            props.endTime, 
            props.currentDate,
            props.minuteStep,
            props.resizeSnap,
            props.activeLayer,
            props.backgroundLayer,
            props.resizeEvent
        );
    return (
        <Scheduler
            schedulerStore={store}
            resourceComponent={props.resourceComponent}
        />
    )
};

export default SchedulerInjector;