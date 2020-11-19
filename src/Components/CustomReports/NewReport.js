import React,{useState,useEffect} from 'react'
import {
    MDBBox,MDBRow,MDBCol,MDBInput,MDBBtn,MDBCard, MDBCardBody,MDBCardHeader,MDBTable,
    MDBTableHead, MDBTableBody, MDBCardFooter, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, 
    MDBDropdownItem,MDBCardTitle,MDBIcon,MDBContainer,MDBInputGroup,} from 'mdbreact';
import  "./IndicatorTable";
//import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import {AgGridReact,AgGridColumn} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Grid from "@material-ui/core/Grid";
//import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './NewReport.css'
import {TreeSelect} from 'array-to-tree'
//import Loader from 'react-loader-spinner';//To be used later


//validation header
//const basicAuth = 'Basic ' + btoa('admin:district');// To be used later when api calls start working

function NewReport(props) {
  //Variable definition
  const [tableColumns, setTableColumns] = React.useState(0);
  const [tableRows, setTableRows] = React.useState(0);
  const [title, setTitle] =  React.useState("");
  const [reportTemplate, setReportTemplate] = React.useState({});
  const [description, setDescription] = React.useState("");
  const [showPreview, setShowPreview] = React.useState(false);
  const [selectedIndicators, setSelectedIndicators] = React.useState([])
  //const [colHeaders, setColHeaders] = React.useState([])
  //const [cellData, setCellData] = React.useState([])

  //instantiation of my variables
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  //event handler for Report Template Title
 const handleReportTitle = ({target : {value}}) => {
   setTitle(value);
 }
 
 //Event handler from Report Template Description
 const handleReportDescription = ({target : {value}}) => {
   setDescription(value)
 }
 
  //event handler for Report Template columns
  const handleTableColumns = ({ target: { value } }) => {
   setTableColumns(value);
   console.log(value);
 
 }
 
 //event handler for Report Template Rows
 const handleTableRows = ({target : {value}}) => {
   setTableRows(value);
 }
 
// //initializing an array-to-tree library that will turn an array of org units into a tree form
//  var arrayToTree = require('array-to-tree');

//  //An array of Org Units
 






 // andicators api call to dummy indicators, to be changed when dhis2 problems are fixed
const [rowData, setRowData] = useState([]);
    useEffect(()=>{
       loadIndicators();
    },[]);

const loadIndicators = async () => {
    const response = await fetch(`https://my.api.mockaroo.com/indicators.json?key=4ad64710`);
    const indicators = await response.json();
    //logging the array on the console to check if its working fine
    console.log(indicators);
    setRowData(indicators)
}
  
// Get selected rows buttun handler
const onButtonClick = (event) => {
      const selectedNodes = gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map( node => node.data )
      const selectedDataStringPresentation = selectedData.map( node => node.displayName).join(', ')
      alert(`Selected nodes: ${selectedDataStringPresentation}`)
      alert(selectedNodes.length + `have been selected!`)  
 } 

 //Handle govback home btn click
function handleBtnClick(){
    window.location.href="/";
 }

const showReportTemplate =()=>{
      setShowPreview(true);
  }    

//Saved Reports Call


//The actual report-template creation function
const ReportTemplatePreview = (event) => {
    
}


//The return method
    return (
        <div className="my-NewReport">
            <div style={{ maxHeight: "100px",
                  marginLeft: "5px",marginRight:"5px", paddingTop: "5px" }}>
                  <MDBBtn  color="primary" onClick={handleBtnClick}> Home </MDBBtn>
             </div>
           <hr />

            <MDBCard style={{marginLeft:"4rem", marginRight:"4rem", marginTop:"1rem", display:"flex"}}>
              <MDBBox standard>
                <MDBCol className="mb-3" md="30">
                 <p className="h4 text-center py-4">Create New Report</p>
                 <MDBRow style={{marginLeft:"3rem"}}>

                 {/**A section for the drop down to select OrgUnit */}
                    <MDBContainer style={{paddingTop:"1rem",marginRight:"8.2rem", display:"flex" }}>
                        <MDBInputGroup>
                        
                   
                        </MDBInputGroup>          
                      </MDBContainer>

                    {/** The form is starting from here */}
                     <MDBCol md="4" >
                       <MDBCard>
                         <MDBCardBody>
                         <form>
                         <div className="grey-text">

                         <MDBInput
                          label="Report Title"
                          group type="text"
                          value={title}
                          onChange={e => handleReportTitle(e)}
                          validate
                          error="wrong"
                          success="right"
                          />

                         <MDBInput
                          label="Description"
                          group
                          type="textarea"
                          rows="3"
                          value={description}
                          onChange={e => handleReportDescription(e)}
                          validate
                          error="wrong"
                          success="right"
                          />   

                          <MDBInput 
                          label="Enter number of rows"
                          group type="number"
                          value={tableRows}//corresponding to indicators
                          onChange={e => handleTableRows(e)}
                          validate
                          error="wrong"
                          success="right"
                          />
                        
                          <MDBInput 
                           label="Enter number of Columns"
                           group type="number"
                           value={tableColumns}//corresponding to actual report columns
                           onChange={e => handleTableColumns(e)}
                           validate
                           error="wrong"
                           success="right"
                           />
                           </div>
                          </form>
                         </MDBCardBody>
                       </MDBCard>
                     </MDBCol>

                     <MDBCol md="7" style={{display:"flex"}}>
                     <MDBCard>
                     <MDBCardBody>
                         <form>
                          <div className="grey-text">
                             {/**TransferList */}
                             <div className="mt-5">
                                <p className="text-center" style={{color:"black"}}>Select indicator groups to include in the report</p>
                               
                                {/**React Ag-Grid Data table implementation */}
                                <div className="ag-theme-alpine" style={ { height: "250px", width: "600px" } }>
                    
                                  <AgGridReact
                                         rowData={rowData}
                                          rowSelection="multiple">
                                       <AgGridColumn field="id" sortable={true} filter={true}  checkboxSelection={true}  pagination={true} ></AgGridColumn> 
                                       <AgGridColumn field="displayName" sortable={true} filter={true} ></AgGridColumn>
                                  </AgGridReact>
                            
                                </div>
                              </div>
                           </div>
                         </form>
                      </MDBCardBody>
                      </MDBCard>
                      </MDBCol>
                    <MDBCardFooter>
                    <MDBBtn  color="primary" type="submit" style={{justifyContent:"center", marginTop:"1rem", marginLeft:"1rem"}} onClick={showReportTemplate}>
                    preview
                   </MDBBtn>
                  </MDBCardFooter>
                  </MDBRow>
                 </MDBCol> 
                </MDBBox>
             </MDBCard>

             {showPreview ? <MDBCard className="mt-2">
                        <Grid item>
                            <ReportTemplatePreview/>
                        </Grid>
                    </MDBCard>: null}
        
        </div>  
    )
}

export default NewReport
