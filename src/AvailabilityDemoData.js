export const AvailabilityDemoData = {
    resources: [
        {
            id: 'd1',
            name: 'Mon',
        },
        {
            id: 'd2',
            name: 'Tue',
        },
        {
            id: 'd3',
            name: 'Wed',
        },
        {
            id: 'd4',
            name: 'Thu',
        },
        {
            id: 'd5',
            name: 'Fri',
        },
    ],
    events: [
        {
            id: 1,
            start: '2017-12-18 06:00:00',
            end: '2017-12-18 07:30:00',
            resourceId: 'd1',
            title: 'av',
            resizable: false,
            movable: false,
            type: 'available'
        },
        {
            id: 2,
            start: '2017-12-18 07:30:00',
            end: '2017-12-18 12:45:00',
            resourceId: 'd1',
            title: 'unav',
            resizable: false,
            movable: false,
            type: 'unavailable'
        },
        {
            id: 3,
            start: '2017-12-18 12:45:00',
            end: '2017-12-18 18:00:00',
            resourceId: 'd1',
            title: 'tent',
            resizable: false,
            movable: false,
            type: 'tentative'
        }
    ],
}
