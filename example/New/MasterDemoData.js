import * as React from "react";
import ShiftEvent from "./ShiftEvent";
import ShiftResizer from "./ShiftResizer";

export const MasterDemoData = {
    resources: [
        {
            id: 'd1',
            componentProps: {
                name: 'Sun',
            }   
        },
        {
            id: 'd2',
            componentProps: {
                name: 'Mon',
            }
        },
        {
            id: 'd3',
            componentProps: {
                name: 'Tue',
            }
        },
        {
            id: 'd4',
            componentProps: {
                name: 'Wed',
            }
        },
        {
            id: 'd5',
            componentProps: {
                name: 'Thu',
            },
        },
        {
            id: 'd6',
            componentProps: {
                name: 'Fri',
            }
        },
        {
            id: 'd7',
            componentProps: {
                name: 'Sat',
            }
        },
    ],
    events: [
        {
            id: 6,
            start: "2017-12-17 10:30:00",
            end: "2017-12-17 13:00:00",
            resourceId: "d5",
            componentProps: {
                start: "2017-12-17 10:30:00",
                end: "2017-12-17 13:00:00",
                backgroundColor: "#3091FF",
            }, 
            layer: 3,
            component: ShiftEvent,
            resizable: true,
            resizeComponent: ShiftResizer
        },
        {
            id: 7,
            start: "2017-12-17 09:00:00",
            end: "2017-12-17 10:45:00",
            resourceId: "d2",
            componentProps: {
                start: "2017-12-17 09:00:00",
                end: "2017-12-17 10:45:00",
                backgroundColor: "#3091FF",
            }, 
            layer: 3,
            component: ShiftEvent,
            resizable: true,
            resizeComponent: ShiftResizer
        },
        {
            id: 9,
            start: "2017-12-18 14:30:00",
            end: "2017-12-18 18:00:00",
            resourceId: "d1",
            componentProps: {
                start: "2017-12-18 14:30:00",
                end: "2017-12-18 18:00:00",
                backgroundColor: "#3091FF",
            }, 
            layer: 3,
            component: ShiftEvent,
            resizable: true,
            resizeComponent: ShiftResizer
        },
        {
            id: 8,
            start: "2017-12-18 07:30:00",
            end: "2017-12-18 10:30:00",
            resourceId: "d3",
            componentProps: {
                start: "2017-12-18 7:30:00",
                end: "2017-12-18 10:30:00",
                backgroundColor: "#3091FF",
            },
            layer: 3,
            component: ShiftEvent,
            resizable: true,
            resizeComponent: ShiftResizer
        },
        {
            id: 10,
            start: "2017-12-19 15:15:00",
            end: "2017-12-19 17:30:00",
            resourceId: "d7",
            componentProps: {
                start: "2017-12-19 15:15:00",
                end: "2017-12-19 17:30:00",
                backgroundColor: "#3091FF",
            }, 
            layer: 3,
            component: ShiftEvent,
            resizable: true,
            resizeComponent: ShiftResizer
        },
        {
            id: 11,
            start: "2017-12-19 11:30:00",
            end: "2017-12-19 14:45:00",
            resourceId: "d4",
            componentProps: {
                start: "2017-12-18 11:30:00",
                end: "2017-12-18 14:45:00",
                backgroundColor: "#3091FF",
            }, 
            layer: 3,
            component: ShiftEvent,
            resizable: true,
            resizeComponent: ShiftResizer
        },
    ]
}
