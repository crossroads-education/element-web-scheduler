import * as React from "react";
import {Moment} from "moment";
import {MomentRange} from "moment-range";

export type DateModel = {
    currentDay: number;
    startTime: string;
    endTime: string;
    schedule: SchedulerStore;
    setDay: (day: number) => void;
    decrementDay: () => void;
    incrementDay: () => void;
    start: Moment;
    end: Moment;
    range: MomentRange;
    hours: number;
    day: string;
    dateChanged: boolean;
}

export type Resource = {
    id: number | string;
    componentProps?: {
        [key: string]: any;
    }
}

export type ResourceModel = {
    componentProps: {[key: string]: any};
    id: number | string;
    events: EventModel[];
    schedule: SchedulerStore;
    deleteEvent: (event: eventModel) => void;
}

export class EventModel {
    constructor(event: Event);
    id: number | string;
    layer: number;
    schedule: SchedulerStore;
    resource: ResourceModel;
    start: string;
    end: string;
    resizable: boolean;
    movable: boolean;
    displayPopup: boolean;
    active: boolean;
    _start: Moment;
    _end: Moment;
    duration: number;
    delete: () => void;
    toggleResizing: () => void;
}

export type Event = {
    id: number;
    start: string;
    end: string;
    day: number;
    resourceId: number | string;
    layer: number;
    resizable?: boolean;
    componentProps?: {
        [key: string]: any;
    }
}

export type UiModel = {
    schedule: SchedulerStore;
    renderLayers: {[key: number]: { event: any, resizer: any}};
    renderResource: React.ComponentType;
    renderPopover: React.ComponentType;
    renderAdornment: React.ComponentType;
    bodyWidth: number;
    bodyHeight: number;
    activeLayer: number;
    backgroundLayer: number;
    resourceWidth: number;
    displayHeaders: boolean;
    headers: string[];
    
}

export function EventWrapper(component: React.ComponentType): React.ComponentType;

export function PopoverWrapper(component: React.ComponentType): React.ComponentType;

export class SchedulerStore {
    constructor(init: {
        resources: Resource[],
        events: Event[],
        startTime: number,
        endTime: number,
        currentDay: number,
        activeLayer: number,
        backgroundLayer: number,
        renderLayers: {
            [key: number]: {
                event: any,
                resizer: any
            }
        },
        renderResource: any,
        renderPopover?: any,
        renderAdornment?: any,
        displayHeaders?: boolean
        resizeEvent: (newTime: Moment, event: EventModel, timeChange: "start" | "end") => void,
        createEvent: (newEvent: Event, resource: Resource, startTime: number) => void,
        deleteEvent: (event: EventModel, resource: ResourceModel, eventIndex: number) => void
    });

    date: DateModel;
    resources: ResourceModel[];
    resizeEvent: (newTime: Moment, event: EventModel, timeChange: "start" | "end" ) => void;
    createEvent: (newEvent: Event, resource: ResourceModel, startTime: number) => void;
    deleteEvent: (event: EventModel, resource: ResourceModel, eventIndex: number) => void;
    events: EventModel[];
    ui: UiModel;
}

declare const Scheduler: React.ComponentType<any>;

export default Scheduler;