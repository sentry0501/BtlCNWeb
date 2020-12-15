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


import UserTableHead from "./DataTables/UserTableHead";
import UserTableToolbar from "./DataTables/UserTableToolbar";


import axios from 'axios';

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import {Avatar,Box} from "@material-ui/core";
import * as StringConstant from './String';
  
const desc = (a, b, orderBy) => {
  if(orderBy==="role"){
    if (b[orderBy]["name"] < a[orderBy]["name"]) {

      return -1;
    }
    if (b[orderBy]["name"] > a[orderBy]["name"]) {
  
      return 1;
    }
    return 0;
  }
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
    const order = cmp(a[0], b[0]);
    
    if (order !== 0) return order;
    return a[1] - b[1];
  });
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
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class ListUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "name",
      page: 0,
      rowsPerPage: 15,
      userList_origin: [],
      userList: [],
      query:"",
      keyfilter: "name"
    }
  } 

 
 
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
    
    console.log(property)
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };


  render() {
    
    const { classes } = this.props;
    const {userList, userList_origin, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, userList.length - page * rowsPerPage);
    
    return (
     
      <Paper className={classes.root}>
        <div >
        <table size="small">
          <tbody>
            <tr>
              <td style={{paddingTop:35, paddingLeft:"5%", width: "30%"}}>
                <Typography variant="subtitle2" component="div">
                  Search For...
                </Typography>  
              </td>
              <td>
              <TextField
                label="Name"
                value={this.state.query}
                onChange={e => this.setState({ query: e.target.value,
                userList: e.target.value? userList_origin.filter(x =>
                  this.bodauTiengViet(x[this.state.keyfilter]!==null?x[this.state.keyfilter]:"").includes(this.bodauTiengViet(e.target.value))): userList_origin})}
                margin="normal"/>
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
                  <MenuItem value="name">Name</MenuItem> 
                  <MenuItem value="address">Address</MenuItem>
                </Select>
              </FormControl>
          </td>
            </tr>
          </tbody>
        </table>
          </div>
        <UserTableToolbar classes={this.classes} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <UserTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={userList.length}
              
            />
            <TableBody>
              {stableSort(this.state.query
                ? userList
                : this.state.userList_origin, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell>
                      <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={StringConstant.IMAGE_PATH + n.avatar}
                      >
                      </Avatar>
                      <Typography
                      style={{paddingLeft:20}}
                        color="textPrimary"
                        variant="body1"
                      >
                        <Link key={n.name} to={`/admin/home/userdetail/${n.user_id}`}onClick={() => localStorage.setItem("admin_user", String(n.user_id))}>{n.name}</Link>
                      </Typography>
                    </Box>
                        
                      </TableCell>
                      <TableCell>{n.email}</TableCell>
                      <TableCell>{n.address}</TableCell>
                      <TableCell>{n.phone}</TableCell>
                      <TableCell>{n.role.name}</TableCell>
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
