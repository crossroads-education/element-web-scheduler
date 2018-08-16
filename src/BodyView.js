import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import classNames from "classnames";
import injectSheet from "react-jss";

const styles = theme => ({
    cell: {
        width: "100%",
        height: "100%",
        "&:nth-child(2n)": {
            "& $innerCell": {
                borderLeft: props => (props.schedulerData.config.minuteStep == 15) ? "1px dashed #c2c2c2" : "1px solid #ABABAB"
            }
        },
        borderTop: "1px solid #FFFFFF",
        extend: props => props.userStyle.cell
    },
    nonWorking: {
        backgroundColor: props => props.schedulerData.config.nonWorkingTimeBodyBgColor,
        extend: props => props.userStyle.nonWorking
    },
    innerCell: props => ({
        borderLeft: "1px solid #ABABAB",
        width: "100%",
        height: "100%",
        extend: props.userStyle.innerCell
    }),
    row: {
        display: "flex",
        extend: props => props.userStyle.row,
        "&:nth-child(1)": {
            "& $cell": {
                borderTop: "none"
            }
        }
    }
})

@injectSheet(styles)
class BodyView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
    }

    render() {
        const {schedulerData, classes} = this.props;
        const {renderData, headers} = schedulerData;
        const { cell, innerCell, row} = classes;

        let tableRows = renderData.map((item) => {
            let rowCells = headers.map((header, index) => {
                let key = item.slotId + '_' + header.time;
                return (
                    <div key={key} className={classNames(cell, {nonWorking: !!header.nonWorking})}>
                        <div className={innerCell}/>
                    </div>
                )
            });

            return (
                <div key={item.slotId} className={row} style={{height: item.rowHeight}}>
                    {rowCells}
                </div>
            );
        });

        return (
            <div>
                {tableRows}
            </div>
        );
    }
}

export default BodyView