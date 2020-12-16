import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
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

class ListTripTableToolbar extends React.Component {
  createHandleDelete = (event) => {
     this.props.handleDelete(event);
  }
  render() {
  const { numSelected, classes } = this.props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
          <Typography variant="h6" id="tableTitle">
            List Trips
          </Typography>
        {/* )} */}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              {/* <span>{"Delete"}</span> */}
              <DeleteIcon onClick={this.createHandleDelete}/>
            </IconButton>
          </Tooltip>
        ) : (
          <div></div>
        )}
      </div>
    </Toolbar>
  );
  }
};

ListTripTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired
};

ListTripTableToolbar = withStyles(toolbarStyles)(ListTripTableToolbar);

export default ListTripTableToolbar;
