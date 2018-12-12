import * as React from "react";
import { observer, inject } from "mobx-react";
import injectSheet from "react-jss";
import { DraggableCore } from "react-draggable";
import { Hidden } from "@material-ui/core";

const styles = {
    cellRoot: {
        display: "flex",
        position: "absolute",
        width: "100%",
        zIndex: props => props.ui.backgroundLayer,
        "& $backgroundCell:nth-child(2n)": {
            borderLeft: "dashed 1px #dfdfdf"
        },
        height: "100%"
    },
    backgroundCell: {
        width: "100%",
        height: "100%",
        borderLeft: "solid 1px #bcbcbc",
    },
}

@inject("ui", "schedule")
@injectSheet(styles)
@observer
class Background extends React.Component {

    render() {
        const { classes, ui, resource, schedule } = this.props;
        const cells = (<div className={classes.cellRoot}>
                    {ui.cells.map(cell => (
                        <div
                            key={"cell-" + cell} 
                            className={classes.backgroundCell} 
                            onClick={(schedule.paint) ? undefined : e => {resource.createEvent(e.target.offsetLeft);}} 
                        />
                    ))}
                </div>);
        return schedule.disableMobileAdd ? 
            (
                <React.Fragment>
                    <Hidden smDown key="web-background">
                        <DraggableCore
                            onStart={(schedule.paint)? resource.startPaint:undefined}
                            onDrag={(schedule.paint)? resource.doPaint:undefined}
                            onStop={(schedule.paint)? resource.finishPaint:undefined}
                            axis="x"
                        >
                            {cells}
                        </DraggableCore>
                    </Hidden>
                    <Hidden mdUp key="mobile-background">
                        {cells}
                    </Hidden>
                </React.Fragment>

            )
            : (
                <DraggableCore
                    onStart={(schedule.paint) ? resource.startPaint : undefined}
                    onDrag={(schedule.paint) ? resource.doPaint : undefined}
                    onStop={(schedule.paint) ? resource.finishPaint : undefined}
                    axis="x"
                >
                    {cells}
                </DraggableCore>
            );
    }
}

export default Background;
