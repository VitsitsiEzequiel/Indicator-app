import React, { Component, Fragment} from 'react'
import './Home.css'
import { MDBBtn, MDBIcon } from "mdbreact";
import { FaPlus } from "react-icons/fa";
import { BiAnalyse } from "react-icons/bi";


export class Home extends Component {


 // Handling button click event
  btnClickHandler = () =>{ 
    window.location.href="/newReport"
  }

  handleBtnClick = () =>{
    window.location.href="/newReport"
  }

  handleBtn = () =>{
    window.location.href="timePeriods"
  }

    render() {
        return (
            <div className="my-Home">
             {/* Header section */}
             <paper>
               <header className="App-header">
                 <logo className="mylogo"> <img src="/images/LOGO.png" alt="Logo"/>
                    <title>DHIS 2 Indicator App</title>
                   </logo> 

                  <btn--container>
                  <input type="text" icon="search" placeholder="Search for existing reports" aria-label="Search"  />
                    <MDBIcon icon="search" style={{padding:"10px"}} />
                       <MDBBtn  color="primary" href="/timePeriods"  style={{float:"right",justifyContent:"center" }} onClick={this.handleBtn}> <BiAnalyse /> Analyze</MDBBtn>
                       <MDBBtn  color="primary" href="/newReport"  style={{justifyContent:"center", float:"right"}} onClick={this.handleBtnClick}> <FaPlus /> Create</MDBBtn>
                  </btn--container>
               </header> 

               </paper>
               <div className="myBody">
                 <h1>Welcome to Indicator App!</h1>
                   <h5> Creation of custom reports and taking snapshots of data in similar time period made less stressful!</h5>
                     <hr style = {{color: "orange"}}/>
                       <p>
                        1. Click create new, Write your custom report title, description<br/> 
                        2. Enter number of rows and columns form the report<br/> 
                        3. Select period from a drop down<br/>
                        4. Select OrgUnit from a drop down list<br/>
                        5. Select indicator group and click indicators to add to the group<br/> 
                            <p className="sub-points">
                              . Edit title to change title to use on heading<br/>
                              . Edit the indicator display names to custom names<br/>
                              . 
                            </p>
                        6. Click create to preview changes, then save otherwise modify<br/> 
                       <Fragment >
                        <MDBBtn color="primary" href="/newReport" style={{marginTop:"2rem", fontWeight:"bold", }} onClick={this.btnClickHandler}><FaPlus />New Report</MDBBtn>
                       </Fragment>
                       
                    </p>

               </div>
                
            </div>
        )
    }
}

export default Home
