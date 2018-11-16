import * as React from "react";
import injectSheet, {ThemeProvider} from "react-jss";
import {PropTypes} from "prop-types";   
import Theme from "./Theme";
import { observer } from "mobx-react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import { DraggableCore } from "react-draggable";

const styles = {
    schedulerContainer: {
        width: "100%",
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%"
    },
    scheduleBodyContainer: {
        width: "100%",
        height: "auto",
        position: "relative",
        display: "flex",
    },
    rowRoot: {
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column"
    },
    rowContainer: { 
        display: "flex",
        flex: 1,
        height: "auto",
        borderTop: "solid 1px #9d9d9d"
    },
    eventContainer: {
        width: "100%",
        position: "relative"
    },
    cellRoot: {
        display: "flex",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: props => props.schedulerStore.ui.backgroundLayer,
        "& $backgroundCell:nth-child(2n)": {
            borderLeft: "dashed 1px #dfdfdf"
        },
    },
    backgroundCell: {
        width: "100%",
        height: "100%",
        borderLeft: "solid 1px #e6e6e6",
    },
    paintEventContainer: {
        zIndex: 999,
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    adornmentContainer: {
        borderLeft: "solid 1px #e6e6e6"
    },
    headerRoot: {
        display: "flex"
    },
    headerContainer: {
        display: "flex",
        minHeight: "40px",
        alignItems: "center",
        borderRight: "solid 1px #e6e6e6",
        borderLeft: "solid 1px #e6e6e6",
        flex: 1
    },
    header: {
        width: "100%"
    }
}


@injectSheet(styles)
@observer
class Scheduler extends React.Component {
    eventRowRef;
    resourceRef;
    adornmentRef;

    constructor(props) {
        super(props);
        this.eventRowRef = null;
        this.resourceRef = null;
        this.adornmentRef = null;
    }

    static propTypes = {
        schedulerStore: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.updateSize();
    }

    updateSize = () => {
        this.props.schedulerStore.ui.updateSize(this.eventRowRef, this.resourceRef, this.adornmentRef);
    }

    setEventRowRef = element => {
        this.eventRowRef = element;
    }

    setResourceRef = element => {
        this.resourceRef = element;
    }

    setAdornmentRef = element => {
        this.adornmentRef = element;
    }

    render() {
        const { schedulerStore, classes } = this.props;

        const { ui } = schedulerStore;

        return (
            <ThemeProvider theme={Theme}>
                <MuiThemeProvider theme={createMuiTheme({typography: {useNextVariants: true }})}>
                    <div className={this.props.classes.scheduleBodyContainer} >
                        <div className={classes.rowRoot}>
                            <div className={classes.headerRoot}>
                                <div className={classes.resourceContainer} style={{width: ui.resourceWidth}}>
                                    {ui.renderResourceHeader && 
                                        <ui.renderResourceHeader {...ui.renderResourceHeader.props}/>
                                    }
                                </div>
                                {ui.displayHeaders && 
                                    <div className={classes.headerContainer}>
                                        {ui.headers.map(header => (
                                            <div className={classes.header} key={header}>
                                                <span style={{ float: "left" }}> {header} </span>
                                            </div>
                                        ))}
                                    </div>
                                }
                                <div className={classes.adornmentContainer} style={{width: ui.adornmentWidth}}>
                                    {ui.renderAdornmentHeader && ui.renderAdornment && 
                                        <ui.renderAdornmentHeader {...ui.renderAdornmentHeader.props}/>
                                    }
                                </div>
                            </div>
                            {schedulerStore.resources.map(resource => (
                                <div className={classes.rowContainer} key={resource.id}>
                                    <div className={classes.resourceContainer} ref={this.setResourceRef} >
                                        <ui.renderResource {...resource.componentProps} resource={resource} {...ui.renderResource.props}/>
                                    </div> 
                                    <div className={classes.eventContainer} ref={this.setEventRowRef}>
                                            {resource.todaysEvents.map(event => {
                                                return (<event.render
                                                    key={event.id}
                                                    eventModel={event}
                                                    active={event.active}
                                                    componentProps={event.componentProps}
                                                    resizable={event.resizable}
                                                    width={event.width}
                                                    left={event.left}
                                                />);
                                            })}

                                            {resource.paintedEvent &&
                                                <resource.paintedEvent.render
                                                    eventModel={resource.paintedEvent}
                                                    active={resource.paintedEvent.active}
                                                    componentProps={resource.paintedEvent.componentProps}
                                                    resizable={resource.paintedEvent.resizable}
                                                    width={resource.paintedEvent.width}
                                                    left={resource.paintedEvent.left}
                                                />
                                            }
                                            <DraggableCore
                                                onStart={resource.startPaint}
                                                onDrag={resource.doPaint}
                                                onStop={resource.finishPaint}
                                                axis="x"
                                            >
                                                <div className={classes.cellRoot}>
                                                    {schedulerStore.cells.map(cell => (
                                                        <div key={cell} className={classes.backgroundCell} onClick={e => {resource.createEvent(e.target.offsetLeft);}} />
                                                    ))}
                                                </div>
                                            </DraggableCore>
                                            
                                    </div>
                                    {ui.renderAdornment && 
                                        <div className={classes.adornmentContainer} ref={this.setAdornmentRef}>
                                            <ui.renderAdornment resource={resource} {...ui.renderAdornment.props}/>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </MuiThemeProvider>
            </ThemeProvider>
        )
    }
}

export default Scheduler;