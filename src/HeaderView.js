import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {ViewTypes} from './index'

class HeaderView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        nonAgendaCellHeaderTemplateResolver : PropTypes.func,
    }

    render() {
        const {schedulerData, nonAgendaCellHeaderTemplateResolver} = this.props;
        const {headers, viewType, config, localeMoment} = schedulerData;
        let headerHeight = schedulerData.getTableHeaderHeight();
        let cellWidth = schedulerData.getContentCellWidth();
        let minuteStepsInHour = schedulerData.getMinuteStepsInHour();

        let headerList = [];
        let style = {};
        if(viewType === ViewTypes.Day){
            headers.forEach((item, index) => {
                if(index % minuteStepsInHour === 0){
                    let datetime = localeMoment(item.time);
                    const isCurrentTime = datetime.isSame(new Date(), 'hour');

                    style = !!item.nonWorkingTime ? { width: config.schedulerContentWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : { width: config.schedulerContentWidth};

                    let pFormattedList = config.nonAgendaDayCellHeaderFormat.split('|').map(item => datetime.format(item));
                    let element;

                    if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
                        element = nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList, style)
                    }
                    else {
                        const pList = pFormattedList.map((item, index) => (
                            <div key={index}>{item}</div>
                        ));

                        element = (
                            <div key={item.time} className="header3-text" style={style}>
                                {pList}
                            </div>
                        );
                    }

                    headerList.push(element);
                }
            })
        }
        else {
            headerList = headers.map((item, index) => {
                let datetime = localeMoment(item.time);
                style = !!item.nonWorkingTime ? { width: config.schedulerContentWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : { width: config.schedulerContentWidth};

                let pFormattedList = config.nonAgendaOtherCellHeaderFormat.split('|').map(item => datetime.format(item));

                if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
                    return nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList, style)
                }

                const pList = pFormattedList.map((item, index) => (
                    <div key={index}>{item}</div>
                ));

                return (
                    <div key={item.time} style={style}>
                        {pList}
                    </div>
                );
            });
        }

        return (
            <div style={{height: headerHeight, display: "flex"}}>
                {headerList}
            </div>
        );
    }
}

export default HeaderView
