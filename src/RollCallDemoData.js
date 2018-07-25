export const RollCallDemoData = {
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
            id: 0,
            layer: 0,
            start: '2017-12-18 09:00:00',
            end: '2017-12-18 10:15:00',
            resourceId: 'd2',
            type: 'ScheduleEvent',
            title: '9:00a - 10:15a',
            disableInteractions: true
        },
        {
            id: 1,
            layer: 1,
            start: '2017-12-18 09:00:00',
            end: '2017-12-18 9:15:00',
            resourceId: 'd1',
            isLeftMost: true,
            isRightMost: true,
            isOver: true,
            isScheduled: true,
            isHere: false,
            title: '',
            disableInteractions: true
        },
        {
            id: 2,
            layer: 1,
            start: '2017-12-18 09:15:00',
            end: '2017-12-18 10:30:00',
            resourceId: 'd1',
            isLeftMost: false,
            isRightMost: false,
            isOver: true,
            isScheduled: true,
            isHere: true,
            title: '',
            disableInteractions: true
        },
        {
            id: 3,
            layer: 1,
            start: '2017-12-18 10:30:00',
            end: '2017-12-18 10:45:00',
            resourceId: 'd1',
            isLeftMost: false,
            isRightMost: true,
            isOver: true,
            isScheduled: false,
            isHere: true,
            title: '',
            disableInteractions: true
        },
        {
            id: 4,
            layer: 1,
            start: '2017-12-18 15:00:00',
            end: '2017-12-18 17:00:00',
            resourceId: 'd1',
            isLeftMost: true,
            isRightMost: true,
            isOver: false,
            isScheduled: true,
            isHere: false,
            title: '',
            disableInteractions: true
        },
    ],
}
