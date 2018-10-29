import {observable, action} from "mobx"
import {MasterDemoData} from "../MasterDemoData";
import {SchedulerStore, EventModel} from "../../src/";
import PopoverComponent from "../PopoverComponent";
import ShiftEvent from "../ShiftEvent";
import ShiftResizer from "../ShiftResizer";
import ResourceComponent from "../ResourceComponent";
import AdornmentComponent from "../AdornmentComponent";
import _ from "lodash";

class MasterScheduleStore {
    schedulerStore;

    constructor() {}
    
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
              renderLayers: {3: {
                  event: ShiftEvent,
                  resizer: ShiftResizer
              }},
              renderResource: ResourceComponent,
              renderPopover: PopoverComponent,
              renderAdornment: AdornmentComponent,
              resizeEvent: this.resizeEvent,
              stopResize: this.stopResize,
              createEvent: this.createEvent,
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
        resource.events.push(event);
    }
}

export default MasterScheduleStore
