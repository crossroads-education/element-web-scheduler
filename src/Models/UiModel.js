import {observable, computed, action} from "mobx";

class UiModel {
    openEventPopover;
    schedule;
    renderLayers;
    renderResource;
    renderPopover;
    renderAdornment;
    @observable bodyWidth;
    @observable bodyHeight;
    @observable activeLayer;
    @observable backgroundLayer;
    @observable resourceWidth;

    constructor(renderLayers, renderResource, schedule, activeLayer, backgroundLayer, renderPopover, renderAdornment, displayHeaders) {
        this.renderLayers = renderLayers;
        this.renderResource = renderResource;
        this.schedule = schedule;
        this.renderPopover = renderPopover;
        this.renderAdornment = renderAdornment;
        this.activeLayer = activeLayer;
        this.backgroundLayer = backgroundLayer;
        this.displayHeaders = displayHeaders
    }

    @action setBodySize = (ref) => {
        this.bodyWidth = ref.current.clientWidth;
        this.bodyHeight = ref.current.clientHeight;
    }
    
    @computed get cellWidth() {
        return this.bodyWidth / (this.schedule.cells.length + 1); // this is to add the truncated cell back in
    }

    @action setResourceSize = (ref) => {
        this.resourceWidth = ref.current.clientWidth;
    }

    togglePopover(event) {
        if (!this.openEventPopover) {
            this.openEventPopover = event;
        } else {
            if (this.openEventPopover.id === event.id) {
                this.openEventPopover = undefined;
            } else {
                this.openEventPopover.togglePopver();
                this.openEventPopover = event;
            }
        }
    }

    @computed get headers() {
        const headers = Array.from(this.schedule.date.range.by("hour")).map(m => m.format("ha").slice(0, -1));
        headers.shift();
        return headers;
    }
}

export default UiModel;