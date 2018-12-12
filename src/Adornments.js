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
    adornmentContainer: {
        display: "flex",
        height: props => props.ui.rowHeight,
        borderTop: "solid 1px #BCBCBC",
    },
    headerContainer: {
        width: "100%",
        height: props => props.ui.headerHeight,
    }
}

@inject("ui")
@injectSheet(styles)
@observer
class Adornments extends React.Component {

    render() {
        const { classes, ui, resources} = this.props;
        return (
            (ui.renderAdornment) ?
            <div className={classes.root}>
                {ui.renderAdornmentHeader &&
                    <div className={classes.headerContainer}> 
                        <ui.renderAdornmentHeader 
                            {...ui.renderAdornmentHeader.props}
                        />
                    </div>
                }
                {resources.map(resource => (
                    <div className={classes.adornmentContainer} key={"adornment-" + resource.id}> 
                        <ui.renderAdornment 
                            resource={resource}
                            {...ui.renderAdornment.props}
                        />
                    </div>
                ))}
            </div>
            : null
        );
    }
}

export default Adornments;
