import * as React from "react";
import { Moment } from "moment";
import { DateRange } from "moment-range";
import moment=require("moment");

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
    paintEventX: number;
    paintedEvent: EventModel;
    paintSide: "start" | "end";
    events: EventModel[];
    schedule: SchedulerStore;
    todaysEvents: EventModel[];
    deleteEvent: (event: EventModel) => void;
    addEvent: (event: EventModel) => void;
    initNewEvent: (id?: number | string) => Event;
    startPaint: (mouseEvent: MouseEvent, data: any) => void;
    doPaint: (mouseEvent: MouseEvent,data: any) => void;
    finishPaint: () => void;
    cleanUpPaint: () => void;
}

export class EventModel {
    constructor(event: Event);
    id: number | string;
    layer: number;
    schedule: SchedulerStore;
    resource: ResourceModel;
    start: string;
    end: string;
    day: number;
    resizable: boolean;
    movable: boolean;
    displayPopover: boolean;
    togglePopover: () => void;
    active: boolean;
    _start: Moment;
    _end: Moment;
    duration: number;
    timeRange: DateRange;
    canResize: boolean;
    canMove: boolean;
    componentProps: { [key: string]: any };
    delete: () => void;
    toggleResizing: () => void;
    edit: (newTime: moment.Moment, side: "start" | "end") => void;
    flip: () => void;
    resize: (evt: MouseEvent, data: any, side: "start" | "end") => moment.Moment;
}

export type Event = {
    id: number | string;
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
    renderLayers: {[key: number]: { event: any, resizer: any, disabled?: boolean }};
    renderResource: React.ComponentType;
    renderPopover: React.ComponentType;
    renderAdornment: React.ComponentType;
    bodyWidth: number;
    bodyHeight: number;
    activeLayer: number;
    backgroundLayer: number;
    displayHeaders: boolean;
    headers: string[];
    rowHeight: number;
    headerHeight: number;
}

export function EventWrapper(component: React.ComponentType): React.ComponentType;

export function PopoverWrapper(component: React.ComponentType): React.ComponentType;

export type SchedulerInit = { 
    resources: Resource[],
    events: Event[],
    startTime?: number | string,
    endTime?: number | string,
    hours?: {
        [key: number]: {
            start: number | string,
            end: number | string
        }
    },
    currentDay: number,
    activeLayer: number,
    backgroundLayer: number,
    renderLayers: {
        [key: number]: {
            event: any,
            resizer: any,
            disabled?: boolean
        }
    },
    renderResource: any,
    renderPopover?: any,
    renderAdornment?: any,
    renderAdornmentHeader?: any,
    renderResourceHeader?: any,

    displayHeaders?: boolean,
    rowHeight: number,
    headerHeight: number,

    createMethod?: "paint"|"add",

    editEvent?: (newTime: Moment,event: EventModel,timeChange: "start"|"end") => void,
    createEvent?: (newEvent: Event,resource: Resource,startTime: number) => void,
    deleteEvent?: (event: EventModel,resource: ResourceModel,eventIndex: number) => void,

    startPaint?: (newEvent: Event,startTime: number) => EventModel,
    paintEvent?: (newTime: moment.Moment,paintedEvent: EventModel,side: "start"|"end") => void,
    finishPaint?: (resource: ResourceModel,newEvent: EventModel) => void

    eventKeyGenerator?: (event: EventModel) => number | string;
    resourceKeyGenerator?: (resource: ResourceModel) => number | string;
}

export class SchedulerStore {
    constructor(init: SchedulerInit);

    date: DateModel;
    ui: UiModel;
    events: EventModel[];
    resources: ResourceModel[];
    editing: boolean;
    toggleEditing: () => void;

    createMethod: "paint" | "add";
    toggleCreateMethod: () => void;

    editEvent?: (newTime: Moment, event: EventModel, timeChange: "start" | "end" ) => void;
    createEvent?: (newEvent: Event, resource: ResourceModel, startTime: number) => void;
    deleteEvent?: (event: EventModel, resource: ResourceModel, eventIndex: number) => void;
    
    startPaint?: (newEvent: Event,startTime: number) => EventModel;
    paintEvent?: (newTime: moment.Moment,paintedEvent: EventModel,side: "start"|"end") => void;
    finishPaint?: (resource: ResourceModel,newEvent: EventModel) => void;
    
}

declare const Scheduler: React.ComponentType<any>;

export default Scheduler;