import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {ViewTypes} from './index'
import injectSheet from "react-jss";
import classNames from "classnames";

const styles = theme => ({
    listElement: {
        width: "100%",
        borderTop: "solid 1px #e9e9e9",
        borderLeft: "solid 1px #e9e9e9",
        textAlign: "center"
    },
    nonWorkingElement: props =>  ({
        color: props.schedulerData.config.nonWorkingTimeHeadColor,
        backgroundColor: props.schedulerData.config.nonWorkingTimeHeadBgColor
    }),
    header3Text: {
        ...theme.header3Text
    },
    headerContainer: {
        height: props => props.schedulerData.getTableHeaderHeight(),
        display: "flex"
    }
});

@injectSheet(styles)
class HeaderView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        nonAgendaCellHeaderTemplateResolver : PropTypes.func,
    }

    render() {
        const {schedulerData, nonAgendaCellHeaderTemplateResolver, classes} = this.props;
        const {headers, viewType, config, localeMoment} = schedulerData;
        let headerHeight = schedulerData.getTableHeaderHeight();
        let minuteStepsInHour = schedulerData.getMinuteStepsInHour();
        const {nonWorkingElement } = classes;
        let headerList = [];
        let style = {};
        if(viewType === ViewTypes.Day){
            headers.forEach((item, index) => {
                if(index % minuteStepsInHour === 0){
                    let datetime = localeMoment(item.time);

                    let pFormattedList = config.nonAgendaDayCellHeaderFormat.split('|').map(item => datetime.format(item));
                    let element = (nonAgendaCellHeaderTemplateResolver) ?
                        nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList)
                    : (
                            <div key={item.time} className={classNames(classes.listElement, { nonWorkingElement: !!item.nonWorkingTime})}>
                            {pFormattedList.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </div>
                    );
                    headerList.push(element);
                }
            })
        }
        else {
            headerList = headers.map((item, index) => {
                let datetime = localeMoment(item.time);
                let pFormattedList = config.nonAgendaOtherCellHeaderFormat.split('|').map(item => datetime.format(item));

                return (nonAgendaCellHeaderTemplateResolver) ? 
                nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList[index]) 
                : (
                        <div key={item.time} className={classNames(classes.listElement, { nonWorkingElement: !!item.nonWorkingTime })}>
                        {pFormattedList.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </div>
                );
            });
        }

        return (
            <div className={classes.headerContainer}>
                {headerList}
            </div>
        );
    }
}

export default HeaderView
