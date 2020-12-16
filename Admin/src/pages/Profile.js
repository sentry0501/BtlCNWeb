import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles,
  Container
} from '@material-ui/core';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            passchanged: '',
            confirm: '',
            not_match: true,
            open: false,
            success: false,
            success_message: ""
        }
    }
    // classes = useStyles();
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleUpdatePass = () =>{  
        if(this.state.passchanged===this.state.confirm){
            axios({
                method: 'POST',
                url: 'https://mighty-retreat-21374.herokuapp.com/api/reset-password?token='+localStorage.getItem("token"),
                data: {
                    new_password: this.state.passchanged,
                    old_password: this.state.password
                }
            }).then((response) => {
                this.setState({
                    success_message: response.data.message,
                    success: true
                });
                console.log(response.data.message)
                console.log(this.state.success_message)
                
                
            }).catch((error) => {
                this.setState({
                    success_message: error.response.data.message,
                    success: true
                });
                // handle error
                console.log(error);
            });
        }
        else{
            this.setState({
                open: true
            })
        }

    }
    handleClose = () =>{
        this.setState({
            open: false
        })
    }
    handleSuccessClose = () => {
        this.setState({
            success:false
        });
        window.location.reload();
    }
    render(){

        return (

      <Container maxWidth="lg">
        <Box mt={3}>
        <form
            >
            <Card>
                <CardHeader
                title="Change Password"
                />
                <Divider />
                <CardContent>
                <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    name="password"
                    onChange={this.onChange}
                    type="password"
                    value={this.state.password}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="New password"
                    margin="normal"
                    name="passchanged"
                    onChange={this.onChange}
                    type="password"
                    value={this.state.passchanged}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Confirm password"
                    margin="normal"
                    name="confirm"
                    onChange={this.onChange}
                    type="password"
                    value={this.state.confirm}
                    variant="outlined"
                />
                </CardContent>
                <Divider />
                <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
                >
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleUpdatePass}
                >
                    Update
                </Button>
                </Box>
            </Card>
            </form>
        </Box>
        <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">
          {"Submit Failed!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Confirm password doesn't match
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.success}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleSuccessClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">
          {"Request has sent!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {this.state.success_message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSuccessClose} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>
      </Container>
        
        
            
        );
    }
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
