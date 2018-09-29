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
        }
    ]
}
