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
                            enableEditing={Store.toggleEditing}
                        />
                        <Provider Store={Store}>
                            <div style={{overflowX: "auto"}}>
                                <div style={{minWidth: 960}}>
                                    <Scheduler
                                        schedulerStore={Store.schedulerStore}
                                    />
                                </div>
                                <button onClick={Store.updateEvents}>Change data</button>
                                <button onClick={Store.changeLayer}>Change layer</button>
                                <select multiple value={Store.filteredResources} onChange={Store.changeFilter}>
                                    {Store.resourceIds.map(r => (
                                        <option key={r}>{r}</option>
                                    ))}
                                </select>
                            </div>
                        </Provider>
                    </div>
            </div>
        )
    }
}