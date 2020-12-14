import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { grey } from "@material-ui/core/colors";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Help from "@material-ui/icons/Help";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import theme from "../theme";
import PropTypes from "prop-types";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import axios from 'axios';
import {Redirect} from 'react-router-dom';

class LoginPage extends React.Component {


  

  constructor() {
    super();
    this.state = {
        email: '',
        password: '',
        redirectToReferrer: false
    }
  }


  onChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
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
            localStorage.setItem("token", response.data.token);
            // localStorage.setItem("user_name", response.data.user.name);
            localStorage.setItem("islogged",true);
            localStorage.setItem("avatar_admin",response.data.user_info.avatar)
            this.setState({redirectToReferrer:true}); 
          
          }
          // else{
          //   this.setState({redirectToReferrer:false}); 
          // }
          // handle success
          
      }).catch((error) => {
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

            <div style={styles.buttonsDiv}>
              <Link to="/home" style={{ ...styles.btn, ...styles.btnFacebook }}>
                <i className="fa fa-facebook fa-lg" />
                <span style={styles.btnSpan}>Log in with Facebook</span>
              </Link>
              <Link to="/home" style={{ ...styles.btn, ...styles.btnGoogle }}>
                <i className="fa fa-google-plus fa-lg" />
                <span style={styles.btnSpan}>Log in with Google</span>
              </Link>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
};
// LoginPage.propTypes = {
//   children: PropTypes.elemenst,
//   classes: PropTypes.object
// };

export default LoginPage;
