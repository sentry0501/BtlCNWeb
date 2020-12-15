import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { grey } from "@material-ui/core/colors";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Help from "@material-ui/icons/Help";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import theme from "../theme";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class LoginPage extends React.Component {


  

  constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        redirectToReferrer: false,
        open: false
    }
  }


  onChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }


  onHandleLogin = () => {
      axios({
          method: 'POST',
          url: 'https://mighty-retreat-21374.herokuapp.com/api/login',
          data: {
              email: this.state.email,
              password: this.state.password
          }
      }).then((response) => {
          if (response.data.role == "admin")
          {
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            // localStorage.setItem("user_name", response.data.user.name);
            localStorage.setItem("islogged",true);
            localStorage.setItem("admin_avatar",response.data.user_info[0].avatar)
            // localStorage.setItem("admin_name",response.data.user.name)
            this.setState({redirectToReferrer:true}); 
          
          }
          // else{
          //   this.setState({redirectToReferrer:false}); 
          // }
          // handle success
          
      }).catch((error) => {
        this.setState({
          open: true
        })
          // handle error
          console.log(error);
      });
      
  }
  render(){
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: "auto",
        position: "absolute",
        top: "20%",
        left: 0,
        right: 0,
        margin: "auto"
      },
      paper: {
        padding: 20,
        overflow: "auto"
      },
      buttonsDiv: {
        textAlign: "center",
        padding: 10
      },
      flatButton: {
        color: grey[500],
        margin: 5
      },
      checkRemember: {
        style: {
          float: "left",
          maxWidth: 180,
          paddingTop: 5
        },
        labelStyle: {
          color: grey[500]
        },
        iconStyle: {
          color: grey[500],
          borderColor: grey[500],
          fill: grey[500]
        }
      },
      loginBtn: {
        float: "right"
      },
      btn: {
        background: "#4f81e9",
        color: "white",
        padding: 7,
        borderRadius: 2,
        margin: 2,
        fontSize: 13
      },
      btnFacebook: {
        background: "#4f81e9"
      },
      btnGoogle: {
        background: "#e14441"
      },
      btnSpan: {
        marginLeft: 5
      }
    };
  
    if (this.state.redirectToReferrer) {
      
      return (<Redirect to={{
        pathname : '/home',
        state: {redirectToReferrer: true,
        }
      }}/>)
    }
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <form>
                <InputLabel htmlFor="component-simple">Email</InputLabel>
                <Input type="email" placeholder="E-mail" fullWidth={true} onChange={this.onChange} name='email' value={this.state.email} />
                <div style={{ marginTop: 16 }}>
                <InputLabel htmlFor="component-simple">Password</InputLabel>
                <Input type="password" placeholder="Password..." fullWidth={true} onChange={this.onChange} name='password' value={this.state.password} />
                </div>

                <div style={{ marginTop: 10 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        label="Remember me"
                        style={styles.checkRemember.style}
                        labelStyle={styles.checkRemember.labelStyle}
                        iconStyle={styles.checkRemember.iconStyle}
                      />
                    }
                    label="Remember me"
                  />
                  {/* <Link to="/home"> */}
                    <Button variant="contained" color="primary" style={styles.loginBtn} onClick={this.onHandleLogin}>
                      Login
                    </Button>
                  {/* </Link> */}
                </div>
              </form>
            </Paper>

            <div style={styles.buttonsDiv}>
              <Button href="/home" style={styles.flatButton}>
                <PersonAdd />
                <span style={{ margin: 5 }}>Register</span>
              </Button>

              <Button href="/home" style={styles.flatButton}>
                <Help />
                <span style={{ margin: 5 }}>Forgot Password?</span>
              </Button>
            </div>
          </div>
        </div>
        <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">
          {"Login Failed!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Mat khau khong chinh xac!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
};
// LoginPage.propTypes = {
//   children: PropTypes.elemenst,
//   classes: PropTypes.object
// };

export default LoginPage;
