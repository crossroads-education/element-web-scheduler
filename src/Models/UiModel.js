import {observable, computed, action, observe} from "mobx";
import { debounce } from "lodash"; 

class UiModel {
    schedule;
    renderLayers;
    renderResource;
    renderPopover;
    renderAdornment;
    renderResourceHeader;
    renderAdornmentHeader;
    @observable activeLayer;
    @observable backgroundLayer;
    @observable displayHeaders;

    @observable adornmentRef;
    @observable eventRowRef;
    @observable resourceRef;

    constructor(renderLayers, renderResource, schedule, 
                activeLayer, backgroundLayer, renderPopover, 
                renderAdornment, displayHeaders, renderResourceHeader, 
                renderAdornmentHeader) {
        this.renderLayers = renderLayers;
        this.renderResource = renderResource;
        this.schedule = schedule;
        this.renderPopover = renderPopover;
        this.renderAdornment = renderAdornment;
        this.activeLayer = activeLayer;
        this.backgroundLayer = backgroundLayer;
        this.displayHeaders = displayHeaders
        this.renderResourceHeader = renderResourceHeader;
        this.renderAdornmentHeader = renderAdornmentHeader;
        this.adornmentRef = undefined;
        this.eventRowRef = undefined;
        this.resourceRef = undefined;

    }

    @action updateSize = debounce((body, resource, adornment) => {
        this.setRowSize(body);
        this.setResourceSize(resource);
        this.setAdornmentSize(adornment);
    }, 100);

    @action setRowSize = (ref) => {
        this.eventRowRef = ref;
    }

    @action setAdornmentSize = ref => {
        this.adornmentRef = ref;
    }
    
    @action setResourceSize = (ref) => {
        this.resourceRef = ref;
    }

    @computed get cellWidth() {
        return this.eventRowWidth / ( this.schedule.cells.length + 1 ); // this is to add the truncated cell back in
    }

    @computed get headers() {
        const headers = Array.from(this.schedule.date.range.by("hour")).map(m => m.format("ha").slice(0, -1));
        headers.pop();
        return headers;
    }

    @computed get moveWidth() {
        return this.cellWidth * .5; 
    }

    @computed get eventRowWidth() {
        return (this.eventRowRef) ? this.eventRowRef.clientWidth : undefined;
    }

    @computed get resourceWidth() {
        return (this.resourceRef) ? this.resourceRef.clientWidth : undefined;
    }

    @computed get adornmentWidth() {
        return (this.adornmentRef) ? this.adornmentRef.clientWidth : undefined;
    }
}

export default UiModel;