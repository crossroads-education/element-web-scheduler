import * as React from "react";
import { observer, inject } from "mobx-react";
import injectSheet from "react-jss";

const styles = {
    root: {
        width: "auto",
        height: "auto",
        display: "flex",
        flexDirection: "column"
    },
    resourceContainer: {
        display: "flex",
        height: "auto",
        borderTop: "solid 1px #9d9d9d",
        height: props => props.ui.rowHeight
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
