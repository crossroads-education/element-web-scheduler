import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class BodyView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
    }

    render() {

        const {schedulerData} = this.props;
        const {renderData, headers, config} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();

        let tableRows = renderData.map((item) => {
            let rowCells = headers.map((header, index) => {
                let key = item.slotId + '_' + header.time;
                let style = {width: "calc(100% + 2px)", height: "100%"};
                if(!!header.nonWorkingTime)
                    style = {...style, backgroundColor: config.nonWorkingTimeBodyBgColor};
                return (
                    <div key={key} style={style}><div/></div>
                )
            });

            return (
                <div key={item.slotId} style={{height: item.rowHeight, display:"flex"}}>
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