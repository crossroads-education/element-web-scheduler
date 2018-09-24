import * as React from "react";
import injectSheet from "react-jss";
import {PropTypes} from "prop-types";
import moment from "moment";

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

@injectSheet(styles)
export default class Background extends React.Component {

    static propTypes = {
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        minutesPerCell: PropTypes.number.isRequired,
        rowCount: PropTypes.number.isRequired,
        layer: PropTypes.number.isRequired
    }

    rows = (rowCount, cellCount) => {
        let rows = [];
        for(var i = 0; i < rowCount; i++) {
            const cells = this.cells(cellCount)
           
            rows.push(
                <div className="backgroundRow" key={i}>
                    {cells}
                </div>
            )
        }

        return rows;
    }

    cells = count => {
        let cells = [];
        for(var i = 0; i < count; i++) {
            cells.push(
                <div className="backgroundCell" key={i}/>
            )
        }

        return cells;
    }

    render() {
        const {classes, start, end, minutesPerCell, rowCount} = this.props;

        const totalMinutes = moment(end).diff(moment(start), "minutes");

        const cells = totalMinutes / minutesPerCell;

        console.log(cells, totalMinutes, minutesPerCell, rowCount);

        return (
            <div className={classes.backgroundRoot}>
                {this.rows(rowCount, cells)}
            </div>
        )
    }
}
