const theme = {
    header1Text: {
        fontSize: 25,
        color: "90CDF9",
        fontWeight: 500
    },
    header2Text: {
        fontSize: 14,
        fontWeight: 500
    },
    header3Text: {
        fontSize: 12,
        fontWeight: 500
    },
    baseText: {
        fontSize: 12
    },
    helpText: {
        fontSize: 12,
        color: "#999"
    },
    disabledText: {
        fontSize: 12,
        color: "#ccc"
    },
    scheduler: {
        margin: "20px auto",
        borderSpacing: 0
    },
    resourceView: {
        border: "1px solid #e9e9e9",
        overflow: "hidden"
    },
    schedulerView: {
        borderBottom: "1px solid #e9e9e9",
    },
    schedulerContent: {
        position: "relative",
    },
    schedulerBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none"
    },
    schedulerDisplayTable: {
        width: "100%",
        margin: 0,
        padding: 0,
        borderSpacing: 0,
        textAlign: "center"
    },
    schedulerTable: {
        border: "1px solid #e9e9e9"
    },
    schedulerContentTable: {
        margin: 0,
        padding: 0,
        border: "0 solid #e9e9e9",
        
    },
    timelineEvent: {
        position: "absolute"
    },
    dayEvent: {
        position: "relative",
        display: "inline-block",
        margin: "0px 5px"
    },
    dayEventContainer: {
        textAlign: "left",
        padding: "5px 5px 0 5px"
    },
    roundAll: {
        borderRadius: 14
    },
    roundHead: {
        borderRadius: "14px 0px 0px 14px"
    },
    roundTail: {
        borderRadius: "0px 14px 14px 0px"
    },
    roundNone: {
        borderRadius: "0px"
    },
    eventContainer: {
        position: "relative"
    },
    eventItem: {
        margin: "1px 0",
        width: "100%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: "#fff",
        paddingRight: "20px"
    },
    overflowText: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        paddingRight: "5px"
    },
    statusDot: {
        width: "14px",
        height: "14px",
        borderRadius: "7px"
    },
    antRadioButtonWrapperChecked: {
        backgroundColor: "#108EE9",
        color: "#FFFFFF"
    },
    iconNavHover: {
        color: "#1E90FF",
        boxShadow: "0 0 0px",
        cursor: "pointer"
    },
    addMorePopoverOverlay: {
        position: "absolute",
        zIndex: 5,
        border: "1px solid #e5e5e5",
        backgroudColor: "#fff",
        boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
        padding: "10px"
    },
    popoverCalendar: {
        width: 300
    },
    antCalendar: {
        boxShadow: "0 1px 6px rgba(0,0,0,0)"
    },
    eventResizer: {
        position: "absolute",
        zIndex: 4,
        display: "block",
        width: 7,
        top: -1,
        bottom: -1
    },
    eventStartResizer: {
        cursor: "w-resize",
        left: -1
    }, 
    eventEndResizer: {
        cursor: "e-resize",
        right: -1
    },
    selectedArea: {
        position: "absolute"
    }
}

export default theme;