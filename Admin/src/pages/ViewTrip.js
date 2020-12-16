import React from 'react';
import * as StringConstant from './String';
import axios from 'axios';
import ListComment from './Comment/ListComment';
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
class ViewTrip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: '',
            date: '',
            participants: 0
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: 'https://mighty-retreat-21374.herokuapp.com/api/trip/byId?trip_id=' + localStorage.getItem("admin_trip"),
            data: null
        }).then((response) => {
            // handle success
            console.log(response.data);
            // this.state.name = response.name;
            // this.state.email = response.email;
            this.setState(
                response.data
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
                <div className="banner" style={{ backgroundImage: "url(" + StringConstant.IMAGE_PATH + this.state.trip.cover + ")" }}></div>
                <div >
                    <div variant="row mt-5">
                        <div variant="col-6">
                            <br></br>
                            <Typography variant="h6" id="tableTitle">
                              Tour Information
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                    <TableRow>
                                            <TableCell component="th" scope="row">Name</TableCell>
                                            <TableCell>{this.state.trip.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Location</TableCell>
                                            <TableCell>{this.state.trip.location}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Duration</TableCell>
                                            <TableCell>{this.state.trip.duration} Hours</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Transportation</TableCell>
                                            <TableCell>{this.state.trip.transportation}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Departure</TableCell>
                                            <TableCell>{this.state.trip.departure} Hours</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Price per Participant</TableCell>
                                            <TableCell>{this.state.trip.price} VND</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Language</TableCell>
                                            <TableCell>{this.state.trip.languages}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">Group size</TableCell>
                                            <TableCell>{this.state.trip.group_size}</TableCell>
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
                    <p>{this.state.trip.description}</p>
                    <Typography variant="h6" id="tableTitle">
                        Comment
                    </Typography>
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                        <ListComment trip_id={localStorage.getItem("admin_trip")} />
                        </TableBody>
                    
                    </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }

}

export default ViewTrip;