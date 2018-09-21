import * as React from "react";
import AvailabilityEvent from "../example/AvailabilityEvent";
import ShiftEvent from "../example/ShiftEvent";

export const MasterDemoData = {
    resources: [
        {
            id: 'd1',
            name: 'Sun',
        },
        {
            id: 'd2',
            name: 'Mon',
        },
        {
            id: 'd3',
            name: 'Tue',
        },
        {
            id: 'd4',
            name: 'Wed',
        },
        {
            id: 'd5',
            name: 'Thu',
        },
        {
            id: 'd6',
            name: 'Fri',
        },
        {
            id: 'd7',
            name: 'Sat',
        },
    ],
    events: [
        {
            id: 1,
            start: '2017-12-18 06:00:00',
            end: '2017-12-18 18:00:00',
            resourceId: 'd1',
            type: 'unavailable',
            componentProps: { backgroundColor: "#D8D8D8"},
            title: '',
            layer: 1,
            component: AvailabilityEvent
        },
        {
            id: 2,
            start: '2017-12-18 06:00:00',
            end: '2017-12-18 18:00:00',
            resourceId: 'd2',
            type: 'available',
            componentProps: { backgroundColor: 'white'},
            title: '',
            layer: 1,
            component: AvailabilityEvent
        },
        {
            id: 3,
            start: '2017-12-18 06:00:00',
            end: '2017-12-18 18:00:00',
            resourceId: 'd3',
            type: 'unavailable',
            componentProps: { backgroundColor: "#D8D8D8"},
            title: '',
            layer: 1,
            component: AvailabilityEvent
        },
        {
            id: 4,
            start: '2017-12-18 06:00:00',
            end: '2017-12-18 18:00:00',
            resourceId: 'd4',
            type: 'unavailable',
            componentProps: { backgroundColor: "#D8D8D8"},
            title: '',
            layer: 1,
            component: AvailabilityEvent
        },
        {
            id: 5,
            start: '2017-12-18 06:00:00',
            end: '2017-12-18 18:00:00',
            resourceId: 'd5',
            type: 'unavailable',
            componentProps: { backgroundColor: "#D8D8D8"},
            title: '',
            layer: 1,
            component: AvailabilityEvent
        },
        {
            id: 6,
            start: '2017-12-18 06:00:00',
            end: '2017-12-18 18:00:00',
            resourceId: 'd6',
            type: 'unavailable',
            componentProps: { backgroundColor: "#D8D8D8"},
            title: '',
            layer: 1,
            component: AvailabilityEvent
        },
        {
            id: 7,
            start: '2017-12-18 06:00:00',
            end: '2017-12-18 18:00:00',
            resourceId: 'd7',
            type: 'unavailable',
            componentProps: { backgroundColor: "#D8D8D8"},
            title: '',
            layer: 1,
            component: AvailabilityEvent
        },
        {
            id: 8,
            start: "2017-12-18 07:30:00",
            end: "2017-12-18 10:30:00",
            resourceId: "d3",
            title: "7:30a-3:30p",
            componentProps: { backgroundColor: "#3091FF"},
            layer: 3,
            component: ShiftEvent
        },
        {
            id: 9,
            start: "2017-12-18 14:30:00",
            end: "2017-12-18 18:30:00",
            resourceId: "d1",
            title: "2:30p-6:30p",
            componentProps: { backgroundColor: "#3091FF" },
            layer: 3,
            component: ShiftEvent
        }
    ],
}
