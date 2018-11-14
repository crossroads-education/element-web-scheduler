import {observable, action, toJS} from "mobx"
import {MasterDemoData} from "../MasterDemoData";
import {SchedulerStore, EventModel} from "../../src/";
import PopoverComponent from "../PopoverComponent";
import ShiftEvent from "../ShiftEvent";
import ShiftResizer from "../ShiftResizer";
import ResourceComponent from "../ResourceComponent";
import AdornmentComponent from "../AdornmentComponent";
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
              backgroundLayer: 1,
              renderLayers: { 3: {
                  event: ShiftEvent,
                  resizer: ShiftResizer
              }},
              renderResource: ResourceComponent,
              renderPopover: PopoverComponent,
              renderAdornment: AdornmentComponent,
              editEvent: this.resizeEvent,
              stopResize: this.stopResize,
              createEvent: this.createEvent,
              deleteEvent: this.deleteEvent,
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
                resizable: true,
                componentProps: {
                    backgroundColor: "#3091FF"
                }
            }
        });

        resource.addEvent(event);
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
