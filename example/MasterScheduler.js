import * as React from "react";
import Scheduler from "../src/";
import {observer, Provider}from "mobx-react";
import * as _ from "lodash";
import DevTools from "mobx-react-devtools";
import Datepicker from "./Datepicker"

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
                    <div style={{width: "75%",height: "75%"}}>
                        <Datepicker 
                            currentDay={Store.schedulerStore.date.currentDay} 
                            incrementDay={Store.schedulerStore.date.incrementDay}
                            decrementDay={Store.schedulerStore.date.decrementDay}
                            enableEditing={Store.enableEditing}
                        />
                        <Provider Store={Store}>
                            <div style={{minWidth: 960}}>
                                <Scheduler
                                    schedulerStore={Store.schedulerStore}
                                />
                                <button onClick={Store.updateEvents}>Change data</button>
                            </div>
                        </Provider>
                    </div>
            </div>
        )
    }
}