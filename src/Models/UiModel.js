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
    @observable eventRowWidth;
    @observable eventRowHeight;
    @observable activeLayer;
    @observable backgroundLayer;
    @observable resourceWidth;
    @observable displayHeaders;
    @observable adornmentWidth;

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
    }

    @action updateSize = debounce((body, resource, adornment) => {
        this.setRowSize(body);
        this.setResourceSize(resource);
        this.setAdornmentSize(adornment);
    }, 100);

    @action setRowSize = (ref) => {
        this.eventRowWidth = ref.current.clientWidth;
        this.eventRowHeight = ref.current.clientHeight;
    }

    @action setAdornmentSize = ref => {
        this.adornmentWidth = ref.current.clientWidth;
    }
    
    @computed get cellWidth() {
        return this.eventRowWidth / (this.schedule.cells.length + 1); // this is to add the truncated cell back in
    }

    @action setResourceSize = (ref) => {
        this.resourceWidth = ref.current.clientWidth;
    }

    @computed get headers() {
        const headers = Array.from(this.schedule.date.range.by("hour")).map(m => m.format("ha").slice(0, -1));
        headers.pop();
        return headers;
    }

    @computed get moveWidth() {
        return this.cellWidth * .5; 
    }
}

export default UiModel;