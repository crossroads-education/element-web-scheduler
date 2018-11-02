React Scheduler
========================

A scheduler and resource planning component built for React and made for modern browsers (IE10+) .


## Use and Setup

`npm install @xroadsed/react-scheduler --save`

The scheduler is a mobx component that allows you to pass callbacks to interact with the various features, it invokes these callbacks in response to certain events.

An example of how to create a scheduler component:

_This code can be found in Example/MasterScheduler.js_

```js
@observer
export default class MasterScheduler extends React.Component {
    constructor(props) {
        super(props);

        this.props.MasterScheduleStore.init();
    }

    render() {
        const { MasterScheduleStore: Store } = this.props;
        return (
            <div style={{width: "100%",height: "100%"}}>
                <DevTools />
                <div style={{width: 1600,height: 800}}>
                    <Datepicker 
                        currentDate={Store.schedulerStore.currentDate} 
                        incrementDate={Store.schedulerStore.incrementDate}
                        decrementDate={Store.schedulerStore.decrementDate}
                    />
                    <Scheduler
                        schedulerStore={Store.schedulerStore}
                    />
                </div>
            </div>
        )
    }
}
```

The Scheduler Store that runs internally is constructed like this: 

_This code can be found in example/Stores/MasterStore.js_

```js

class MasterScheduleStore {
    schedulerStore;

    constructor() {}
    
    init() {    
        const r = _.cloneDeep( MasterDemoData.resources );
        const e = _.cloneDeep( MasterDemoData.events );

        const schedule = new SchedulerStore( 
            r, e, 6, 
            18, "2017-12-17", 15,
            true, 3, 1,
            this.resizeEvent, this.stopResize, this.createEvent,
            PopoverComponent
        );

        this.schedulerStore = schedule;
    }

    @action resizeEvent = (newTime, event, timeChanged) => {
        event[timeChanged] = newTime.format();
        event.componentProps[timeChanged] = newTime.format();
    }

    @action stopResize = () => {}

    @action createEvent = () => {}
}

```

## Run examples locally

* Clone this repository
* Retrieve dependencies: `npm install`
* Start: `npm run start`
* Open http://localhost:9000
  
  
  
 ## API
 
 The SchedulerStore, EventModel, and ResourceModel expose the API and interactions available within the package.
 
 ### SchedulerStore
 
 #### Constructor
 
 The SchedulerStore is constructed with an object with the following properties: 
 
 ```js
constructor( 
        init = {
            resources: [],
            events: [],
            
            renderLayers: {},
            renderResource: undefined,
            renderPopover: undefined,
            renderAdornment: undefined,
            activeLayer: undefined,
            backgroundLayer: undefined,

            resizeEvent: undefined,
            stopResize: undefined,
            createEvent: undefined,

            startTime: "",
            endTime: "",
            currentDay: undefined,
            
        } 
    )
```

##### `Resources`

A `Resource` is the aggregating property of the row of events, like a user or a class. It should be passed with the following format. 

```js
type Resource = {
    id: number | string;
    componentProps: {} This contains props you want to spread on the component being rendered. See /Example/MasterDemoData.js for an example.
}
```

#### `Events`

The main focus of the Scheduler is to interact with `Events`, and have the following type:

```js
type Event = { 
    id: number;
    start: "HH:mm:ss" These times are used when constructing moments, so its vital this format is maintained.
    end: "HH:mm:ss" 
    day: number; 
    layer: number; // What layer (zIndex) to render the events on. This allows stacking events on top of each other.
    resizable: boolean;  // Allows resizability functionality, and will render the resizers when `true`
}
```
 
#### `RenderLayers` 

The primary render methods for rendering events. 

```js
type RenderLayers = {
    [layer number]: {
        event: Component wrapped in the EventComponentWrapper HOC,
        resizer: React Component | Component Class; This will not receive props.
    }
}
```
  
#### `RenderResource`

The render method for rendering resources. Unlike events, the resources don't need to be wrapped in a higher order component. The Resources are rendered in a list order dependent on the array in which they're initially passed. The resource component recieves the props defined in the resource object used in the scheduler's construction. See:

```js
export default class Resources extends React.Component {

    static propTypes = {
        resources: PropTypes.arrayOf(PropTypes.object).isRequired,
        render: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className={this.props.classes.resourcesRoot}>
                {this.props.resources.map(resource => (
                    <div className={this.props.classes.resourceContainer} key={resource.id}>
                        <this.props.render {...resource.componentProps} />
                    </div>
                ))}
            </div>
        )
    }
}
```

#### `RenderPopover`

The Render method for popovers when an event in the active layer is clicked. THe component you want to be rendered in the Popover should be passed into the `PopoverWrapper` higher order component.

`type RenderPopover = FunctionalComponent | ComponentClass`

#### `RenderAdornment` 

The render method for end of row adornments. Multiple adornments can be wrapped up in one component. The adornment component does not need to be wrapped in a HOC, and it receives the entire ResourceModel

`type RenderAdornment = FunctionalComponent | ComponentClass`

#### `ActiveLayer`

The rendered layer that receives mouse click events and can be interacted with. Its assumed all other events are background information and can't be interacted with.

`type ActiveLayer: number`

#### `BackgroundLayer` 

The layer that the background is rendered in. Any elements with a lower zIndex will not be visible. 

`type BackgroundLayer: number`

#### `ResizeEvent`

The callback fired everytime an event is resized 1/2 half hour. The callback fires with a newTime, the time changed, and the event being changed.

`type ResizeEvent: (newTime: moment, event: EventModel, timeChanged: start | end) => void;`

#### `StopResize`

Callback fired when an event is doing being resized. Currently cleans up internal calculation values and ignores functions passed. 

#### `CreateEvent` 

Callback fired when an empty area on the scheduler is clicked, and presently fires with the new event object (not yet actually added), the resource its being added to, and the startTime. 

`type CreateEvent: (newEvent: EventModel, resource: ResourceModel, startTime: float`

#### `StartTime`

The hour at which to start the schedule at. 

`type StartTime: number;`

#### `EndTime`

The hour at which the schedule ends at.

`type EndTime: number;`

#### `CurrentDay`

Day of the week to start rendering at. Events are organized by day rather than date, this is to create maintainable and reusable weekly schedules. 

`type CurrentDay: 0 | 1 | 2 | 3 | 4 | 5 | 6`
