import * as React from "react";
import { observer, inject } from "mobx-react";
import injectSheet from "react-jss";
import { DraggableCore } from "react-draggable";

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
        borderLeft: "solid 1px #e6e6e6",
    },
}

@inject("ui")
@injectSheet(styles)
@observer
class Background extends React.Component {

    render() {
        
        const { classes, ui, resource } = this.props;

        return (
             <DraggableCore
                onStart={resource.startPaint}
                onDrag={resource.doPaint}
                onStop={resource.finishPaint}
                axis="x"
            >
                <div className={classes.cellRoot}>
                    {ui.cells.map(cell => (
                        <div key={cell} className={classes.backgroundCell} onClick={e => {resource.createEvent(e.target.offsetLeft);}} />
                    ))}
                </div>
            </DraggableCore>
        )
    }
}

export default Background;
