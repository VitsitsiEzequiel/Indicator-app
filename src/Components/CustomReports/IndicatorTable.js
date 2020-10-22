import React, {useEffect, useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const IndicatorTable = () => {
    // variable decalaraton
    //const[indicators, setIndicators] = useState()
    //creating data to be viewed in the browser
    const data = [
        {name : 'Ezie-E', age:23},
        {name : 'Dan', age:24},
        {name : 'Manzy', age:29},
        {name : 'Eliza', age:20},
    ]

    //creating columns
    const columns = [
        {
            headerName : "Name", field: "name"  , checkboxSelection: true
        },
        { 
            headerName: "Age", field: "age" 
        }
    ]
   
    const defaultColDef = {
        sortable : true , editable: true , filter : true
    }

    return (
        <div className="ag-theme-alpine" style={ { height: "250px", width: "500px" } }>
            <AgGridReact rowData={data} columnDefs ={columns} defaultColDef={defaultColDef} />
        </div>
    )
}

export default IndicatorTable
