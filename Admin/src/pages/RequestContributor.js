import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';
import DeleteIcon from "@material-ui/icons/Delete";

import { green } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import CheckIcon from '@material-ui/icons/Check';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const { row, onDeleteRequest, onUpdateRequest} = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  // onDeleteRequest
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">
        <Link key={row.name} to={`/home/userdetail/${row.user_id}`}onClick={() => localStorage.setItem("admin_user", row.user_id)}>{row.name}</Link>
        </TableCell>
        <TableCell align="right">{row.created_at}</TableCell>
        <TableCell align="right">{row.languages}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
            <table size="small">
                <tbody>
                  
                  <tr>
                    <td style={{width: "90%"}}>
                      <Typography variant="h6" gutterBottom component="div">
                        Details
                      </Typography>  
                    </td>
                    <td>
                    <IconButton onClick={event => onUpdateRequest(event, row.id)} edge='end' aria-label="Delete">
                    <CheckIcon style={{ color: green[500] }}></CheckIcon>
                    </IconButton>
                    </td>
                    <td style={{paddingRight: 20,align: "right", width: 100}}>
                      <IconButton onClick={event => onDeleteRequest(event, row.id)} edge='end' aria-label="Delete">
                      <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <Table size="small" aria-label="purchases">
                <TableBody>
                  
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>{row.user_id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{row.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>User Email</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Experiences</TableCell>
                    <TableCell>{row.experiences}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Updated at</TableCell>
                    <TableCell>{row.updated_at}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Intro</TableCell>
                    <TableCell>{row.intro}</TableCell>
                  </TableRow>
                    
                </TableBody>
              </Table>
              <Typography variant="h6" gutterBottom component="div">
                Intro
              </Typography>
              
              <p>{row.intro}</p>
              
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    // userName: PropTypes.string.isRequired,
    // createAt: PropTypes.string.isRequired,
    // Language: PropTypes.string.isRequired,
    // id: PropTypes.number.isRequired,
  }).isRequired,
};



class RequestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        listRequest: []
    }
  } 

  componentDidMount() {
    axios({
        method: 'GET',
        url: 'https://mighty-retreat-21374.herokuapp.com/api/admin/getRequestUser?token=' +localStorage.getItem("token"),
       
        data: null
    }).then((response) => {
        // handle success
        console.log("abc", response.data.request);
        this.setState({
            listRequest: response.data.request
        })
    }).catch((error) => {
        // handle error
        console.log(error);
    });
    }
    deleteRequest = (event,id) =>{
      id = String(id)
      console.log("id")
      console.log(id)
      event.preventDefault();
      axios({
          method: 'POST',
          url: 'https://mighty-retreat-21374.herokuapp.com/api/admin/updateUser?token=' +  localStorage.getItem("token"),
          data: {
              action: "delete",
              request_id: id
          }
      }).then((response) => {
          // handle success
          console.log(response.data);
          window.location.reload();
      }).catch((error) => {
          // handle error
          console.log(error);
      });
    }


    updateRequest = (event,id) =>{
      id = String(id)
      console.log("id")
      console.log(id)
      event.preventDefault();
      axios({
          method: 'POST',
          url: 'https://mighty-retreat-21374.herokuapp.com/api/admin/updateUser?token=' +  localStorage.getItem("token"),
          data: {
              action: "update",
              request_id: id
          }
      }).then((response) => {
          // handle success
          console.log(response.data);
          window.location.reload();
      }).catch((error) => {
          // handle error
          console.log(error);
      });
    }
  
  render() {
  return (
    <Paper>
    <Toolbar>
    <div>
        <Typography variant="h6" id="tableTitle">
          List of request for Contributor
        </Typography>
    </div>
    </Toolbar>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="right">User Name</TableCell>
            <TableCell align="right">Create At</TableCell>
            <TableCell align="right">Language</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.listRequest.map((row) => (
            <Row key={row.id} row={row} onDeleteRequest={this.deleteRequest} onUpdateRequest={this.updateRequest}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
  }
}
export default RequestTable;