import * as React from "react";
import injectSheet, {ThemeProvider} from "react-jss";
import {PropTypes} from "prop-types";
import {Background, Body,  Row, Resources} from "./";
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
        position: "relative"
    }
}


@injectSheet(styles)
@observer
class Scheduler extends React.Component {
    bodyRootRef;

    constructor(props) {
        super(props);
        this.bodyRootRef = React.createRef();
    }

    static propTypes = {
        schedulerStore: PropTypes.object.isRequired,
        resourceComponent: PropTypes.func.isRequired,
        popoverComponent: PropTypes.func
    }

    componentDidMount() {
        this.props.schedulerStore.setBodySize(this.bodyRootRef);
    }

    render() {
        const {schedulerStore, resourceComponent} = this.props;
        const rows = schedulerStore.resources.map(resource => (
            <Row
                rowModel={resource}
                activeLayer={schedulerStore.activeLayer}
            />
        )); 

        return (
            <ThemeProvider theme={Theme}>
                <MuiThemeProvider theme={createMuiTheme()}>
                    <div className={this.props.classes.schedulerContainer}>
                        <Resources
                            resources={schedulerStore.resources}
                            resourceComponent={resourceComponent}
                        />
                        <div className={this.props.classes.scheduleBodyContainer} ref={this.bodyRootRef}>
                            <Background
                                cells={schedulerStore.cells}
                                rowCount={schedulerStore.resources.length} 
                                layer={schedulerStore.backgroundLayer}
                            />
                            <Body
                                rows={rows}
                                activeLayer={schedulerStore.activeLayer}
                            />
                        </div>
                    </div>
                </MuiThemeProvider>
            </ThemeProvider>
            
        )
    }
}

export default Scheduler;