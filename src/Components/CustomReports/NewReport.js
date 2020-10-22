import React,{useState,useEffect} from 'react'
import {
    MDBBox,MDBRow,MDBCol,MDBInput,MDBBtn,MDBCard, MDBCardBody,MDBCardHeader,MDBTable,
    MDBTableHead, MDBTableBody, MDBCardFooter, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, 
    MDBDropdownItem,MDBCardTitle,MDBIcon,MDBContainer} from 'mdbreact';
import Paper from "@material-ui/core/Paper";
import  "./IndicatorTable";
//import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import {AgGridReact,AgGridColumn} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


//validation header
const basicAuth = 'Basic ' + btoa('admin:district');

function NewReport() {
 
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

    // an api call
  const [rowData, setRowData] = useState([]);

   useEffect(() => {
    fetch(`https://play.dhis2.org/2.34.1/api/33/indicators.json?paging=false`, {
      method: 'GET',
      headers: {
          'Authorization' : basicAuth,
          'Content-type': 'application/json',
      },
      credentials: "include"

  })
         .then(result => result.json())
         .then(rowData => setRowData(rowData))
   }, []);


  // Get selected rows buttun handler
    const onButtonClick = e => {
    const selectedNodes = gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => node.displayName + ' ' + node.shortName).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
 } 

 //Handle btn click
 function handleBtnClick(){
 window.location.href="/";
 }

    //Saved Reports Call

    //An api call to get indicators from play.dhis2.org to be use in the transfer list
    const getIndicators = (id) => {

        var indicatorListArray = {"indicatorName" : "", "id" : ""};
      
        fetch(`https://play.dhis2.org/2.34.1/api/33/indicators/${id}.json?paging=false&fields=id&fields=name`, {
            method: 'GET',
            headers: {
                'Authorization' : basicAuth,
                'Content-type': 'application/json',
            },

            credentials: "include"

        }).then(response => response.json())
            .then(result =>{
                //array.push(result);
                indicatorListArray.indicatorName = result.indicatorName
                indicatorListArray.id = result.id

            }).catch(error => {
            alert("Something went wrong ")
        })

        return indicatorListArray;//an array to be used in the transfer list and Report Templpate

    };
    
    //The return method
    return (
        <div>
            <div style={{backgroundColor: "white", maxHeight: "100px",
                  marginLeft: "5px",marginRight:"5px", paddingTop: "5px" }}>
                  <MDBBtn  color="primary" onClick={handleBtnClick}> Go Home </MDBBtn>
             </div>
           <hr />
            <MDBCard style={{marginLeft:"2rem", marginRight:"2rem", marginTop:"1rem", display:"flex"}}>
              <MDBBox standard>
                <MDBCol className="mb-3" md="30">
                 <p className="h4 text-center py-4">Create New Report</p>
                 <MDBRow style={{marginLeft:"2rem"}}>
                    {/** The form is starting from here */}
                    
                     <MDBCol md="4" >
                       <MDBCard>
                         <MDBCardBody>
                         <form>
                         <div className="grey-text">

                         <MDBInput
                          label="Report Title"
                          group type="text"
                         // value={title}
                        //  onChange={e => handleReportTitle(e)}
                          validate
                          error="wrong"
                          success="right"
                          />

                         <MDBInput
                          label="Description"
                          group
                          type="textarea"
                          rows="3"
                         // value={description}
                         // onChange={e => handleReportDescription(e)}
                          validate
                          error="wrong"
                          success="right"
                          />   

                          <MDBInput 
                          label="Enter number of rows"
                          group type="number"
                          //value={tableRows}//corresponding to indicators
                          //onChange={e => handleTableRows(e)}
                          validate
                          error="wrong"
                          success="right"
                          />
                        
                          <MDBInput 
                          label="Enter number of Columns"
                          group type="number"
                          //value={tableColumns}//corresponding to actual report columns
                          //onChange={e => handleTableColumns(e)}
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
                                <p className="text-center" style={{marginTop:"2px"}}>Select indicator groups to include in the report</p>
                               
                                {/**React Ag-Grid Data table implementation */}
                                <div className="ag-theme-alpine" style={ { height: "250px", width: "600px" } }>
                                 <button onClick={onButtonClick}>Get selected rows</button>
                                  <AgGridReact
                                          rowData={rowData}
                                          rowSelection="multiple">
                                       <AgGridColumn field="Id" sortable={true} filter={true}  checkboxSelection={true}  pagination={true} ></AgGridColumn> 
                                       <AgGridColumn field="Display Name" sortable={true} filter={true} ></AgGridColumn>
                                       <AgGridColumn field="Short Name" sortable={true} filter={true} ></AgGridColumn>   
                                  </AgGridReact>
                                </div>
                              </div>
                           </div>
                         </form>
                      </MDBCardBody>
                      </MDBCard>
                      </MDBCol>
           
                  <MDBBtn  color="primary" type="submit" style={{justifyContent:"center", marginTop:"1rem", marginLeft:"1rem"}}>
                    preview
                  </MDBBtn>
                   
                  </MDBRow>
                 </MDBCol> 
                </MDBBox>
             </MDBCard>
        </div>
        
    )
}

export default NewReport
