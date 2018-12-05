import {observable, computed, action} from "mobx";
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
    @observable eventRowRef;
    @observable rowHeight;
    @observable headerHeight;

    constructor({renderLayers, renderResource,
                activeLayer, backgroundLayer, renderPopover, 
                renderAdornment, displayHeaders, renderResourceHeader, 
                renderAdornmentHeader, rowHeight, headerHeight}, schedule) {
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
        this.eventRowRef = undefined;
        this.rowHeight = rowHeight;
        this.headerHeight = headerHeight;
    }

    @action setRowSize = (ref) => {
        this.eventRowRef = ref;
    }

    @computed get cellWidth() {
        return this.eventRowWidth / (this.cells.length + 1); // this is to add the truncated cell back in
    }

    @computed get cells() {
        const cells = Array.from(this.schedule.date.range.by("minute", { step: 30 })).map(m => m.format("H:mm"));
        cells.shift();
        return cells;
    }

    @computed get headers() {
        let headers = Array.from(this.schedule.date.range.by("hour")).map(m => m.format("ha").slice(0, -1));
        if (this.renderResourceHeader) headers.shift();
        headers.pop();
        return headers;
    }

    @computed get moveWidth() {
        return this.cellWidth * .5; 
    }

    @computed get eventRowWidth() {
        return (this.eventRowRef) ? this.eventRowRef.scrollWidth : undefined;
    }
}

export default UiModel;