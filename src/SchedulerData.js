import moment from 'moment'
import RRule from 'rrule';
import config from './config'
import behaviors from './behaviors'
import {ViewTypes, DATE_FORMAT, DATETIME_FORMAT} from './index'

export default class SchedulerData {
    constructor(date=moment().format(DATE_FORMAT), viewType = ViewTypes.Week,
                showAgenda = false, isEventPerspective = false,
                newConfig = undefined, newBehaviors = undefined,
                localeMoment = undefined) {        
        this.resources = [];
        this.events = [];
        this.eventGroups = [];
        this.eventGroupsAutoGenerated = true;
        this.viewType = viewType;
        this.showAgenda = showAgenda;
        this.isEventPerspective = isEventPerspective;
        this.resizing = false;
        this.scrollToToday = false;

        this.localeMoment = moment;
        if(!!localeMoment)
            this.localeMoment = localeMoment;
        this._resolveDate(0, date);
        this.config = newConfig == undefined ? config : {...config, ...newConfig};
        this._validateMinuteStep(this.config.minuteStep);
        this.behaviors = newBehaviors == undefined ? behaviors : {...behaviors, ...newBehaviors};
        this._createHeaders();
        this._createRenderData();
    }

    setLocaleMoment(localeMoment){
        if(!!localeMoment){
            this.localeMoment = localeMoment;
            this._createHeaders();
            this._createRenderData();
        }
    }

    setResources(resources) {
        this._validateResource(resources);
        this.resources = Array.from(new Set(resources));
        this._createRenderData();
        this.setScrollToToday(true);
    }

    setEventGroupsAutoGenerated(autoGenerated){
        this.eventGroupsAutoGenerated = autoGenerated;
    }

    //optional
    setEventGroups(eventGroups) {
        this._validateEventGroups(eventGroups);
        this.eventGroups = Array.from(new Set(eventGroups));
        this.eventGroupsAutoGenerated = false;
        this._createRenderData();
        this.setScrollToToday(true);
    }

    setMinuteStep(minuteStep) {
        if(this.config.minuteStep !== minuteStep) {
            this._validateMinuteStep(minuteStep);
            this.config.minuteStep = minuteStep;
            this._createHeaders();
            this._createRenderData();
        }
    }

    getMinuteStepsInHour(){
        return 60 / this.config.minuteStep;
    }

    addResource(resource){
        let existedResources = this.resources.filter(x => x.id === resource.id);
        if(existedResources.length === 0){
            this.resources.push(resource);
            this._createRenderData();
        }
    }

    addEventGroup(eventGroup){
        let existedEventGroups = this.eventGroups.filter(x => x.id === eventGroup.id);
        if(existedEventGroups.length === 0){
            this.eventGroups.push(eventGroup);
            this._createRenderData();
        }
    }

    removeEventGroupById(eventGroupId){
        let index = -1;
        this.eventGroups.forEach((item, idx) => {
            if(item.id === eventGroupId)
                index = idx;
        })
        if(index !== -1)
            this.eventGroups.splice(index, 1);
    }

    containsEventGroupId(eventGroupId){
        let index = -1;
        this.eventGroups.forEach((item, idx) => {
            if(item.id === eventGroupId)
                index = idx;
        })
        return index !== -1;
    }

    setEvents(events) {
        this._validateEvents(events);
        this.events = Array.from(events);
        if(this.eventGroupsAutoGenerated)
            this._generateEventGroups();
        if(this.config.recurringEventsEnabled)
            this._handleRecurringEvents();
        
        this._createRenderData();
        this.setScrollToToday(true);
    }

    setScrollToToday(scrollToToday){
        if(this.config.scrollToTodayEnabled)
            this.scrollToToday = scrollToToday;
    }

    getScrollToToday(){
        if(this.config.scrollToTodayEnabled)
            return this.scrollToToday;
        return false;
    }

    prev() {
        this._resolveDate(-1);
        this.events = [];
        this._createHeaders();
        this._createRenderData();
    }

    next() {
        this._resolveDate(1);
        this.events = [];
        this._createHeaders();
        this._createRenderData();
    }

    setDate(date=moment().format(DATE_FORMAT)){
        this._resolveDate(0, date);
        this.events = [];
        this._createHeaders();
        this._createRenderData();
    }

    setViewType(viewType = ViewTypes.Week, showAgenda = false, isEventPerspective = false) {
        this.showAgenda = showAgenda;
        this.isEventPerspective = isEventPerspective;

        if(this.viewType !== viewType) {
            let date = this.startDate;

            if(this.viewType < viewType){
                if(viewType === ViewTypes.Week) {
                    this.startDate = this.localeMoment(date).startOf('week').format(DATE_FORMAT);
                    this.endDate = this.localeMoment(this.startDate).endOf('week').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Month){
                    this.startDate = this.localeMoment(date).startOf('month').format(DATE_FORMAT);
                    this.endDate = this.localeMoment(this.startDate).endOf('month').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Quarter){
                    this.startDate = this.localeMoment(date).startOf('quarter').format(DATE_FORMAT);
                    this.endDate = this.localeMoment(this.startDate).endOf('quarter').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Year) {
                    this.startDate = this.localeMoment(date).startOf('year').format(DATE_FORMAT);
                    this.endDate = this.localeMoment(this.startDate).endOf('year').format(DATE_FORMAT);
                }
            }
            else{
                let start = this.localeMoment(this.startDate);
                let end = this.localeMoment(this.endDate).add(1, 'days');

                if(this.selectDate !== undefined) {
                    let selectDate = this.localeMoment(this.selectDate);
                    if(selectDate >= start && selectDate < end) {
                        date = this.selectDate;
                    }
                }

                let now = this.localeMoment();
                if(now >= start && now < end) {
                    date = now.format(DATE_FORMAT);
                }

                if(viewType === ViewTypes.Day) {
                    this.startDate = date;
                    this.endDate = this.startDate;
                }
                else if(viewType === ViewTypes.Week) {
                    this.startDate = this.localeMoment(date).startOf('week').format(DATE_FORMAT);
                    this.endDate = this.localeMoment(this.startDate).endOf('week').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Month){
                    this.startDate = this.localeMoment(date).startOf('month').format(DATE_FORMAT);
                    this.endDate = this.localeMoment(this.startDate).endOf('month').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Quarter){
                    this.startDate = this.localeMoment(date).startOf('quarter').format(DATE_FORMAT);
                    this.endDate = this.localeMoment(this.startDate).endOf('quarter').format(DATE_FORMAT);
                }
            }

            this.viewType = viewType;
            this.events = [];
            this._createHeaders();
            this._createRenderData();
            this.setScrollToToday(true);
        }
    }

    setSchedulerMaxHeight(newSchedulerMaxHeight){
        this.config.schedulerMaxHeight = newSchedulerMaxHeight;
    }

    getSlots(){
        return this.isEventPerspective ? this.eventGroups : this.resources;
    }

    getSlotById(slotId){
        let slots = this.getSlots();
        let slot = undefined;
        slots.forEach((item) => {
            if(item.id === slotId)
                slot = item;
        })
        return slot;
    }

    getResourceById(resourceId){
        let resource = undefined;
        this.resources.forEach((item) => {
            if(item.id === resourceId)
                resource = item;
        })
        return resource;
    }

    getTableHeaderHeight() {
        return this.config.tableHeaderHeight;
    }

    getSchedulerContentDesiredHeight() {
        var height = 0;
        this.renderData.forEach((item) => {
           height += item.rowHeight;
        });
        return height;
    }

    getResourceTableWidth() {
        if(this.showAgenda) return this.config.agendaResourceTableWidth;

        return this.viewType === ViewTypes.Week ? this.config.weekResourceTableWidth : (
            this.viewType === ViewTypes.Day ? this.config.dayResourceTableWidth : (
                this.viewType === ViewTypes.Month ? this.config.monthResourceTableWidth : (
                    this.viewType === ViewTypes.Year ? this.config.yearResourceTableWidth :
                        this.config.quarterResourceTableWidth
                )
            )
        );
    }

    getContentCellWidth(){
        let width = this.config.schedulerContentWidth / this.headers.length;
        return width;
    }

    getEventWidth(span){
        return ((this.headers.length / span) * 100 + "%");
    }

    getCellMaxEvents(){
        return this.viewType === ViewTypes.Week ? this.config.weekMaxEvents : (
            this.viewType === ViewTypes.Day ? this.config.dayMaxEvents : (
                this.viewType === ViewTypes.Month ? this.config.monthMaxEvents : (
                    this.viewType === ViewTypes.Year ? this.config.yearMaxEvents :
                        this.config.quarterMaxEvents
                )
            )
        );
    }

    getContentTableWidth(){
        return this.headers.length * (this.getContentCellWidth());
    }

    getDateLabel(){
        let start = this.localeMoment(this.startDate);
        let end = this.localeMoment(this.endDate);
        let dateLabel = start.format('LL');

        if(this.viewType !== ViewTypes.Day)
            dateLabel = `${start.format('LL')}-${end.format('LL')}`;

        if(!!this.behaviors.getDateLabelFunc)
            dateLabel = this.behaviors.getDateLabelFunc(this, this.viewType, this.startDate, this.endDate);

        return dateLabel;
    }

    addEvent(newEvent){
        this._attachEvent(newEvent);
        if(this.eventGroupsAutoGenerated)
            this._generateEventGroups();
        this._createRenderData();
    }

    updateEventStart(event, newStart) {
        this._detachEvent(event);
        event.start = newStart;
        this._attachEvent(event);
        this._createRenderData();
    }

    updateEventEnd(event, newEnd) {
        event.end = newEnd;
        this._createRenderData();
    }

    moveEvent(event, newSlotId, newSlotName, newStart, newEnd){
        this._detachEvent(event);
        if(this.isEventPerspective) {
            event.groupId = newSlotId;
            event.groupName = newSlotName;
        }
        else
            event.resourceId = newSlotId;
        event.end = newEnd;
        event.start = newStart;
        this._attachEvent(event);
        this._createRenderData();
    }

    isEventInTimeWindow(eventStart, eventEnd, windowStart, windowEnd) {
        return eventStart < windowEnd && eventEnd >windowStart;
    }

    _detachEvent(event) {
        let index = this.events.indexOf(event);
        if(index !== -1)
            this.events.splice(index, 1);
    }

    _attachEvent(event) {
        let pos = 0;
        let eventStart = this.localeMoment(event.start);
        this.events.forEach((item, index) => {
            let start = this.localeMoment(item.start);
            if(eventStart >= start)
                pos = index + 1;
        });
        this.events.splice(pos, 0, event);
    }

    _handleRecurringEvents(){
        let recurringEvents = this.events.filter(x => !!x.rrule);
        recurringEvents.forEach((item) => {
            this._detachEvent(item);
        });
        
        recurringEvents.forEach((item) => {
            let windowStart = this.localeMoment(this.startDate),
                windowEnd = this.localeMoment(this.endDate),
                oldStart = this.localeMoment(item.start),
                oldEnd = this.localeMoment(item.end),
                rule = RRule.fromString(item.rrule);
            rule.origOptions.dtstart = oldStart.toDate();
            if(!rule.origOptions.until || windowEnd < this.localeMoment(rule.origOptions.until)) {
                rule.origOptions.until = windowEnd.toDate();
            }
                
            //reload
            rule = RRule.fromString(rule.toString());
            let all = rule.all();
            let newEvents = all.map((time, index) => {
                return {
                    ...item,
                    recurringEventId: item.id,
                    id: `${item.id}-${index}`,
                    start: this.localeMoment(time).format(DATETIME_FORMAT),
                    end: this.localeMoment(time).add(oldEnd.diff(oldStart), 'ms').format(DATETIME_FORMAT)
                };
            });
            newEvents.forEach((newEvent) => {
                let eventStart = this.localeMoment(newEvent.start),
                    eventEnd = this.localeMoment(newEvent.end);
                if(this.isEventInTimeWindow(eventStart, eventEnd, windowStart, windowEnd)){
                    this._attachEvent(newEvent);
                }
            });
        });
    }

    _resolveDate(num, date = undefined){
        if(date != undefined)
            this.selectDate = this.localeMoment(date).format(DATE_FORMAT);

        if(this.viewType === ViewTypes.Week) {
            this.startDate = date != undefined ? this.localeMoment(date).startOf('week').format(DATE_FORMAT)
                : this.localeMoment(this.startDate).add(num, 'weeks').format(DATE_FORMAT);
            this.endDate = this.localeMoment(this.startDate).endOf('week').format(DATE_FORMAT);
        }
        else if(this.viewType === ViewTypes.Day) {
            this.startDate = date != undefined ? this.selectDate
                : this.localeMoment(this.startDate).add(num, 'days').format(DATE_FORMAT);
            this.endDate = this.startDate;
        }
        else if(this.viewType === ViewTypes.Month){
            this.startDate = date != undefined ? this.localeMoment(date).startOf('month').format(DATE_FORMAT)
                : this.localeMoment(this.startDate).add(num, 'months').format(DATE_FORMAT);
            this.endDate = this.localeMoment(this.startDate).endOf('month').format(DATE_FORMAT);
        }
        else if(this.viewType === ViewTypes.Quarter){
            this.startDate = date != undefined ? this.localeMoment(date).startOf('quarter').format(DATE_FORMAT)
                : this.localeMoment(this.startDate).add(num, 'quarters').format(DATE_FORMAT);
            this.endDate = this.localeMoment(this.startDate).endOf('quarter').format(DATE_FORMAT);
        }
        else if(this.viewType === ViewTypes.Year) {
            this.startDate = date != undefined ? this.localeMoment(date).startOf('year').format(DATE_FORMAT)
                : this.localeMoment(this.startDate).add(num, 'years').format(DATE_FORMAT);
            this.endDate = this.localeMoment(this.startDate).endOf('year').format(DATE_FORMAT);
        }
    }

    _createHeaders() {
        let headers = [],
            start = this.localeMoment(this.startDate),
            end = this.localeMoment(this.endDate),
            header = start;

        if(this.showAgenda){
            headers.push({time: header.format(DATETIME_FORMAT), nonWorkingTime: false});
        }
        else {
            if (this.viewType === ViewTypes.Day) {
                start = start.add(this.config.dayStartFrom, 'hours');
                end = end.add(this.config.dayStopTo, 'hours');
                header = start;

                while (header >= start && header <= end) {
                    let minuteSteps = this.getMinuteStepsInHour();
                    for(let i=0; i<minuteSteps; i++){
                        let time = header.format(DATETIME_FORMAT);
                        let nonWorkingTime = this.behaviors.isNonWorkingTimeFunc(this, time);
                        headers.push({ time: time, nonWorkingTime: nonWorkingTime });
    
                        header = header.add(this.config.minuteStep, 'minutes');
                    }
                }
            }
            else {
                while (header >= start && header <= end) {
                    let time = header.format(DATETIME_FORMAT);
                    let nonWorkingTime = this.behaviors.isNonWorkingTimeFunc(this, time);
                    headers.push({ time: time, nonWorkingTime: nonWorkingTime });

                    header = header.add(1, 'days');
                }
            }
        }

        this.headers = headers;
    }

    _createInitHeaderEvents(header) {
        let start = this.localeMoment(header.time),
            startValue = start.format(DATETIME_FORMAT);
        let endValue = this.showAgenda ? (this.viewType === ViewTypes.Week ? start.add(1, 'weeks').format(DATETIME_FORMAT) : (
            this.viewType === ViewTypes.Day ? start.add(1, 'days').format(DATETIME_FORMAT) : (
                this.viewType === ViewTypes.Month ? start.add(1, 'months').format(DATETIME_FORMAT) : (
                    this.viewType === ViewTypes.Year ? start.add(1, 'years').format(DATETIME_FORMAT) :
                        start.add(1, 'quarters').format(DATETIME_FORMAT)
                )
            )
        )) : (this.viewType === ViewTypes.Day ?  start.add(this.config.minuteStep, 'minutes').format(DATETIME_FORMAT)
            : start.add(1, 'days').format(DATETIME_FORMAT));
        return {
            time:  header.time,
            nonWorkingTime: header.nonWorkingTime,
            start: startValue,
            end:   endValue,
            count: 0,
            addMore: 0,
            addMoreIndex: 0,
            events: [,,,],
        };
    }

    _createHeaderEvent(render, span, eventItem) {
        return {
            render: render,
            span: span,
            eventItem: eventItem
        };
    }

    _getEventSlotId(event){
        return this.isEventPerspective ? this._getEventGroupId(event) : event.resourceId;
    }

    _getEventGroupId(event){
        return !!event.groupId ? event.groupId.toString() : event.id.toString();
    }

    _getEventGroupName(event){
        return !!event.groupName ? event.groupName : event.title;
    }

    _generateEventGroups(){
        let eventGroups = [];
        let set = new Set();
        this.events.forEach((item) => {
            let groupId = this._getEventGroupId(item);
            let groupName = this._getEventGroupName(item);

            if(!set.has(groupId)){
                eventGroups.push({
                    id: groupId,
                    name: groupName,
                    state: item,
                });
                set.add(groupId);
            }
        })
        this.eventGroups = eventGroups;
    }

    _createInitRenderData(isEventPerspective, eventGroups, resources, headers) {
        return isEventPerspective ? eventGroups.map((eventGroup) => {
            let headerEvents = headers.map((header) => {
                return this._createInitHeaderEvents(header);
            });

            return {
                slotId: eventGroup.id,
                slotName: eventGroup.name,
                rowHeight: 0,
                headerItems: headerEvents
            };
        }) : resources.map((resource) => {
            let headerEvents = headers.map((header) => {
                return this._createInitHeaderEvents(header);
            });

            return {
                slotId: resource.id,
                slotName: resource.name,
                rowHeight: 0,
                headerItems: headerEvents,
                component: resource.component,
                componentProps: resource.componentProps
            };
        });
    }

    _getSpan(startTime, endTime, headers){
        if(this.showAgenda) return 1;

        let start = this.localeMoment(startTime),
            end = this.localeMoment(endTime),
            span = 0;

        for(let header of headers) {
            let spanStart = this.localeMoment(header.time),
            spanEnd = this.viewType === ViewTypes.Day ? this.localeMoment(header.time).add(this.config.minuteStep, 'minutes') 
                : this.localeMoment(header.time).add(1, 'days');
            
                if(spanStart < end && spanEnd > start) {
                    span++;
                }
        }

        return span;
    }

    _validateResource(resources){
        if(Object.prototype.toString.call(resources) !== "[object Array]") {
            throw new Error('Resources should be Array object');
        }

        resources.forEach((item, index) => {
            if(item == undefined) {
                console.error(`Resource undefined: ${index}`);
                throw new Error(`Resource undefined: ${index}`);
            }
            if(item.id == undefined || item.name == undefined)
            {
                console.error('Resource property missed', index, item);
                throw new Error(`Resource property undefined: ${index}`);
            }
        });
    }

    _validateEventGroups(eventGroups){
        if(Object.prototype.toString.call(eventGroups) !== "[object Array]") {
            throw new Error('Event groups should be Array object');
        }

        eventGroups.forEach((item, index) => {
            if(item == undefined) {
                console.error(`Event group undefined: ${index}`);
                throw new Error(`Event group undefined: ${index}`);
            }
            if(item.id == undefined || item.name == undefined)
            {
                console.error('Event group property missed', index, item);
                throw new Error(`Event group property undefined: ${index}`);
            }
        });
    }

    _validateEvents(events){
        if(Object.prototype.toString.call(events) !== "[object Array]") {
            throw new Error('Events should be Array object');
        }

        events.forEach((e, index) => {
            if(e == undefined) {
                console.error(`Event undefined: ${index}`);
                throw new Error(`Event undefined: ${index}`);
            }
            if(e.id == undefined || e.resourceId == undefined || e.title == undefined || e.start == undefined || e.end == undefined)
            {
                console.error('Event property missed', index, e);
                throw new Error(`Event property undefined: ${index}`);
            }
        });
    }

    _validateMinuteStep(minuteStep) {
        if (60 % minuteStep !== 0) {
            console.error('Minute step is not set properly - 60 minutes must be divisible without remainder by this number');
            throw new Error('Minute step is not set properly - 60 minutes must be divisible without remainder by this number');
        }
    }

    _compare(event1, event2){
        let start1 = this.localeMoment(event1.start), start2 = this.localeMoment(event2.start);
        if(start1 !== start2) return start1 < start2 ? -1 : 1;

        let end1 = this.localeMoment(event1.end), end2 = this.localeMoment(event2.end);
        if(end1 !== end2) return end1 < end2 ? -1 : 1;

        return event1.id < event2.id ? -1 : 1;
    }

    _createRenderData() {
        let initRenderData = this._createInitRenderData(this.isEventPerspective, this.eventGroups, this.resources, this.headers);
        //this.events.sort(this._compare);

        this.events.forEach((item) => {
            let resourceEventsList = initRenderData.filter(x => x.slotId === this._getEventSlotId(item));
            if(resourceEventsList.length > 0) {
                let resourceEvents = resourceEventsList[0];
                let span = this._getSpan(item.start, item.end, this.headers);
                let eventStart = this.localeMoment(item.start), eventEnd = this.localeMoment(item.end);
                let pos = -1;

                resourceEvents.headerItems.forEach((header, index) => {
                    let headerStart = this.localeMoment(header.start), headerEnd = this.localeMoment(header.end);
                    if(headerEnd > eventStart && headerStart < eventEnd) {
                        header.count = header.count + 1;

                        if(pos === -1)
                        {
                            let tmp = 0;
                            while (header.events[tmp] !== undefined)
                                tmp++;

                            pos = tmp;
                        }
                        let render = headerStart <= eventStart || index === 0;
                        header.events[pos] = this._createHeaderEvent(render, span, item);
                    }
                });
            }
        });

        initRenderData.forEach((resourceEvents) => {
            let maxRowsCount = 0;
            let hasSummary = false;
            resourceEvents.headerItems.forEach((headerItem) => {
                maxRowsCount = headerItem.count > maxRowsCount ? headerItem.count : maxRowsCount;

                let renderItemsCount = 0, addMoreIndex = 0, index = 0;
                while (index < this.getCellMaxEvents() - 1) {
                    if(headerItem.events[index] !== undefined) {
                        renderItemsCount++;
                        addMoreIndex = index + 1;
                    }

                    index++;
                }

                if(headerItem.events[index] !== undefined) {
                    if(renderItemsCount + 1 < headerItem.count) {
                        headerItem.addMore = headerItem.count - renderItemsCount;
                        headerItem.addMoreIndex = addMoreIndex;
                    }
                }
                else {
                    if(renderItemsCount < headerItem.count) {
                        headerItem.addMore = headerItem.count - renderItemsCount;
                        headerItem.addMoreIndex = addMoreIndex;
                    }
                }

                if(this.behaviors.getSummaryFunc !== undefined){
                    let events = [];
                    headerItem.events.forEach((e) => {
                        if(!!e && !!e.eventItem)
                            events.push(e.eventItem);
                    });

                    headerItem.summary = this.behaviors.getSummaryFunc(this, events, resourceEvents.slotId, resourceEvents.slotName, headerItem.start, headerItem.end);
                    if(!!headerItem.summary && headerItem.summary.text != undefined)
                        hasSummary = true;
                }
            });

            resourceEvents.hasSummary = hasSummary;
            let rowsCount = maxRowsCount > this.getCellMaxEvents() ? this.getCellMaxEvents() : maxRowsCount;
            if (this.config.rowHeight === "auto") {
                resourceEvents.rowHeight = rowsCount === 0 ? this.config.eventItemLineHeight + 2 : rowsCount * this.config.eventItemLineHeight + (this.config.creatable && this.config.checkConflict === false ? 20 : 2);
            } else {
                resourceEvents.rowHeight = this.config.rowHeight;
            }
            if(hasSummary)
                resourceEvents.rowHeight = resourceEvents.rowHeight + this.config.eventItemLineHeight;
        });

        this.renderData = initRenderData;
    }

    _startResizing() {
        this.resizing = true;
    }

    _stopResizing() {
        this.resizing = false;
    }

    _isResizing() {
        return this.resizing;
    }
}


