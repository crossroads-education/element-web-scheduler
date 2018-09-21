import * as React from "react";
import ShiftEvent from "./ShiftEvent";

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
            id: 8,
            start: "2017-12-18 07:30:00",
            end: "2017-12-18 10:30:00",
            resourceId: "d3",
            title: "7:30a-3:30p",
            backgroundColor: "#3091FF",
            layer: 3,
            component: ShiftEvent
        },
        {
            id: 9,
            start: "2017-12-18 14:30:00",
            end: "2017-12-18 18:30:00",
            resourceId: "d1",
            title: "2:30p-6:30p",
            backgroundColor: "#3091FF",
            layer: 3,
            component: ShiftEvent
        }
    ],
}
