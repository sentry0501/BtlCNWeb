import React from "react";
import NewOrders from "../components/dashboard/NewOrders";
import MonthlySales from "../components/dashboard/MonthlySales";
import RecentlyProducts from "../components/dashboard/RecentlyProducts";
import globalStyles from "../styles";
import Grid from "@material-ui/core/Grid";
import Data from "../data";
import axios from 'axios';




class DashboardPage extends React.Component {
  


  constructor(props) {
    super(props);
    this.state = {
        listOrderid: [],
        listOrder: [],
        listCity: [],
        listOrderRecent:[],
        listCityTrip: [],
        show:false
    };
  }
  async haha(city) {
    
    // for (var i =0;i<city.length;i++)
    var cont = true;
    var i=0;
    var listTrip_City=[];
    do    
              {
                cont=false
                console.log("i ",i)
                  var city_ = city[i];
                  // this.haha(city_,listTrip_City);

                  await axios({
                    method: 'GET',
                    url: 'https://mighty-retreat-21374.herokuapp.com/api/trip/city/'+city_.city,
                  
                    data: null
                  }).then((response) => {
                      // handle success
                      console.log("abc", response.data);
                      console.log("city", city_.city);
                      var count = response.data.trips.length
                      console.log("count", count);
                      listTrip_City.push({name:city_.city,trips:count})
                      console.log("list", listTrip_City);
                      console.log("monthly",this.state.listCityTrip )
                      i++;
                      cont = true;
                      }).catch((error) => {
                      // handle error
                      console.log(error);
                      
                  });

                  
                }
                while(i<city.length&&cont===true)
                console.log("list", listTrip_City);
                this.setState({listCityTrip:listTrip_City,
                  show:true
                }) 

    
    // this.setState({listCityTrip:listTrip_City})
    
  }
  async componentWillMount() {
          await axios({
            method: 'GET',
            url: 'https://mighty-retreat-21374.herokuapp.com/api/order?token=' +localStorage.getItem("token"),
          
            data: null
          }).then((response) => {
              // handle success
              console.log("abc", response.data);
              // temsp = response.data.orders.sort(response.data.order.id)
              var getdata = response.data.orders.splice(response.data.orders.length - 6);
              this.setState({
                  listOrderRecent: getdata
              })
          }).catch((error) => {
              // handle error
              console.log(error);
          });
          await axios({
            method: 'GET',
            url: 'https://mighty-retreat-21374.herokuapp.com/api/trip/city',
          
            data: null
          }).then((response) => {
              // handle success
              this.setState({
                  listCity: response.data.city
              })
              var listTrip_City = [];
              this.haha(response.data.city)
                
          }).catch((error) => {
              // handle error
              console.log(error);
          });
    }

  render()
  {
    const {theme} = this.props
    const styles = {
      
      div: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "95%",
        height: 85
      },

    };
    const chartData = this.state.listCityTrip
  return (
    <div>
      <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <RecentlyProducts data={this.state.listOrderRecent} />
        </Grid>
        <Grid item xs={12} sm={8} container spacing={0}>
            <Grid item xs={12} sm={12}>
             <NewOrders data={Data.dashBoardPage.newOrders} />
              </Grid>
              <Grid item xs={12} sm={12} >
              <MonthlySales data={this.state.listCityTrip}/>
              </Grid>

        </Grid>
          
       
      </Grid>
      
     
      
    </div>
  );
  };
};

export default DashboardPage;
