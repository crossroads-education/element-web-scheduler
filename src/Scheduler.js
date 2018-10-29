import * as React from "react";
import injectSheet, {ThemeProvider} from "react-jss";
import {PropTypes} from "prop-types";   
import Theme from "./Theme";
import { observer } from "mobx-react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";

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
        height: "100%",
        position: "relative",
        display: "flex",
    },
    rowRoot: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderLeft: "solid 1px #BEBEBE",
        borderRight: "solid 1px #BEBEBE",
        "& $rowContainer:first-child": {
            borderTop:"solid 1px #BEBEBE"
        }
    },
    rowContainer: {
        display: "flex",
        flex: 1,
        borderBottom: "solid 1px #BEBEBE"
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
        "& $backgroundCell:nth-child(2n)": {
            borderLeft: "dashed 1px #D4D4D4"
        },
        borderRight: "solid 1px #BEBEBE"
    },
    backgroundCell: {
        width: "100%",
        height: "100%",
        borderLeft: "solid 1px #BEBEBE",
        borderBottom: "solid 1px #BEBEBE"
    },
    headerRoot: {
        display: "flex"
    },
    headerContainer: {
        display: "flex"
    },
    header: {
        width: "100%"
    }
}


@injectSheet(styles)
@observer
class Scheduler extends React.Component {
    bodyRootRef;

    constructor(props) {
        super(props);
        this.bodyRootRef = React.createRef();
        this.resourceRef = React.createRef();
    }

    static propTypes = {
        schedulerStore: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.schedulerStore.ui.setBodySize(this.bodyRootRef);
        this.props.schedulerStore.ui.setResourceSize(this.resourceRef);
    }

    render() {
        const { schedulerStore, classes } = this.props;

        const { ui } = schedulerStore;

        return (
            <ThemeProvider theme={Theme}>
                <MuiThemeProvider theme={createMuiTheme()}>
                    <div className={this.props.classes.scheduleBodyContainer} >
                        <div className={classes.rowRoot}>
                            <div className={classes.headerRoot}>
                                <div className={classes.resourceContainer} style={{width: ui.resourceWidth}}>

                                </div>
                                {ui.displayHeaders && 
                                    <div className={classes.headerContainer} style={{width: ui.bodyWidth}}>
                                        {schedulerStore.ui.headers.map(header => (
                                            <div className={classes.header} key={header}> 
                                                {header}
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                            {schedulerStore.resources.map(resource => (
                                <div className={classes.rowContainer} key={resource.id}>
                                    <div className={classes.resourceContainer} ref={this.resourceRef} >
                                        <ui.renderResource {...resource.componentProps} resource={resource} />
                                    </div> 
                                    <div className={classes.eventContainer} ref={this.bodyRootRef}>
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
                                        <div className={classes.cellRoot}> 
                                            {schedulerStore.cells.map(cell => (
                                                <div key={cell} className={classes.backgroundCell}/>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={classes.adornmentContainer}>
                                        <ui.renderAdornment resource={resource} />
                                    </div>
                                    
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