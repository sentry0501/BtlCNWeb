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

import ListTripTableHead from "./DataTables/ListTripTableHead";
import ListTripTableToolbar from "./DataTables/ListTripTableToolbar";


import axios from 'axios';

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

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
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class ListTrip extends React.Component {
  state = {
    order: "asc",
    orderBy: "id",
    selected: [],
    page: 0,
    rowsPerPage: 15,
    tripList_origin: [],
    tripList: [],
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
        url: 'https://mighty-retreat-21374.herokuapp.com/api/trip',
       
        data: null
    }).then((response) => {
        // handle success
        console.log("abc", response.data);
        this.setState({
            tripList_origin: response.data.trips,
            // tripList: response.data.trips
        })
        for(var i=0; i < this.state.tripList_origin.length; i++)
        this.state.tripList_origin[i].price=parseInt(this.state.tripList_origin[i].price);
        this.setState({
          tripList: this.state.tripList_origin
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
      this.setState(state => ({ selected: state.tripList.map(n => n.id) }));
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
    var n = this.state.selected.length;
    for(var i=0; i < n; i++){
      axios({
        method: 'DELETE',
        url: 'https://mighty-retreat-21374.herokuapp.com/api/trip/delete?token=' + localStorage.getItem("token"),
        data: {
            trip_id: this.state.selected[i]
        }

      }).then((response) => {
        n--;
        if (n===0){
          window.location.reload();
        }
        // handle success
        console.log(response.data);
      }).catch((error) => {
        // handle error
        console.log(error);
      });
     
    };
    
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    
    const { classes } = this.props;
    const {tripList, tripList_origin, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, tripList.length - page * rowsPerPage);
    console.log("haha")
     console.log(this.state.selected)
    
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
                tripList: e.target.value? tripList_origin.filter(x =>
                  this.bodauTiengViet(x[this.state.keyfilter]).includes(this.bodauTiengViet(e.target.value))): tripList_origin})}
                margin="normal"
                
              />
              <FormControl className={classes.formControl}>
                <Select
                  style={{ marginLeft: "1em",
                  marginTop:"2em" }}
                  value={this.state.keyfilter}
                  onChange={e =>
                    this.setState({ keyfilter: e.target.value })
                  }
                >
                  <MenuItem value="name">Name</MenuItem> 
                  <MenuItem value="userName">User Name</MenuItem>
                  <MenuItem value="location">Location</MenuItem>
                </Select>
                
              </FormControl>
              </td>
            </tr>
          </tbody>
        </table>
        
          </div>
        <ListTripTableToolbar classes={this.classes} numSelected={selected.length} handleDelete={this.onHandleDelete} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <ListTripTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={tripList.length}
              
            />
            <TableBody>
              {stableSort(this.state.query
                ? tripList
                : this.state.tripList_origin, getSorting(order, orderBy))
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
                      <TableCell>{n.id}</TableCell>
                      
                      <TableCell>
                        <Link key={n.name} to={`/admin/home/tripdetail/${n.id}`}onClick={() => localStorage.setItem("admin_trip", n.id)}>{n.name}</Link>

                      </TableCell>
                      <TableCell>{n.location}</TableCell>
                      <TableCell>{n.price}</TableCell>
                      <TableCell>{n.userName}</TableCell>
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
          count={tripList.length}
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

ListTrip.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListTrip);
