import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import classNames from "classnames";
import injectSheet from "react-jss";

const styles = theme => ({
    cell: {
        width: "calc(100% + 2px)",
        height: "100%"
    },
    nonWorking: {
        backgroundColor: props => props.schedulerData.config.nonWorkingTimeBodyBgColor
    },
    innerCell: {
        borderTop: "1px solid #e9e9e9",
        borderLeft: "1px solid #e9e9e9",
        width: "100%",
        height: "100%"
    },
    row: {
        display: "flex"
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
            <div style={{borderRight: "none", borderBottom: "none"}}>
                {tableRows}
            </div>
        );
    }
}

export default BodyView