import * as React from "react";
import { Row, Col } from "antd";
import injectSheet from "react-jss";
import classNames from "classnames";

const styles = theme => ({
    container: {
        width: "300px"
    },
    statusDot: {
        ...theme.statusDot,
        backgroundColor: props => props.statusColor
    },
    header2Text: {
        ...theme.header2Text
    },
    overflowText: {
        ...theme.overflowText
    },
    helpText: {
        ...theme.helpText
    },
    opSpan: {
        ...theme.header2Text,
        color: '#108EE9', 
        cursor: 'pointer' 
    },
    header1Text: {
        ...theme.header1Text
    },
    timeLabel: {
        marginLeft: 8
    }
});

@injectSheet(styles)
export default class DefaultEventItemPopover extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div className={classes.statusDot}/>
                    </Col>
                    <Col span={22} className={classes.overflowText}>
                        <span className={classes.header2Text} title={this.props.title}>{this.props.title}</span>
                    </Col>
                </Row>
                {this.props.subtitle ? (
                    <Row type="flex" align="middle">
                        <Col span={2}>
                            <div />
                        </Col>
                        <Col span={22} className={classes.overflowText}>
                            <span className={classes.header2Text} title={this.props.subtitle}>{this.props.subtitle}</span>
                        </Col>
                    </Row>
                ) : null}
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    <Col span={22}>
                        <span className={classes.header1Text}>{this.props.startTime}</span>
                        <span className={classNames(classes.helpText, classes.timeLabel)}>{this.props.startDate}</span>
                        <span className={classNames(classes.header2Text, classes.timeLabel)}>-</span>
                        <span className={classNames(classes.header1Text, classes.timeLabel)}>{this.props.endTime}</span>
                        <span className={classNames(classes.helpText, classes.timeLabel)}>{this.props.endDate}</span>
                    </Col>
                </Row>
                {this.props.eventOps &&
                    <Row type="flex" align="middle">
                        <Col span={2} />
                        <Col span={22}>
                            {this.props.opOne &&
                                <span
                                    className={classes.opSpan}
                                    onClick={this.props.opOneClick}
                                >
                                    {this.props.opOne}
                                </span>
                            }
                            <Col span={2} />    
                            {this.props.opTwo &&
                                <span
                                    className={classes.opSpan}
                                    onClick={this.props.opTwoClick}
                                >
                                    {this.props.opTwo}
                                </span>
                            }
                        </Col>
                    </Row>
                }
            </div>
        );
    }

}