import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import "./App.css";
import Home from './Components/HomePage/Home';
import NewReport from "./Components/CustomReports/NewReport";
import SavedReports from "./Components/CustomReports/SavedReports";
import SimilarTimePeriods from "./Components/TimePeriod/SimilarTimePeriods"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      indicatorList: [],
      isLoaded: false,
      error: "",
      orgUnits: [],
      periodTypes: [],
      Reports: [],
    };
  }

//   componentDidMount(){
//     //Hearder declaration for logging in to play.dhis2.org
//     const basicAuth = 'Basic ' + btoa('admin:district');
    
 
//     //a get request for indicators
//     fetch(`https://play.dhis2.org/2.34.1/api/33/indicators.json?paging=false`, {
//         method: 'GET',
//         headers: {
//             'Authorization' : basicAuth,
//             'Content-type': 'application/json',
//         },
//         credentials: "include"

//     })
//         .then(response => response.json())
//         .then((result) => {
//             //Displaying the result on the console to check if everything is working as expected
//             console.log(result)
//             this.setState({
//                 isLoaded: true,
//                 indicatorList: result.indicators,//Assigning the returned json into an indicatorList Array
//                 error: ""
//             });
//         })
//         .catch(error => {
//             console.log('Error:', error);
//             this.setState({
//                 isLoaded: true,
//                 indicatorList: [],
//                 error: "Couldn't load data! Make sure you are connected to the internet!"
//             });
//         }, []);

       

 
    // let arrayToTree = require('array-to-tree');
    // // A Fetch request for OrgUnits
    // fetch(`https://play.dhis2.org/2.34.1/api/33/organisationUnits.json?paging=false`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization' : basicAuth,
    //         'Content-type': 'application/json',
    //     },
    //     credentials: "include"

    // })
    //     .then(response => response.json())
    //     .then((result) => {
    //         console.log(result);

    //         result.organisationUnits.map((item, index) => {
    //             //
    //             item.title = item.name;
    //             item.value = item.name.replace(/ /g, "") + "-" + index;
    //             if(item.parent != null){
    //                 //console.log(item.parent.id)
    //                 item.parent = item.parent.id
    //             } else {
    //                 item.parent = undefined
    //             }
    //         });

    //         var tree = arrayToTree(result.organisationUnits, {
    //             parentProperty: 'parent',
    //             customID: 'id'
    //         });

    //         console.log( tree );

    //         this.setState({
    //             orgUnits : tree
    //         });

    //     }).catch(error => {
    //    // alert("Couldn't load data! Make sure you are connected to the internet!");

    // });
  
    
//     // A fecTh request for PeriodTypes
//     fetch(`https://play.dhis2.org/2.34.1/api/33/periodTypes.json?paging=false&fields=*`, {
//       method: 'GET',
//       headers: {
//           'Authorization' : basicAuth,
//           'Content-type': 'application/json',
//       },
//       credentials: "include"

//   })
//       .then(response => response.json())
//       .then((result) => {
//           console.log(result.periodTypes);
//           this.setState({
//               periodTypes : result.periodTypes
//           })
//       }).catch(error => {
//       //alert( error + ". Make sure you are connected to the internet");

//   });

 // }//end componentDidMount

  

  mainCallBack = (dataFromChild) => {
    console.log(dataFromChild);
    this.setState({
        homeValue : dataFromChild,
    });
}

 homeCallback = () => {
    console.log("anything");
}
  
  render() {
    return (
        <div className="My-App">
        <Router>
         <div className="App">
           <Route path="/" render={(props) => (
                    <Home {...props} 
                                 error={this.state.error}
                                 isLoaded={this.state.isLoaded} />
                )} exact/>

          <Route path="/newReport" render={(props) => (
                    <NewReport {...props} 
                                 error={this.state.error}
                                 isLoaded={this.state.isLoaded} />
                )} exact/>
          
        
          <Route path="/savedReport" render={(props) => (
                    <SavedReports {...props} 
                                 error={this.state.error}
                                 isLoaded={this.state.isLoaded} />
                )} exact/> 

           <Route path="/savedReport" render={(props) => (
                    <SavedReports {...props} 
                                 error={this.state.error}
                                 isLoaded={this.state.isLoaded} />
                )} exact/>
            
            <Route path="/timePeriods" render={(props) => (
                    <SimilarTimePeriods {...props} 
                                 error={this.state.error}
                                 isLoaded={this.state.isLoaded} />
                )} exact/>
        </div>
      </Router>

      </div>
    );
  }
}

export default App
