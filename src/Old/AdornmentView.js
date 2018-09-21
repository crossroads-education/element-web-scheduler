import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import injectSheet from "react-jss"

const styles = theme => ({
    adornmentListContainer: {
        extend: theme.schedulerDisplayTable
    },
    adornmentWrapper: {
        borderTop: "solid 1px #e9e9e9",
        borderLeft: "solid 1px #e9e9e9",
        extend: props => props.userStyle.adornmentWrapper
    },
    adornmentHeaderContainer: {
        height: props => props.schedulerData.config.tableHeaderHeight,
        extend: props => props.userStyle.adornmentHeaderContainer
    }
});

@injectSheet(styles)
export default class AdornmentView extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        userStyle: PropTypes.object.isRequired
    }

    render() {
        const { schedulerData, classes, adornmentComponent, adornmentHeader } = this.props;
        const { renderData, config } = schedulerData;

        let AdornmentComponent = adornmentComponent

        return (
            <div>
                {adornmentHeader && 
                    <div className={classes.adornmentHeaderContainer}>
                        {adornmentHeader}
                    </div>
                }
                <div className={classes.adornmentListContainer}>
                    {renderData.map(item => (
                        <div key={item.slotId} className={classes.adornmentWrapper} style={{ height: item.rowHeight }}>
                            <AdornmentComponent {...item.adornmentProps} adornmentItem={item} schedulerData={schedulerData}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}