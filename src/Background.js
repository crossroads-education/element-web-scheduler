import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import moment from "moment";
import {observer} from "mobx-react";

const styles = theme => ({
    backgroundRoot: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        zIndex: props => (props.layer),
        position: "absolute",
        "& .backgroundRow": {
            width: "100%",
            height: "100%",
            display: "flex",
            boxSizing: "border-box",
            borderTop: theme.borders.row,
            backgroundColor: theme.rowColors.even,
            "& .backgroundCell": {
                width: "100%",
                height: "100%",
                boxSizing: "border-box"
            },
            "& .backgroundCell:nth-child(odd)": {
                borderRight: theme.borders.cell.odd
            },
            "& .backgroundCell:nth-child(even)": {
                borderRight: theme.borders.cell.even
            },
            "& .backgroundCell:last-child": {
                borderRight: "none"
            }
        },
        "& .backgroundRow:nth-child(odd)": {
            backgroundColor: theme.rowColors.odd
        }
    }
});

@observer
@injectSheet(styles)
export default class Background extends React.Component {

    static propTypes = {
        cells: PropTypes.number.isRequired,
        rows: PropTypes.array.isRequired,
        layer: PropTypes.number.isRequired
    }

    addEvent = (e, row) => {
        row.createEvent(e.target.offsetLeft);
    }

    rows = (rows, cellCount) => {
        let backgroundRows = [];
        rows.forEach((row, i) => {
            const cells = this.cells(cellCount, row);

            backgroundRows.push(
                <div className="backgroundRow" key={i}>
                    {cells}
                </div>
            )
        });

        return backgroundRows;
    }

    cells = (count, row) => {
        let cells = [];
        for(var i = 0; i < count; i++) {
            cells.push(
                <div className="backgroundCell" key={i} onClick={e => this.addEvent(e, row)}/>
            )
        }

        return cells;
    }

    render() {
        const {rows, cells, classes} = this.props;
        return (
            <div className={classes.backgroundRoot}>
                {this.rows(rows, cells)}
            </div>
        )
    }
}
