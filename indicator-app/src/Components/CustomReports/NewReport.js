import React,{useState,useEffect} from 'react'
import {
    MDBBox,MDBRow,MDBCol,MDBInput,MDBBtn,MDBCard, MDBCardBody,MDBCardHeader,MDBTable,
    MDBTableHead, MDBTableBody, MDBCardFooter, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, 
    MDBDropdownItem,MDBCardTitle,MDBIcon,MDBContainer,MDBInputGroup,} from 'mdbreact';

import {AgGridReact,AgGridColumn} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import './NewReport.css'
//import {TreeSelect} from 'array-to-tree'
import 'react-dropdown-tree-select/dist/styles.css'
import 'react-dropdown-tree-select/dist/styles.css'
import {Button, TreeSelect} from 'antd';
import 'antd/dist/antd.css';
//import Loader from 'react-loader-spinner';//To be used later
//import Paper from '@material-ui/core/Paper';
//import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import OrgUnits from './OrgUnits';


//validation header
const basicAuth = 'Basic ' + btoa('admin:district');// To be used later when api calls start working

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
 
 //initializing an array-to-tree library that will turn an array of org units into a tree form
 var arrayToTree = require('array-to-tree');

 //An array of Org Units
 var OrgUnits = [{
  name: "Adonkia CHP",
  id: "Rp268JB6Ne4",
  parent: {
  id: "qtr8GGlm4gg"
  }
  },
  {
  name: "Afro Arab Clinic",
  id: "cDw53Ej8rju",
  parent: {
  id: "qtr8GGlm4gg"
  }
  },
  {
  name: "Agape CHP",
  id: "GvFqTavdpGE",
  parent: {
  id: "U6Kr7Gtpidn"
  }
  },
  {
  name: "Ahamadyya Mission Cl",
  id: "plnHVbJR6p4",
  parent: {
  id: "QywkxFudXrC"
  }
  },
  {
  name: "Ahmadiyya Muslim Hospital",
  id: "BV4IomHvri4",
  parent: {
  id: "NNE0YMCDZkO"
  }
  },
  {
  name: "Air Port Centre, Lungi",
  id: "qjboFI0irVu",
  parent: {
  id: "vn9KJsLyP5f"
  }
  },
  {
  name: "Alkalia CHP",
  id: "dWOAzMcK2Wt",
  parent: {
  id: "J4GiUImJZoE"
  }
  },
  {
  name: "Allen Town Health Post",
  id: "kbGqmM6ZWWV",
  parent: {
  id: "C9uduqDZr9d"
  }
  },
  {
  name: "Approved School CHP",
  id: "eoYV2p74eVz",
  parent: {
  id: "C9uduqDZr9d"
  }
  },
  {
  name: "Arab Clinic",
  id: "nq7F0t1Pz6t",
  parent: {
  id: "TQkG0sX9nca"
  }
  },
  {
  name: "Baama CHC",
  id: "r5WWF9WDzoa",
  parent: {
  id: "X7dWcGerQIm"
  }
  },
  {
  name: "Babara CHC",
  id: "yMCshbaVExv",
  parent: {
  id: "fRLX08WHWpL"
  }
  },
  {
  name: "Badala MCHP",
  id: "tlMeFk8C4CG",
  parent: {
  id: "Lt8U7GVWvSR"
  }
  },
  {
  name: "Badjia",
  id: "YuQRtpLP10I",
  parent: {
  id: "O6uvpzGd5pu"
  }
  },
  {
  name: "Bafodia CHC",
  id: "Jiymtq0A01x",
  parent: {
  id: "XrF5AvaGcuw"
  }
  },
  {
  name: "Bagruwa",
  id: "jPidqyo7cpF",
  parent: {
  id: "jmIPBj66vD6"
  }
  },
  {
  name: "Baiama CHP",
  id: "XtuhRhmbrJM",
  parent: {
  id: "M2qEv692lS6"
  }
  },
  {
  name: "Bai Bureh Memorial Hospital",
  id: "BH7rDkWjUqc",
  parent: {
  id: "vn9KJsLyP5f"
  }
  },
  {
  name: "Baiima CHP",
  id: "c41XRVOYNJm",
  parent: {
  id: "yu4N82FFeLm"
  }
  },
  {
  name: "Bai Largo MCHP",
  id: "Rll4VmTDRiE",
  parent: {
  id: "nV3OkyzF4US"
  }
  },
  {
  name: "Bailor CHP",
  id: "Eyj2kiEJ7M3",
  parent: {
  id: "fRLX08WHWpL"
  }
  },
  {
  name: "Baiwala CHP",
  id: "HFyjUvMjQ8H",
  parent: {
  id: "lYIM1MXbSYS"
  }
  },
  {
  name: "Bakeloko CHP",
  id: "MHAWZr2Caxw",
  parent: {
  id: "NNE0YMCDZkO"
  }
  },
  {
  name: "Bambara Kaima CHP",
  id: "LOpWauwwghf",
  parent: {
  id: "KXSqt7jv6DU"
  }
  },
  {
  name: "Bambara MCHP",
  id: "mUuCjQWMaOc",
  parent: {
  id: "X7dWcGerQIm"
  }
  },
  {
  name: "Bambawolo CHP",
  id: "TNbHYOuQi8s",
  parent: {
  id: "KIUCimTXf8Q"
  }
  },
  {
  name: "Bambuibu Tommy MCHP",
  id: "aSfF9kuNINJ",
  parent: {
  id: "RndxKqQGzUl"
  }
  },
  {
  name: "Bambukoro MCHP",
  id: "wYLjA4vN6Y9",
  parent: {
  id: "VGAFxBXz16y"
  }
  },
  {
  name: "Banana Island MCHP",
  id: "jjtzkzrmG7s",
  parent: {
  id: "qtr8GGlm4gg"
  }
  },
  {
  name: "Bandajuma Clinic CHC",
  id: "FNnj3jKGS7i",
  parent: {
  id: "NqWaKXcg01b"
  }
  },
  {
  name: "Bandajuma Kpolihun CHP",
  id: "ABM75Q1UfoP",
  parent: {
  id: "ERmBhYkhV6Y"
  }
  },
  {
  name: "Bandajuma MCHP",
  id: "rx9ubw0UCqj",
  parent: {
  id: "U6Kr7Gtpidn"
  }
  },
  {
  name: "Bandajuma Sinneh MCHP",
  id: "OZ1olxsTyNa",
  parent: {
  id: "cM2BKSrj9F9"
  }
  }]
 console.log(OrgUnits);
 



 // andicators api call to dummy indicators, to be changed when dhis2 problems are fixed
const [rowData, setRowData] = useState([]);
    useEffect(()=>{
    loadIndicators();
  },[]);

  //https://my.api.mockaroo.com/indicators.json?key=4ad64710
const loadIndicators = async () => {
    const response = await fetch(`https://my.api.mockaroo.com/indicators.json?key=4ad64710`,{
      method: 'GET',
        headers: {
            'Authorization' : basicAuth,
            'Content-type': 'application/json',
        }
    })
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
                  <Button  type="primary"  style={{ marginLeft: 8 }} onClick={handleBtnClick}> Home </Button>
             </div>
           <hr />

            <MDBCard style={{marginLeft:"4rem", marginRight:"4rem", marginTop:"1rem", display:"flex"}}>
              <MDBBox standard>
                <MDBCol className="mb-3" md="30">
                 <p className="h4 text-center py-4">Create New Report</p>
                 <MDBRow style={{marginLeft:"3rem"}}>

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
                    <Button  type="primary" onClick={showReportTemplate}>
                    preview
                  </Button>
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
