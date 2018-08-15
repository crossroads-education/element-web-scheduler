import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {SummaryPos} from './index'
import {SummaryPosMap} from "./SummaryPos";
import injectSheet from "react-jss";

const styles = theme => ({

    summaryContainer: props => {
        const { left, width, top, schedulerData, summary } = props;
        const {config} = schedulerData;
        return {
            color: config.summaryColor | summary.color,
            textAlign: SummaryPosMap[config.summaryPos],
            height: config.eventItemHeight,
            fontSize: summary.fontSize | 12,
            cursor: "default",
            left,
            width,
            top,
            ...theme.timelineEvent,
            ...theme.header2Text,
            extend: props.userStyle.summary
        }
    }

})

@injectSheet(styles)
class Summary extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        summary: PropTypes.object.isRequired,
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
    }

    render() {
        const {summary, classes} = this.props;

        return (
            <a className={classes.summaryContainer}>
                {summary.text}
            </a>
        );
    }
}

export default Summary