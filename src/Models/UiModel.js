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

    constructor(renderLayers, renderResource, schedule, activeLayer, backgroundLayer, renderPopover, renderAdornment) {
        this.renderLayers = renderLayers;
        this.renderResource = renderResource;
        this.schedule = schedule;
        this.renderPopover = renderPopover;
        this.renderAdornment = renderAdornment;
        this.activeLayer = activeLayer;
        this.backgroundLayer = backgroundLayer;
    }

    @action setBodySize = (ref) => {
        this.bodyWidth = ref.current.clientWidth;
        this.bodyHeight = ref.current.clientHeight;
    }
    
    @computed get cellWidth() {
        return this.bodyWidth / this.schedule.cells;
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
}

export default UiModel;