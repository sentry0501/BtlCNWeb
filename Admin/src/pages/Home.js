import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Header from "../components/Header";
import LeftDrawer from "../components/LeftDrawer";
import RightDrawer from "../components/RightDrawer";
import Data from "../data";
import Dashboard from "./DashboardPage";
import ButtonBase from "@material-ui/core/ButtonBase";

import NotFound from "./NotFoundPage";
import { ThemeProvider } from "@material-ui/core/styles";
import defaultTheme, { customTheme } from "../theme";
import {Redirect} from 'react-router-dom';
import ListTrip from "./Table/ListTrip";
import ViewTrip from "./Table/ViewTrip.js";
import ListUser from "./Table/ListUser";
import '../App.css';
import CollapsibleTable from "./RequestContributor";

const styles = () => ({
  container: {
    margin: "80px 20px 20px 15px",
    paddingLeft: defaultTheme.drawer.width,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
    // width: `calc(100% - ${defaultTheme.drawer.width}px)`
  },
  containerFull: {
    paddingLeft: defaultTheme.drawer.miniWidth,
    [defaultTheme.breakpoints.down("sm")]: {
      paddingLeft: 0
    }
  },
  settingBtn: {
    top: 80,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    color: "white",
    width: 48,
    right: 0,
    height: 48,
    opacity: 0.9,
    padding: 0,
    zIndex: 999,
    position: "fixed",
    minWidth: 48,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  }


  
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    // nav bar default open in desktop screen, and default closed in mobile screen
    this.state = {
      redirectToReferrer: localStorage.getItem("islogged")==="true",
      theme: defaultTheme,
      rightDrawerOpen: false,
      navDrawerOpen:
        window && window.innerWidth && window.innerWidth >= defaultTheme.breakpoints.values.md
          ? true
          : false
    };

    this.handleChangeRightDrawer = this.handleChangeRightDrawer.bind(this);
    this.handleChangeNavDrawer = this.handleChangeNavDrawer.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleChangeNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  handleChangeRightDrawer() {
    this.setState({
      rightDrawerOpen: !this.state.rightDrawerOpen
    });
  }

  handleChangeTheme(colorOption) {
    const theme = customTheme({
      palette: colorOption
    });
    this.setState({
      theme
    });
  }

  logOut(){
    this.setState({redirectToReferrer: false});
    localStorage.setItem("islogged",false);
    
  }

  render() {
    const { classes } = this.props;
    const { redirectToReferrer, navDrawerOpen, rightDrawerOpen, theme } = this.state;
    
    if(localStorage.getItem("islogged")==="false"){
      
      return(
        (<Redirect to={{
          pathname : '/',
          // state: {redirectToReferrer: false,
          // }
        }}/>)
      )
    }
    // if(!this.state.redirectToReferrer){
    //   return (<Redirect to={{
    //     pathname : '/',
    //     state: {redirectToReferrer: false,
    //     }
    //   }}/>)
    // }
    return (
      <ThemeProvider theme={theme}>
        <Header handleChangeNavDrawer={this.handleChangeNavDrawer} navDrawerOpen={navDrawerOpen} handleProfileMenuOpen={false} logOut={this.logOut} />

        <LeftDrawer
          navDrawerOpen={navDrawerOpen}
          handleChangeNavDrawer={this.handleChangeNavDrawer}
          menus={Data.menus}
        />
        <ButtonBase
          color="inherit"
          classes={{ root: classes.settingBtn }}
          onClick={this.handleChangeRightDrawer}
        >
          <i className="fa fa-cog fa-3x" />
        </ButtonBase>
        <RightDrawer
          rightDrawerOpen={rightDrawerOpen}
          handleChangeRightDrawer={this.handleChangeRightDrawer}
          handleChangeTheme={this.handleChangeTheme}
        />
        <div className={classNames(classes.container, !navDrawerOpen && classes.containerFull)}>
          <Switch>
            <Route exact path="/home/" component={Dashboard} />
            <Route path="/home/dashboard" component={Dashboard} />
            <Route path="/home/form" component={CollapsibleTable} />
            <Route path="/home/ListUser" component={ListUser} />
            <Route path="/home/trips" component={ListTrip} />
            <Route path="/home/edit-trip"component={ViewTrip}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </ThemeProvider>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.object
};

export default withStyles(styles)(HomePage);