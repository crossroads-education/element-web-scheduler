import * as React from "react";
import { Row, Col } from "antd";

export default class DefaultEventItemPopover extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ width: '300px' }}>
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div className="status-dot" style={{ backgroundColor: this.props.statusColor }} />
                    </Col>
                    <Col span={22} className="overflow-text">
                        <span className="header2-text" title={this.props.title}>{this.props.title}</span>
                    </Col>
                </Row>
                {this.props.subtitle ? (
                    <Row type="flex" align="middle">
                        <Col span={2}>
                            <div />
                        </Col>
                        <Col span={22} className="overflow-text">
                            <span className="header2-text" title={this.props.subtitle}>{this.props.subtitle}</span>
                        </Col>
                    </Row>
                ) : null}
                <Row type="flex" align="middle">
                    <Col span={2}>
                        <div />
                    </Col>
                    <Col span={22}>
                        <span className="header1-text">{this.props.startTime}</span>
                        <span className="help-text" style={{ marginLeft: '8px' }}>{this.props.startDate}</span>
                        <span className="header2-text" style={{ marginLeft: '8px' }}>-</span>
                        <span className="header1-text" style={{ marginLeft: '8px' }}>{this.props.endTime}</span>
                        <span className="help-text" style={{ marginLeft: '8px' }}>{this.props.endDate}</span>
                    </Col>
                </Row>
                {this.props.eventOps &&
                    <Row type="flex" align="middle">
                        <Col span={2} />
                        <Col span={22}>
                            {this.props.opOne &&
                                <span
                                    className="header2-text"
                                    style={{ color: '#108EE9', cursor: 'pointer' }}
                                    onClick={this.props.opOneClick}
                                >
                                    {this.props.opOne}
                                </span>
                            }
                            <Col span={2} />    
                            {this.props.opTwo &&
                                <span
                                    className="header2-text"
                                    style={{ color: '#108EE9', cursor: 'pointer' }}
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