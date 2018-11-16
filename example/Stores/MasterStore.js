import {observable, action, toJS} from "mobx"
import {MasterDemoData} from "../MasterDemoData";
import {SchedulerStore, EventModel} from "../../src/";
import PopoverComponent from "../PopoverComponent";
import ShiftEvent from "../ShiftEvent";
import ShiftResizer from "../ShiftResizer";
import ResourceComponent from "../ResourceComponent";
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
        const schedule = new SchedulerStore( 
           {
                resources: r,
                events: e,
                startTime: 6,
                endTime: 18,
                currentDay: 5,
                activeLayer: 3,
                backgroundLayer: 2,
                renderLayers: { 
                    1: {
                        event: AvailabilityEvent,
                        resizer: undefined
                    },
                    3: {
                        event: ShiftEvent,
                        resizer: ShiftResizer
                    }
                },
                renderResource: ResourceComponent,
                renderPopover: PopoverComponent,
                renderAdornment: AdornmentComponent,
                renderAdornmentHeader: AdornmentHeader,
                editEvent: this.resizeEvent,
                stopResize: this.stopResize,
                createEvent: this.createEvent,
                deleteEvent: this.deleteEvent,
                startPaint: this.startPaint,
                paintEvent: this.paintEvent,
                finishPaint: this.finishPaint,
                displayHeaders: true
           }
        );

        this.schedulerStore = schedule;
        
    }

    @action resizeEvent = (newTime, event, timeChanged) => {
        event[timeChanged] = newTime.format("HH:mm:ss");
        event.componentProps[timeChanged] = newTime.format("HH:mm:ss");
    }

    @action stopResize = () => {}

    @action createEvent = (newEvent, resource, startTime) => {
        const start = this.schedulerStore.date.start.clone().add(startTime, "hours").format("HH:mm:ss");
        const end = this.schedulerStore.date.start.clone().add(startTime + .5, "hours").format("HH:mm:ss");
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
        const end = this.schedulerStore.date.start.clone().add(startTime, "hours").format("HH:mm:ss");
        return new EventModel({ ...newEvent, start, end: end, resizable: false, layer: 1 });
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
        this.editing = !this.editing;
        this.schedulerStore.events.forEach(event => { 
            event.toggleResizing();
        })
    }
}

export default MasterScheduleStore
