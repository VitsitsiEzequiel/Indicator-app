import React, { Component, Fragment} from 'react'
import './Home.css'
import { MDBBtn, MDBIcon } from "mdbreact";
import { FaPlus } from "react-icons/fa";
import { BiAnalyse } from "react-icons/bi";
import {Button, TreeSelect} from 'antd';
import 'antd/dist/antd.css';


class Home extends Component {


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
             <div>
               <header className="App-header">
                 <logo className="mylogo"> <img src="/images/LOGO.png" alt="Logo"/>
                    <title>DHIS 2 Indicator App</title>
                   </logo> 

                  <btn--container>
                  {/** 
                  <input type="text" icon="search" placeholder="Search for existing reports" aria-label="Search"  />
                  <MDBIcon icon="search" style={{padding:"10px"}} />
                   */}

                   
                       <Button type="primary" href="/timePeriods"  style={{float:"right",justifyContent:"center",marginLeft: 8 }} onClick={this.handleBtn}> <BiAnalyse /> Analyze</Button>
                       <Button type="primary" href="/newReport"  style={{justifyContent:"center", float:"right"}} onClick={this.handleBtnClick}> <FaPlus /> Create</Button>
                  </btn--container>
               </header> 
            </div>
            <hr style={{border:"0px",  borderTop: "0px solid #005399" , borderBottom: "2px solid #005399"}}/>
              
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
                               . Edit title to change title to use on heading<br/>
                               . Edit the indicator display names to custom names<br/>
                               . 
                        6. Click create to preview changes, then save otherwise modify<br/> 
                       <Fragment >
                        <Button type="primary" href="/newReport" style={{marginTop:"2rem", fontWeight:"bold", }} onClick={this.btnClickHandler}><FaPlus />New Report</Button>
                       </Fragment>
                    </p>
               </div>  
           </div>
        )
    }
}

export default Home
