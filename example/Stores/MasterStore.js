import { action, computed, observable, reaction, toJS} from "mobx"
import {MasterDemoData} from "../MasterDemoData";
import {SchedulerStore, EventModel} from "../../src/";
import PopoverComponent from "../PopoverComponent";
import ShiftEvent from "../ShiftEvent";
import ShiftResizer from "../ShiftResizer";
import ResourceComponent, { ResourceHeader } from "../ResourceComponent";
import AdornmentComponent, { AdornmentHeader } from "../AdornmentComponent";
import AvailabilityEvent from "../Available";
import _ from "lodash";

const SHIFT_LAYER = 3;
const AVAILABIILITY_LAYER = 1;
const EDIT_LAYER = 5; 

class MasterScheduleStore {
    @observable editing;
    filteredResources = observable.array([]);
    schedulerStore;

    resourceIds=["d1","d2","d3","d4","d5","d6","d7"];

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
            hours: {
                3: {
                    start: "7:11",
                    end: "18:07"
                },
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
            activeLayer: SHIFT_LAYER,
            backgroundLayer: 2,
            renderLayers: { 
                [AVAILABIILITY_LAYER]: {
                    event: AvailabilityEvent,
                    resizer: undefined
                },
                [SHIFT_LAYER]: {
                    event: ShiftEvent,
                    resizer: ShiftResizer,
                    // disabled: true
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
            createMethod: "add",
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

    @action toggleEditing = () => {
        // if (this.schedulerStore.ui.activeLayer === SHIFT_LAYER) {
        //     this.schedulerStore.ui.changeActiveLayer(EDIT_LAYER);
        //     this.schedulerStore.ui.toggleDisabledLayer(SHIFT_LAYER);
        // } else {
        //     this.schedulerStore.ui.changeActiveLayer(SHIFT_LAYER);
        //     this.schedulerStore.ui.toggleDisabledLayer(SHIFT_LAYER);
        // }
        this.editing = (this.editing) ? false : true;
        this.schedulerStore.toggleEditing();
        this.schedulerStore.events.forEach(event => { 
            event.toggleResizing();
        })
    }

    @action updateEvents = () => {
        this.schedulerStore.updateEvents(MasterDemoData.newEvents);
    }

    @action changeLayer = () => {
        if (this.schedulerStore.ui.activeLayer === 1) {
            this.schedulerStore.ui.changeActiveLayer(5);
        } else {
            this.schedulerStore.ui.changeActiveLayer(1);
        }
    }

    @action changeFilter = event => {
        const newIndex = event.target.options.selectedIndex;
        const newOption = event.target.options[newIndex];
        const resourceIndex = this.filteredResources.findIndex(r => r === newOption.value);
        if (resourceIndex !== -1) {
            this.filteredResources.splice(resourceIndex, 1);
        } else {
            this.filteredResources.push(newOption.value);
        }
        const resource = this.schedulerStore.resources.find(r => newOption.value === r.id);
        resource.toggleHidden();
    }
}

export default MasterScheduleStore
