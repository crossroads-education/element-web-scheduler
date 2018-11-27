import * as React from "react";
import { observer, inject } from "mobx-react";
import injectSheet from "react-jss";

const styles = {
    root: {
        width: "auto",
        height: "auto",
        display: "flex",
        flexDirection: "column",
    },
    resourceContainer: {
        display: "flex",
        height: "auto",
        borderTop: "solid 1px #bcbcbc",
        height: props => props.ui.rowHeight,
    },
    headerContainer: {
        width: "100%",
        height: props => props.ui.headerHeight,
    }
}

@inject("ui")
@injectSheet(styles)
@observer
class Resources extends React.Component {

    render() {

        const { classes, resources, ui} = this.props;

        return (
            <div className={classes.root}>
                {ui.renderResourceHeader &&
                    <div className={classes.headerContainer}> 
                        <ui.renderResourceHeader
                            {...ui.renderResourceHeader.props}
                        />
                    </div>
                }
                {resources.map(resource => (
                    <div className={classes.resourceContainer} key={resource.id}>
                        <ui.renderResource 
                            resource={resource}
                            {...resource.componentProps}
                            {...ui.renderResource.props}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default Resources;
