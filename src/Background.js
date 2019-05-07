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
        height: "100%"
    },
    backgroundCell: {
        width: "100%",
        height: "100%",
        flexBasis: "1px",
        boxSizing: "border-box"
    },
    solidLeft: { borderLeft: "solid 1px #bcbcbc" },
    dashedLeft: { borderLeft: "dashed 1px #dfdfdf" }
}

@inject("ui", "schedule")
@injectSheet(styles)
@observer
class Background extends React.Component {
    getBorderClass(cell, idx) {
        if (idx === 0 || cell.time.get("minutes") === 0) return "solidLeft";
        else return "dashedLeft";
    }

    render() {
        const { classes, ui, resource, schedule } = this.props;
        const cells = (<div className={classes.cellRoot}>
                    {ui.cells.map((cell, idx) => (
                        <div
                            key={"cell-" + idx} 
                            style={{ flexGrow: cell.dur }}
                            className={classes.backgroundCell + " " + classes[this.getBorderClass(cell, idx)] } 
                            onClick={(schedule.paint) ? undefined : e => {resource.createEvent(e.target.offsetLeft);}} 
                        />
                    ))}
                </div>);
        return schedule.disableMobileEdit ? 
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
