import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import UserTableHead from "./DataTables/UserTableHead";
import UserTableToolbar from "./DataTables/UserTableToolbar";
import tableData from "../../data";

import axios from 'axios';

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
const desc = (a, b, orderBy) => {

  if (b[orderBy] < a[orderBy]) {

    return -1;
  }
  if (b[orderBy] > a[orderBy]) {

    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    // console.log("sortby:")
    // console.log(a[0]+ " "+ b[0])
    const order = cmp(a[0], b[0]);
    // console.log(cmp(a[0],b[0]))
    
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  // console.log(stabilizedThis.map(el => el[0]))
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class ListUser extends React.Component {
  state = {
    order: "asc",
    orderBy: "name",
    selected: [],
    page: 0,
    rowsPerPage: 15,
    userList_origin: [],
    userList: [],
    query:"",
    keyfilter: "name"
  };
 
 
  bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // str = str.replace(/\W+/g, ' ');
    // str = str.replace(/\s/g, '-');
    return str;
  }
  componentDidMount() {
    axios({
        method: 'GET',
        url: 'https://mighty-retreat-21374.herokuapp.com/api/admin/allUser?token=' + localStorage.getItem("token"),
       
        data: null
    }).then((response) => {
        // handle success
        console.log("abc", response.data.users);
        this.setState({
            userList_origin: response.data.users,
            // userList: response.data.trips
        })
        this.setState({
          userList: this.state.userList_origin
      })
    }).catch((error) => {
        // handle error
        console.log(error);
    });
    }
    
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.userList.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  
  
  onHandleDelete= (event) => {
    console.log("delete")
    event.preventDefault();
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    
    const { classes } = this.props;
    const {userList, userList_origin, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, userList.length - page * rowsPerPage);
    
    return (
     
      <Paper className={classes.root}>
        <div >
        <TextField
          hintText="Name"
          label="Name"
          floatingLabelText="Query"
          value={this.state.query}
          onChange={e => this.setState({ query: e.target.value,
          userList: e.target.value? userList_origin.filter(x =>
            this.bodauTiengViet(x[this.state.keyfilter]).includes(this.bodauTiengViet(e.target.value))): userList_origin})}
          floatingLabelFixed
          margin="normal"
          
        />
        <FormControl className={classes.formControl}>
              <Select
                style={{ marginLeft: "1em",
                marginTop:"2em" }}
                // hintText="Select"
                value={this.state.keyfilter}
                onChange={e =>
                  this.setState({ keyfilter: e.target.value })
                }
              >
                {/* <MenuItem value="" disabled>
                Placeholder
                </MenuItem> */}
                <MenuItem value="name">Name</MenuItem> 
                <MenuItem value="address">Address</MenuItem>
                {/* <MenuItem value="role.name">Role</MenuItem> */}
              </Select>
              </FormControl>
          </div>
        <UserTableToolbar classes={this.classes} numSelected={selected.length} handleDelete={this.onHandleDelete} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <UserTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={userList.length}
              
            />
            <TableBody>
              {stableSort(this.state.query
                ? userList
                : this.state.userList_origin, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell>
                        <Link key={n.name} to={`/home/userdetail/${n.id}`}onClick={() => localStorage.setItem("admin_user", n.id)}>{n.name}</Link>
                      </TableCell>
                      <TableCell>{n.email}</TableCell>
                      <TableCell>{n.address}</TableCell>
                      <TableCell>{n.phone}</TableCell>
                      {/* <TableCell>{n.role.name}</TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

ListUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListUser);
