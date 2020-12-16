import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import AccountCircle from "@material-ui/icons/AccountCircle"
import MailIcon from "@material-ui/icons/Mail"
import NotificationsIcon from "@material-ui/icons/Notifications"
import MoreIcon from "@material-ui/icons/MoreVert"
import Badge from "@material-ui/core/Badge"
import { Toolbar } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // marginLeft: theme.drawer.width,
    width: `calc(100% - ${theme.drawer.width}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
})

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
    }
    this.onHandleLogout=this.onHandleLogout.bind(this)
  }

  createChangePass = (event) =>{
    return (<Redirect to={{
      pathname : '/admin/home/changepass',
      state: {redirectToReferrer: true,
      }
    }}/>)
  }
  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null })
  }
  onHandleLogout = () => {
    this.props.logOut();
  }
  render() {
    const { handleChangeNavDrawer, classes, navDrawerOpen } = this.props

    const { anchorEl } = this.state
    const isMenuOpen = Boolean(anchorEl)
    return (
      <div>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: navDrawerOpen,
          })}
        >
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={handleChangeNavDrawer}
            >
              <MenuIcon />
            </IconButton>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge
                  className={classes.margin}
                  badgeContent={4}
                  color="secondary"
                >
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge
                  className={classes.margin}
                  badgeContent={17}
                  color="secondary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : null}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
        <Link to={`/admin/home/changepass`}>Profile</Link>
        </MenuItem>
        <MenuItem onClick={this.onHandleLogout}>Logout</MenuItem>
      </Menu>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeNavDrawer: PropTypes.func,
  classes: PropTypes.object,
  navDrawerOpen: PropTypes.bool,
}

export default withStyles(styles)(Header)
