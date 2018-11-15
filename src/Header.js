import * as React from "react";
import { observer, inject } from "mobx-react";
import injectSheet from "react-jss";

const styles = {
    headerRoot: {
        display: "flex"
    },
    headerContainer: {
        display: "flex",
        minHeight: "40px",
        alignItems: "center",
        borderRight: "solid 1px #e6e6e6",
        borderLeft: "solid 1px #e6e6e6",
        flex: 1
    },
    header: {
        width: "100%"
    },
    rowContainer: { 
        display: "flex",
        flex: 1,
        height: "auto",
        borderTop: "solid 1px #9d9d9d"
    },
    eventContainer: {
        width: "100%",
        position: "relative"
    },
    adornmentContainer: {
        borderLeft: "solid 1px #e6e6e6"
    }
}

@injectSheet(styles)
@observer
class Header extends React.Component {


    render() {

        const { classes, ui } = this.props;

        return (
             <div className={classes.headerRoot}>
                <div className={classes.resourceContainer} style={{width: ui.resourceRef ? ui.resourceRef.clientWidth : 0}}>
                    {ui.renderResourceHeader && 
                        <ui.renderResourceHeader {...ui.renderResourceHeader.props}/>
                    }
                </div>
                {ui.displayHeaders && 
                    <div className={classes.headerContainer}>
                        {ui.headers.map(header => (
                            <div className={classes.header} key={header}>
                                <span style={{ float: "left" }}> {header} </span>
                            </div>
                        ))}
                    </div> 
                }
                <div className={classes.adornmentContainer} style={{width: ui.adornmentRef ? ui.adornmentRef.clientWidth : 0}}>
                    {ui.renderAdornmentHeader && ui.renderAdornment && 
                        <ui.renderAdornmentHeader {...ui.renderAdornmentHeader.props}/>
                    }
                </div>
            </div>
        )
    }
}

export default Header;
