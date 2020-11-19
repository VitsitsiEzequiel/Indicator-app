import React from 'react'
//import Paper from '@material-ui/core/Paper';
import {MDBBtn} from 'mdbreact';
//import {MDBBox,MDBRow,MDBCol,MDBInput,MDBBtn,MDBCard, MDBCardBody,MDBCardHeader,MDBTable,
//  MDBTableHead, MDBTableBody, MDBCardFooter, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, 
//  MDBDropdownItem,MDBCardTitle,MDBIcon,MDBContainer,MDBInputGroup,} from 'mdbreact';
import './SimilarTimePeriods.css'


function SimilarTimePeriods() {
  //Handle govback home btn click
  function handleBtnClick(){
    window.location.href="/";
    }

    return (
        <div className="Time-Period">
             <div style={{maxHeight: "100px",marginLeft: "5px",marginRight:"5px", paddingTop: "5px" }}>
                  <MDBBtn  color="primary" onClick={handleBtnClick}>Home</MDBBtn>
             </div>
           <hr />

          <div className="Container">
        
              
          </div>
        </div>
    )
}

export default SimilarTimePeriods
