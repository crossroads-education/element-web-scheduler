import {observable, action, toJS} from "mobx"
import {MasterDemoData} from "../MasterDemoData";
import {SchedulerStore, EventModel} from "../../src/";
import PopoverComponent from "../PopoverComponent";
import ShiftEvent from "../ShiftEvent";
import ShiftResizer from "../ShiftResizer";
import ResourceComponent, { ResourceHeader } from "../ResourceComponent";
import AdornmentComponent, { AdornmentHeader } from "../AdornmentComponent";
import AvailabilityEvent from "../Available";
import _ from "lodash";

class MasterScheduleStore {
    @observable editing;
    schedulerStore;

    constructor() {
        this.editing = false;
    }
    
    init() {    
        const r = _.cloneDeep( MasterDemoData.resources );
        const e = _.cloneDeep( MasterDemoData.events );
        const schedule = new SchedulerStore({
            editing: false,
            resources: r,
            events: e,
            startTime: 6,
            endTime: 18,
            hours: {
                6: {
                    start: 9,
                    end: 15
                },
                1: {
                    start: 10,
                    end: 21
                },
                4: {
                    start: 9,
                    end: 13
                }
            },
            currentDay: 5,
            activeLayer: 5,
            backgroundLayer: 2,
            renderLayers: { 
                1: {
                    event: AvailabilityEvent,
                    resizer: undefined
                },
                3: {
                    event: ShiftEvent,
                    resizer: ShiftResizer,
                    disabled: true
                }
            },
            renderResource: ResourceComponent,
            renderPopover: PopoverComponent,
            renderAdornment: AdornmentComponent,
            renderAdornmentHeader: AdornmentHeader,
            renderResourceHeader: ResourceHeader,
            editEvent: this.resizeEvent,
            stopResize: this.stopResize,
            createEvent: this.createEvent,
            deleteEvent: this.deleteEvent,
            startPaint: this.startPaint,
            paintEvent: this.paintEvent,
            finishPaint: this.finishPaint,
            createMethod: "paint",
            displayHeaders: true,
            rowHeight: 35,
            headerHeight: 25,
            disableMobileEdit: true
        });

        this.schedulerStore = schedule;
        
    }

    @action resizeEvent = (newTime, event, side) => {
        event[side] = newTime.format("HH:mm:ss");
        event.componentProps[side] = newTime.format("HH:mm:ss");
    }

    @action stopResize = () => {}

    @action createEvent = (newEvent, resource, startTime) => {
        const start = this.schedulerStore.date.start.clone().add(startTime, "hours").format("HH:mm:ss");
        const end = this.schedulerStore.date.start.clone().add(startTime + 0.5, "hours").format("HH:mm:ss");
        const event = new EventModel({
            ...newEvent, 
            ...{
                start,
                end,
                resizable: false,
                componentProps: {
                    backgroundColor: "#3091FF"
                }
            }
        });
        resource.addEvent(event);
    }

    @action startPaint = (newEvent, startTime) => {
        const start = this.schedulerStore.date.start.clone().add(startTime, "hours").format("HH:mm:ss");
        const end = this.schedulerStore.date.start.clone().add(startTime + 0.25, "hours").format("HH:mm:ss");
        return new EventModel({ ...newEvent, start, end, resizable: false, layer: 1 });
    }

    @action paintEvent = (newTime, paintedEvent, side) => {
        paintedEvent[side] = newTime.format("HH:mm:ss");
    }

    @action finishPaint = (resource, newEvent) => {
        resource.todaysEvents.forEach(event => {
            if (event.layer === 1 && newEvent.timeRange.overlaps(event.timeRange, { adjacent: true })) {
                const newRange = newEvent.timeRange.clone().add(event.timeRange.clone(), { adjacent: true });
                newEvent.start = newRange.start.format("HH:mm:ss");
                newEvent.end = newRange.end.format("HH:mm:ss");
                event.delete();
            }
        });

        resource.addEvent(newEvent);
    }

    @action deleteEvent = (event, resource, index) => {
        resource.events.splice(index, 1);
    }

    @action enableEditing = () => {
        this.editing = (this.editing) ? false : true;
        this.schedulerStore.toggleEditing();
        this.schedulerStore.events.forEach(event => { 
            event.toggleResizing();
        })
    }

    @action updateEvents = () => {
        this.schedulerStore.replaceEvents(MasterDemoData.newEvents);
    }
}

export default MasterScheduleStore
