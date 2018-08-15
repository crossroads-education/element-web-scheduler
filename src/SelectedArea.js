import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import injectSheet from "react-jss"

const styles = theme => ({
    selectedArea: props => ({
        position: "absolute",
        border: props.schedulerData.config.selectedAreaBorder,
        left: props.left,
        width: props.width,
        top: 1,
        bottom: 0,
        zIndex: props.schedulerData.config.selectedAreaZIndex,
        background: props.schedulerData.config.selectedAreaBackground || props.schedulerData.config.selectedAreaColor,
        extend: props.userStyle.selectedArea
    })
})

@injectSheet(styles)
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
        const { classes } = this.props;
        return (
            <div className={classes.selectedArea} />
        );
    }
}

export default SelectedArea