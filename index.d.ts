import * as React from "react";
import * as moment from "moment";

export type SchedulerEvent = {
    id: number;
    start: string; // ex. 2017-12-19 12:30:00
    end: string; // ex. 2017-12-20 23:30:00
    resourceId: string | number;
    title?: string;
    resizable?: boolean;
    groupId?: number;
    groupName?: string;
    movable?: boolean;
    type?: number | string;
    component?: React.ComponentClass<any>;
    componentProps: {[props: string]: any};
    layer?: number;
};

export type SchedulerResource = {
    id: number;
    name: string;
};

export enum ViewTypes {
    Day = 0,
    Week = 1,
    Month = 2,
    Quarter = 3,
    Year = 4
}

export enum SummaryPosition {
    Top = 0,
    TopRight = 1,
    TopLeft = 2,
    Bottom = 3,
    BottomRight = 4,
    BottomLeft = 5
}

export type SchedulerConfiguration = {
    schedulerWidth?: number;
    schedulerMaxHeight?: number;
    tableHeaderHeight?: number;
    agendaResourceTableWidth?: number;
    agendaMaxEventWidth?: number;
    dayResourceTableWidth?: number;
    weekResourceTableWidth?: number;
    monthResourceTableWidth?: number;
    quarterResourceTableWidth?: number;
    yearResourceTableWidth?: number;
    dayCellWidth?: number;
    weekCellWidth?: number;
    monthCellWidth?: number;
    quarterCellWidth?: number;
    yearCellWidth?: number;
    dayMaxEvents?: number;
    weekMaxEvents?: number;
    monthMaxEvents?: number;
    quarterMaxEvents?: number;
    yearMaxEvents?: number;
    eventItemHeight?: number;
    eventItemLineHeight?: number;
    dayStartFrom?: number;
    dayStopTo?: number;
    defaultEventBgColor?: string;
    selectedAreaColor?: string;
    nonWorkingTimeHeadColor?: string;
    nonWorkingTimeHeadBgColor?: string;
    nonWorkingTimeBodyBgColor?: string;
    summaryColor?: string;
    summaryPos?: SummaryPosition;
    startResizable?: boolean;
    endResizable?: boolean;
    movable?: boolean;
    creatable?: boolean;
    crossResourceMove?: boolean;
    checkConflict?: boolean;
    scrollToTodayEnabled?: boolean;
    eventItemPopoverEnabled?: boolean;
    calendarPopoverEnabled?: boolean;
    recurringEventsEnabled?: boolean;
    resourceName?: string;
    taskName?: string;
    agendaViewHeader?: string;
    addMorePopoverHeaderFormat?: string;
    eventItemPopoverDateFormat?: string;
    nonAgendaDayCellHeaderFormat?: string;
    nonAgendaOtherCellHeaderFormat?: string;

    minuteStep?: 0 | 12 | 15 | 20 | 30 | 60;

    views?: [
        { viewName: "Day", viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false },
        { viewName: "Week", viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false },
        { viewName: "Month", viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false },
        { viewName: "Quarter", viewType: ViewTypes.Quarter, showAgenda: false, isEventPerspective: false },
        { viewName: "Year", viewType: ViewTypes.Year, showAgenda: false, isEventPerspective: false }
    ]

    interactiveLayer?: number,
    backgroundLayer?: number,
    layers?: false,
    viewResources?: true,
    popoverTrigger?: "hover" | "click",
    resourcesComponent?: React.ComponentClass<any> | false;
    popoverComponent?: React.ComponentClass<any> | false;
    displayHeader?: boolean;
};

export type Behaviors = {
    getSummaryFunc?(
        schedulerData: SchedulerData,
        headerEvents: any[],
        slotId: number,
        headerStart: any,
        headerEnd: any
    ): any;
    getDateLabelFunc?(
        schedulerData: SchedulerData,
        viewType: ViewTypes,
        startDate: moment.MomentInput,
        endDate: moment.MomentInput
    ): string;
    getEventTextFunc?(schedulerData: SchedulerData, event: SchedulerEvent): string;
    isNonWorkingTimeFunc?(schedulerData: SchedulerData, time: moment.MomentInput): boolean;
};

export class SchedulerData {
    constructor(
        data: string,
        viewType: ViewTypes,
        showAgenda?: boolean,
        isEventPerspective?: boolean,
        newConfig?: SchedulerConfiguration,
        newBehaviors?: Behaviors,
        localMoment?: moment.LocaleSpecifier
    );
    setLocaleMoment(localeMoment: moment.LocaleSpecifier): void;
    setResources(resources: SchedulerResource[]): void;
    setEvents(events: SchedulerEvent[]): void;
}

export type SchedulerProps = {
    schedulerData: SchedulerData;
    prevClick(...args: any[]): any;
    nextClick(...args: any[]): any;
    onViewChange(...args: any[]): any;
    onSelectData(...args: any[]): any;
    onSetAddMoreState?(...args: any[]): any;
    updateEventStart?(...args: any[]): any;
    updateEventEnd?(...args: any[]): any;
    moveEvent?(...args: any[]): any;
    leftCustomHeader: any;
    rightCustomHeader: any;
    newEvent?(...args: any[]): any;
    subtitleGetter?(...args: any[]): any;
    eventItemClick?(...args: any[]): any;
    viewEventText?: string;
    viewEvent2Text?: string;
    viewEvent2Click?(...args: any[]): any;
    viewEventClick?(...args: any[]): any;
    conflictOccured?(...args: any[]): any;
    eventItemTemplateResolver?(...args: any[]): any;
    dndSources: any[];
    slotClickedFunc?(...args: any[]): any;
    slotItemTemplateResolver?(...args: any[]): any;
    nonAgendaCellHeaderTemplateResolver?(...args: any[]): any;
};

export class Scheduler extends React.Component<SchedulerProps> {

}
