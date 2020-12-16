import React from 'react';
import * as StringConstant from './String';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';

const useStyles = theme => ({
    table: {
      minWidth: 650,
    },
  });
class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            role: ''
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'https://mighty-retreat-21374.herokuapp.com/api/admin/user?token=' + localStorage.getItem("token") + '&user_id=' + localStorage.getItem("admin_user"),
            // data: {
            //     user_id: localStorage.getItem("admin_user")
            // }
            data: null
        }).then((response) => {
            // handle success
            console.log(response.data);
            // this.state.name = response.name;
            // this.state.email = response.email;
            this.setState({
                user: response.data.user,
                role: response.data.role.name
            }
            )
        }).catch((error) => {
            // handle error
            console.log(error);
        });
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const classes = useStyles();
        if (this.state === null) return null;

        return (
            <div>
                <div className="banner" style={{ backgroundImage: "url(" + StringConstant.IMAGE_PATH + this.state.user.cover + ")" }}></div>
                <img className="avatar" alt="avatar" src={StringConstant.IMAGE_PATH + this.state.user.avatar} />
                <div >
                    <div variant="row mt-5">
                        <div variant="col-6">
                            <br></br>
                            <Typography variant="h6" id="tableTitle">
                              User Informations
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Name</TableCell>
                                            <TableCell>{this.state.user.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Email</TableCell>
                                            <TableCell>{this.state.user.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Phone</TableCell>
                                            <TableCell>{this.state.user.phone} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Address</TableCell>
                                            <TableCell>{this.state.user.address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Pay Email</TableCell>
                                            <TableCell>{this.state.user.pay_email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Role</TableCell>
                                            <TableCell>{this.state.role}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        
                        </div>
    
                    </div>
                    <br></br>
                    <Typography variant="h6" id="tableTitle">
                        Description
                    </Typography>
                    <p>{this.state.user.describe}</p>
                </div>
            </div>
        )
    }

}

export default UserDetail;