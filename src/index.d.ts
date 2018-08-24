import * as React from "react";
import * as moment from "moment";

export type MinuteSteps = 0 | 12 | 15 | 20 | 30 | 60;

export type SchedulerStyles = {
    ddMorePopoverOverlay?: React.CSSProperties,
    antCalendar?: React.CSSProperties,
    antRadioButtonWrapperChecked?: React.CSSProperties,
    baseText?: React.CSSProperties,
    dayEvent?: React.CSSProperties,
    dayEventContainer?: React.CSSProperties,
    disabledText?: React.CSSProperties,
    eventContainer?: React.CSSProperties,
    eventEndResizer?: React.CSSProperties,
    eventItem?: React.CSSProperties,
    eventResizer?: React.CSSProperties,
    eventStartResizer?: React.CSSProperties,
    header1Text?: React.CSSProperties,
    header2Text?: React.CSSProperties,
    header3Text?: React.CSSProperties,
    helpText?: React.CSSProperties,
    iconNavHover?: React.CSSProperties,
    overflowText?: React.CSSProperties,
    popoverCalendar?: React.CSSProperties,
    resourceView?: React.CSSProperties,
    roundAll?: React.CSSProperties,
    roundHead?: React.CSSProperties,
    roundNone?: React.CSSProperties,
    roundTail?: React.CSSProperties,
    scheduler?: React.CSSProperties,
    schedulerBackground?: React.CSSProperties,
    schedulerContent?: React.CSSProperties,
    schedulerContentTable?: React.CSSProperties,
    schedulerDisplayTable?: React.CSSProperties,
    schedulerTable?: React.CSSProperties,
    schedulerView?: React.CSSProperties,
    selectedArea?: React.CSSProperties,
    statusDot?: React.CSSProperties,
    timelineEvent?: React.CSSProperties
    timelineEventContent?: React.CSSProperties,
    cell?: React.CSSProperties,
    nonWorking?: React.CSSProperties,
    innerCell?: React.CSSProperties,
    row?: React.CSSProperties,
    eventItemTitle?: React.CSSProperties,
    headerItem?: React.CSSProperties,
    headerNonWorkingItem?: React.CSSProperties,
    headerContainer?: React.CSSProperties,
    resourceEventContainer?: React.CSSProperties,
    inactiveLayerContainer?: React.CSSProperties,
    eventContentContainer?: React.CSSProperties,
    slotItem?: React.CSSProperties,
    resourceContainer?: React.CSSProperties,
    resourceHeaderContainer?: React.CSSProperties,
    schedulerContainer?: React.CSSProperties,
    schedulerContentHeader?: React.CSSProperties,
    schedulerRowsContainer?: React.CSSProperties,
    adornmentWrapper?: React.CSSProperties
}

export type SchedulerEvent = {
    id: string | number;
    start: string | moment.Moment; // ex. 2017-12-19 12:30:00
    end: string | moment.Moment; // ex. 2017-12-20 23:30:00
    resourceId: string | number;
    title?: string;
    resizable?: boolean;
    groupId?: number;
    groupName?: string;
    movable?: boolean;
    type?: number | string;
    component?: React.ComponentClass<any> | React.SFC<any>;
    componentProps?: { [props: string]: any };
    popverProps?: { [props: string]: any };
    data?: any;
    layer?: number;
    disableInteractions?: boolean;
};

export type SchedulerResource = {
    id: number | string;
    name: string;
    componentProps?: { [props: string]: any };
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
    // new ones:
    selectedAreaBackground?: string;
    selectedAreaZIndex?: number;
    rowHeight?: string | number;
    interactiveLayer?: number,
    backgroundLayer?: number,
    layers?: false | number[],
    viewResources?: true,
    popoverTrigger?: "hover" | "click",
    displayTableHeaders?: boolean;
    schedulerContentWidth?: number;
    schedulerContainerWidth?: number;
    displayResourceHeader?: boolean;
    schedulerHeader?: boolean;


    // old ones:
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

    minuteStep?: MinuteSteps;

    views?: { viewName: string, viewType: ViewTypes, showAgenda: boolean, isEventPerspective: boolean }[];


};

export type SchedulerAdornment = {
    resourceId: string | number;
    componentProps?: {
        [prop: string]: any;
    };
}

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
        initData?: { resources?: SchedulerResource[], events?: SchedulerEvent[], adornments?: SchedulerAdornment[], date?: moment.MomentInput },
        viewType: ViewTypes,
        showAgenda?: boolean,
        isEventPerspective?: boolean,
        newConfig?: SchedulerConfiguration,
        newBehaviors?: Behaviors,
        localMoment?: moment.Moment
    );

    config: SchedulerConfiguration;
    localeMoment: moment.Moment;

    events: SchedulerEvent[];
    resources: SchedulerResource[];

    //functions
    setLocaleMoment(localeMoment: moment.Moment): void;
    setResources(resources: SchedulerResource[]): void;
    setEvents(events: SchedulerEvent[]): void;
    setDate(date: string): void;
    setMinuteStep(minuteStep: MinuteSteps): void;
    setAdornments(adornments: SchedulerAdornment[]): void;

    updateEventStart?(...args: any[]): any;
    updateEventEnd?(...args: any[]): any;
    prev(): void;
    next(): void;

    // Calculated/generated properties
    headers: SchedulerHeader[];
    eventsAutoGenerated: boolean;
    startDate: string;
    selectDate: string;
    endDate: string;
    eventGroups: { id?: string; name?: string; state?: SchedulerEvent; }[];
    resizing: boolean;
    scrollToToday: boolean;
    showAgenda: boolean;
    viewType: ViewTypes;
    renderData: SchedulerRenderData[];
}

export type SchedulerRenderData = {
    adornmentProps?: { [prop: string]: any };
    resourceProps?: { [prop: string]: any };
    hasSummary: boolean;
    headerItems: SchedulerRenderHeader[];
    rowHeight: number;
    slotId: string | number;
    slotName: string;
}

export type SchedulerRenderHeader = {
    addMore: number;
    addMoreIndex: number;
    count: number;
    end: string;
    events: { render: boolean; span: number; eventItem: SchedulerEvent }[];
    nonWorkingTime: boolean;
    time: string;
}

export type SchedulerHeader = {
    nonWorkingTime?: boolean
    time?: string;
};

export type SchedulerAdornmentProps = {
    adornmentItem?: SchedulerRenderData;
    schedulerData?: SchedulerData;
}

export type SchedulerResourceProps = {
    resourceItem?: SchedulerRenderData;
}

export type SchedulerHeaderProps = {
    itemIndex?: number;
    schedulerData?: SchedulerData;
    time?: string;
    workingHour?: boolean;
}

export type SchedulerPopoverProps = {
    schedulerData: SchedulerData;
    eventItem: SchedulerEvent;
    eventOne: any,
    eventTwo: any,
    popoverProps: { [prop: string]: any };
    closePopover(): void;
}

export type SchedulerProps = {
    schedulerData: SchedulerData;
    prevClick?(...args: any[]): any;
    nextClick?(...args: any[]): any;
    onViewChange?(...args: any[]): any;
    onSelectData?(...args: any[]): any;
    onSelectDate?(data: SchedulerData, date: string): void;
    onSetAddMoreState?(...args: any[]): any;
    updateEventStart?(...args: any[]): any;
    updateEventEnd?(...args: any[]): any;
    moveEvent?(...args: any[]): any;
    leftCustomHeader?: any;
    rightCustomHeader?: any;
    newEvent?(...args: any[]): any;
    subtitleGetter?(...args: any[]): any;
    eventItemClick?(...args: any[]): any;
    viewEventText?: string;
    viewEvent2Text?: string;
    viewEvent2Click?(...args: any[]): any;
    viewEventClick?(...args: any[]): any;
    conflictOccured?(...args: any[]): any;
    eventItemTemplateResolver?(...args: any[]): any;
    dndSources?: any[];
    slotClickedFunc?(...args: any[]): any;
    nonAgendaCellHeaderTemplateResolver?(...args: any[]): any;
    userStyle?: SchedulerStyles;
    adornmentComponent?: React.ComponentType<SchedulerAdornmentProps>;
    adornmentHeader?: React.ReactNode;
    resourceComponent?: React.ComponentType<SchedulerResourceProps>;
    popoverComponent?: React.ComponentType<SchedulerPopoverProps>;
    headerComponent?: React.ComponentType<SchedulerHeaderProps>;
    popoverProps?: { [prop: string]: any };
};

declare const Scheduler: React.ComponentType<SchedulerProps>;

export default Scheduler;
