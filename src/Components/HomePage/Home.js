import React, { Component, Fragment} from 'react'
import './Home.css'
import { MDBBtn,MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { FaPlus } from "react-icons/fa";
import paper from '@material-ui/core';


export class Home extends Component {


 // Handling button click event
  btnClickHandler = () =>{ 
    window.location.href="/newReport"
  }

  handleBtnClick = () =>{
    window.location.href="/newReport"
  }

    render() {
        return (
            <div>
             {/* Header section */}
             <paper>
               <header className="App-header">
                 <logo className="mylogo"> <img src="/images/LOGO.png" alt="Logo"/>
                    <title>DHIS 2 Indicator App</title>
                   </logo> 
                     <MDBBtn  color="primary" href="/newReport"  style={{positin:"relative", float:"right"}} onClick={this.handleBtnClick}> <FaPlus /> Create</MDBBtn>
                  <hr/>
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
