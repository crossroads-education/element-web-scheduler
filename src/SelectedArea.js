import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class SelectedArea extends Component {
    constructor(props){
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }

    render() {
        const {left, width, schedulerData} = this.props;
        const {config} = schedulerData;

        return (
            <div className="selected-area" style={{ border: config.selectedAreaBorder, left: left+1, width: width-1, top: 1, bottom: 0, zIndex: config.selectedAreaZIndex, background: config.selectedAreaBackground || config.selectedAreaColor }}>
            </div>
        );
    }
}

export default SelectedArea