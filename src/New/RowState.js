import {observable, computed} from "mobx";

export default class RowState {
    @observable events = [];

    constructor(events, [...args]) {
        Object.assign(this, {events, ...args});
    }

    @computed
    get hours() {
        return this.events.reduce((hours, event) => hours + event.duration, 0);
    }
}