import ViewTypes from './ViewTypes'
import SummaryPos from './SummaryPos'

export default {
    schedulerContainerWidth: 400,
    schedulerContentWidth: 1600,
    schedulerMaxHeight: 0,
    tableHeaderHeight: 40,

    agendaResourceTableWidth: 160,
    agendaMaxEventWidth: 100,

    dayResourceTableWidth: 160,
    weekResourceTableWidth: 160,
    monthResourceTableWidth: 160,
    quarterResourceTableWidth: 160,
    yearResourceTableWidth: 160,

    dayCellWidth: 30,
    weekCellWidth: 200,
    monthCellWidth: 80,
    quarterCellWidth: 80,
    yearCellWidth: 80,

    dayMaxEvents: 99,
    weekMaxEvents: 99,
    monthMaxEvents: 99,
    quarterMaxEvents: 99,
    yearMaxEvents: 99,

    rowHeight: "auto",
    selectedAreaZIndex: 0,
    tableBgZIndex: 1,
    selectedAreaBorder: 'none',

    eventItemHeight: 22,
    eventItemLineHeight: 24,
    eventItemTopMargin: 1,
    eventItemLeftMargin: 2,
    eventItemRightMargin: 4,
    dayStartFrom: 9,
    dayStopTo: 18,
    defaultEventBgColor: '#80C5F6',
    selectedAreaColor: '#7EC2F3', // only used if selectedAreaBackground is falsy
    selectedAreaBackground: null, // overwrites selectedAreaColor
    nonWorkingTimeHeadColor: '#999999',
    nonWorkingTimeHeadBgColor: '#fff0f6',
    nonWorkingTimeBodyBgColor: '#fff0f6',
    summaryColor: '#666',
    summaryPos: SummaryPos.TopRight,

    startResizable: true,
    endResizable: true,
    movable: true,
    creatable: true,
    crossResourceMove: true,
    checkConflict: false,
    scrollToTodayEnabled: true,
    eventItemPopoverEnabled: true,
    calendarPopoverEnabled: true,
    recurringEventsEnabled: true,

    resourceName: 'Resource Name',
    taskName: 'Task Name',
    agendaViewHeader: 'Agenda',
    addMorePopoverHeaderFormat: 'MMM D, YYYY dddd',
    eventItemPopoverDateFormat: 'MMM D',
    nonAgendaDayCellHeaderFormat: 'ha',
    nonAgendaOtherCellHeaderFormat: 'ddd M/D',

    minuteStep: 30,

    interactiveLayer: 0,
    backgroundLayer: 0,
    layers: false,
    viewResources: true,

    views: [
        {viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
        {viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
        {viewName: 'Month', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
        {viewName: 'Quarter', viewType: ViewTypes.Quarter, showAgenda: false, isEventPerspective: false},
        {viewName: 'Year', viewType: ViewTypes.Year, showAgenda: false, isEventPerspective: false},
    ],
}
