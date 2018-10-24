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
                        resourceComponent={ResourceComponent}
                        adornmentComponent={AdornmentComponent}
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
 
 The SchedulerStore is constructed with the following:
 
  
  
