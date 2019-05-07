import {observable, computed, action} from "mobx";
import HeaderModel from "./HeaderModel"

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

    // 30-minute cell segments, blocks rendered in grid; includes a shorter first and last block
    // in case the schedule times don't fall on full 30 minutes times
    @computed get cells() {
        const alignedRange = this.schedule.date.range.clone();
        const startMinutes = alignedRange.start.minute();
        if (startMinutes > 0 && startMinutes < 30) {
            alignedRange.start.set({ minute: 30, second: 0 });
        } else if (startMinutes > 30 && startMinutes < 60) {
            alignedRange.start.set({ minute: 0, second: 0 });
            alignedRange.start.add(1, "hour");
        }
        const cells = Array.from(alignedRange.by("minute", { step: 30 })).map(m => { 
            return { time: m, dur: 30 }
        });
        if (startMinutes !== this.schedule.date.range.start.minute()) {
            cells.unshift({ time: this.schedule.date.range.start
                , dur: (60 + alignedRange.start.get("minute") - this.schedule.date.range.start.get("minute")) % 60 });
        }
        if (cells.length > 1) {
            cells[cells.length-1].dur = this.schedule.date.range.end.get("minute") % 30;
        }
        return cells;
    }

    // 15-minute segment, distance to fill when dragging
    @computed get halfCellWidth() {
        return this.eventRowWidth / (this.cells.length * 2);
    }

    // Hour markers to render as headers
    @computed get headers() {
        const fullHourRange = this.schedule.date.range.clone();
        fullHourRange.start.set({ minute: 0, second: 0 });
        const startMinutes = this.schedule.date.range.start.get("minutes");
        if (startMinutes !== 0) fullHourRange.start.add(1, "hour");
        let headers = Array.from(fullHourRange.by("hour")).map(time => 
            new HeaderModel({ time, schedule: this.schedule, alignment: "center" })
        );
        if (this.renderResourceHeader && (startMinutes >= 45 || startMinutes === 0)) headers[0].alignment = "flex-start";
        if (fullHourRange.end.get("minute") <= 15) headers[headers.length-1].alignment = "flex-end";
        return headers;
    }

    // Width of the row containing events
    @computed get eventRowWidth() {
        return (this.eventRowRef) ? this.eventRowRef.scrollWidth : undefined;
    }

    @action changeActiveLayer = layer => {
        this.activeLayer = layer;
    }

    @action toggleDisabledLayer = layer => {
        this.renderLayers[layer].disabled = !this.renderLayers[layer].disabled;
    }
}

export default UiModel;