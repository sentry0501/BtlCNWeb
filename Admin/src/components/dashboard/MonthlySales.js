import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
// import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";
import GlobalStyles from "../../styles.scss";
import { BarChart, Bar, XAxis,ResponsiveContainer,Tooltip, Legend } from 'recharts';

import { withStyles } from "@material-ui/core/styles";


class MonthlySales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  };
}
  
  render(){
    const { data ,theme } = this.props;
    const styles = {
      paper: {
        backgroundColor: theme.palette.secondary[600],
        height: 220
      },
      div: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "95%",
        height: "80%"
      },
      header: {
        color: "white",
        backgroundColor: theme.palette.secondary[600],
        padding: 10,
        fontSize: 24
      }
    };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...GlobalStyles.title, ...styles.header }}>
        Trips City Chart
        
      </div>
      <div style={styles.div}>

      


        <ResponsiveContainer>
          <BarChart scaleToFit={true} data={data}
          >
            <Bar dataKey="trips" fill={theme.palette.primary[200]}/>
            <Tooltip />
            <Legend />
            <XAxis
              dataKey="name"
              stroke="none"
              tick={{ fill: theme.palette.common.white }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
    </Paper>
  );
  }
};

MonthlySales.propTypes = {
  data: PropTypes.array,
  theme: PropTypes.object
};

export default withStyles(null, { withTheme: true })(MonthlySales);
