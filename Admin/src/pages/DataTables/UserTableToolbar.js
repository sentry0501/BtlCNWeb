import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { lighten } from "@material-ui/core/styles/colorManipulator";


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

class UserTableToolbar extends React.Component {

  render() {
  const { classes } = this.props;

  return (
    <Toolbar>
      <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            List Of Users
          </Typography>
      </div>
    </Toolbar>
  );
  }
};

UserTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,

};

UserTableToolbar = withStyles(toolbarStyles)(UserTableToolbar);

export default UserTableToolbar;
