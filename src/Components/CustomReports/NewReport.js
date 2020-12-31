import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "antd";
import "antd/dist/antd.css";
import { getInstance } from "d2";
import {
  MDBBox,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import "./NewReport.css";
import React, { useEffect, useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import ModalView from "./ModalView";
import { FaAngleLeft, FaEdit} from "react-icons/fa";

import makeAnimated from "react-select/animated";

//Sytle for OrgUnit Implementation
const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const moment = require("moment");
let now = moment();
var currentTime = date + "T" + time;
const basicAuth = "Basic " + btoa("admin:district");
var date = now.format("YYYY-MM-DD");
var time = now.format("HH:mm:ss.SSS");
const animatedComponents = makeAnimated(); //For react-select

function NewReport(props) {
  const classes = useStyles();
  const [tableColumns, setTableColumns] = React.useState(0);
  const [tableRows, setTableRows] = React.useState(0);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [report, setReport] = React.useState({});
  const [description, setDescription] = React.useState("");
  const [showPreview, setShowPreview] = React.useState(false);
  const [selectedIndicators, setSelectedIndicators] = React.useState([]);
  const [colHeaders, setColHeaders] = React.useState([]);
  const [cellData, setCellData] = React.useState([]);
  const [rowHeaders, setRowHeaders] = React.useState([]);
  const [cellValues, setCellValues] = React.useState([]);
  const [indicators, setIndicators] = React.useState([]);
  const [selectedPT, setSelectedPT] = React.useState([]);

  const [orgUnits, setOrgUnits] = useState([]);
  //Api calls to be used throughout the component

  useEffect(() => {
    // setLoading(true)
    getInstance()
      .then((d2) => {
        const endPoint =
          "/organisationUnits.json?level=1&fields=id,name,displayName,children[id,name,displayName,children[id,name,displayName,children[id,name,displayName,children[id,name,displayName,children[id,name,displayName,children[id,name,displayName,children]]]]]],level&paging=false";
        // setD2Instance(d2.Api.getApi())
        d2.Api.getApi()
          .get(endPoint)
          .then((response) => {
            // setLoading(false)
            if (response.organisationUnits) {
              setOrgUnits(response.organisationUnits);
            }
          })
          .catch((error) => {
            console.log(error);
            // setLoading(false)
          });

        getProgramIndicators(d2);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false)
      });
  }, []);

  // A call for indicators that are being used in the react-select dropdown
  getInstance().then((d2) => {
    const endPoint = `/indicators.json`;

    // setD2Instance(d2.Api.getApi())
    d2.Api.getApi()
      .get(endPoint)
      .then((response) => {
        setIndicators(response.indicators);
        //console.log(indicators)
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false)
      });
  });

  //A call for PeriodTypes that are being used again in the react-select dropdown
  const [periodTypes, setPeriodTypes] = React.useState([]);
  getInstance().then((d2) => {
    const endPoint = `/periodTypes.json?paging=false&fields=name&fields=isoFormat`;
    // setD2Instance(d2.Api.getApi())
    d2.Api.getApi()
      .get(endPoint)
      .then((response) => {
        setPeriodTypes(response.periodTypes);
        //checking if period types are working just fine
        //  console.log(periodTypes)
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false)
      });
  });

  var array = { name: "", id: "" };

  const getProgramIndicators = (D2) => {
    const endPoint = "/indicators.json";

    D2.Api.getApi()
      .get(endPoint)
      .then((response) => {
        if (response) {
          //console.log(response.indicators)
          array.name = indicators.name;
          array.id = indicators.id;
          // console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return array;
  };

  //a call to get data from analytics
  //Api call
  const comparisons = (dxID, period, ouID, returnBack) => {
    console.log(ouID);
    getInstance().then((d2) => {
      const endPoint = `/analytics.json?dimension=pe:${period}&dimension=ou:${ouID}&filter=dx:${dxID.id}&displayProperty=NAME&outputIdScheme=NAME`;

      // setD2Instance(d2.Api.getApi())
      d2.Api.getApi()
        .get(endPoint)
        .then((response) => {
          // setLoading(false)
          console.log(response);
          returnBack(response);
        })
        .catch((error) => {
          console.log(error);
          // setLoading(false)
        });
    });
  };

  //A get request to edit saved reports in the data store
  const editSavedReport = (jsonString, id) => {
    fetch(`https://play.dhis2.org/2.34.2/api/33/`, {
      method: "PUT",
      body: JSON.stringify(jsonString),
      headers: {
        Authorization: basicAuth,
        "Content-type": "application/json",
        mode: "cors",
      },

      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        alert("Report edited successfully");
      })
      .then((result) => {
        handleSavedReportButton();
      })
      .catch((error) => {
        alert("oops an error occurred: " + error);
      });
  };

  // A post request for creating reports
  const postNewReport = (jsonString, id) => {
    getInstance().then((d2) => {
      const endPoint = "/dataStore/customReports/${id}";
      // setD2Instance(d2.Api.getApi())
      d2.Api.getApi()
        .get(endPoint)
        .then((response) => {
          // setLoading(false)
          console.log(response);
          alert("Report created successfully");
        })
        .then((result) => {
          handleButton();
        })
        .catch((error) => {
          console.log(error);
          // setLoading(false)
        });
    });
  };

  // fetch(`https://play.dhis2.org/dhis2/api/33/dataStore/customReports/${id}`, {
  //   method: "POST",
  //   body: JSON.stringify(jsonString),
  //   headers: {
  //     Authorization: basicAuth,
  //     "Content-type": "application/json",
  //     mode: 'cors',
  //   },

  //   credentials: "include",
  //  })
  //   .then((response) => {
  //     //console.log(response);
  //     alert("Report created successfully");
  //   })
  //   .then((result) => {
  //     handleButton();
  //   })
  //   .catch((error) => {
  //     alert("oops an error occurred: " + error);
  //   });

  const getChildren = (children) => {
    return (
      children &&
      children.children.map((child) => {
        return (
          <TreeItem
            key={child.id}
            name={child.name}
            nodeId={child.id}
            label={child.displayName}
          >
            {child.children ? getChildren(child) : null}
          </TreeItem>
        );
      })
    );
  };

  const RenderChildren = (props) => {
    return (
      props.orgUnits !== undefined &&
      props.orgUnits.map((child) => {
        return (
          <TreeItem
            key={child.id}
            name={child.name}
            nodeId={child.id}
            label={child.displayName}
          >
            {getChildren(child)}
          </TreeItem>
        );
      })
    );
  };

  //Event handler for Report Template Title
  const handleReportTitle = ({ target: { value } }) => {
    setTitle(value);
  };

  //Event handler from Report Template Description
  const handleReportDescription = ({ target: { value } }) => {
    setDescription(value);
  };

  //event handler for Report Template columns
  const handleTableColumns = ({ target: { value } }) => {
    setTableColumns(value);
    var array = [];
    for (var i = 0; i < value; i++) {
      array.push({ name: "Col Header", id: "colheader" + i + "" });
    }
    setColHeaders(array);
  };

  //event handler for Report Template Rows
  const handleTableRows = ({ target: { value } }) => {
    setTableRows(value);
    var rowArray = [];
    for (var i = 0; i < value; i++) {
      rowArray.push({ name: "row header", id: "rowheader" + i + "" });
    }
    setRowHeaders(rowArray);
  };

  const handleButton = () => {
    window.location.href = "/newReport";
  };

  //event Handle for saved Report button
  const handleSavedReportButton = () => {
    props.buttonCallback();
  };

  //Handler Report Template
  const showReportTemplate = () => {
    setShowPreview(true);
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  //Event Handler for selected orgUnits
  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    console.log(selected);
  };

  //a handler for the selected indicators
  const onChangeInput = (data) => {
    setSelectedIndicators(data);
    //console.log(data);
  };

  const SelectedPeriodType = (data) => {
    setSelectedPT(data);
    //console.log(selectedPT);
  };

  //listener for editing row names
  const editRowNames = (selectedIndicators) => {
    var newName = prompt("enter new row name");
    var tableCell = document.getElementById(selectedIndicators.id);
    tableCell.innerHTML = newName;
    selectedIndicators.name = newName;
  };

  function chunkArray(arr, n) {
    var chunkLength = Math.max(arr.length / n, 1);
    var chunks = [];
    for (var i = 0; i < n; i++) {
      if (chunkLength * (i + 1) <= arr.length)
        chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
    }
    return chunks;
  }

  var reA = /[^a-zA-Z]/g;
  var reN = /[^0-9]/g;

  function sortAlphaNum(a, b) {
    var aA = a.id.replace(reA, "");
    var bA = b.id.replace(reA, "");
    if (aA === bA) {
      var aN = parseInt(a.id.replace(reN, ""), 10);
      var bN = parseInt(b.id.replace(reN, ""), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    } else {
      return aA > bA ? 1 : -1;
    }
  }

  //Event listener for a submit button click
  const handleSubmit = () => {
    console.log(colHeaders);
    console.log(selectedIndicators);
    console.log(cellValues);

    var arrayOfData = [];

    var itemsObj = {};
    var itemsList = [];

    for (var i = 0; i < cellValues.length; i++) {
      var item = cellValues[i];
      if (!itemsObj[item.id]) {
        itemsObj[item.id] = item;
        console.log(itemsObj[item.id]);
        itemsList.push(item);
      } else {
        var index = itemsList.indexOf(itemsObj[item.id]);
        console.log(index);
        //delete itemsList[index]
        itemsList.splice(index, 1);
        //console.log(itemsList.slice(itemsObj[item.id]))
        itemsObj[item.id] = item;
        itemsList.push(item);
        console.log(itemsList);
      }
    }

    itemsList.map((item) => {
      console.log(document.getElementById(item.id).value);
      arrayOfData.push({
        id: item.id,
        indicatorID: item.indicator.id,
        indicatorName: document.getElementById(item.id).value,
      });
    });

    var sortedArray = arrayOfData.sort(sortAlphaNum);
    var rowArrays = chunkArray(sortedArray, rowHeaders.length);

    var rowdata = [];
    rowHeaders.map((row, index) => {
      rowdata.push({ rowDetails: row, rowData: rowArrays[index] });
    });

    console.log(rowdata);

    if (
      selectedIndicators.length === 0 ||
      tableColumns === 0 ||
      title === "" ||
      tableRows === 0
    ) {
      alert("some fields have been left empty. Please fill them up");
    } else {
      var id = title + "-" + currentTime;
      var payload = {
        id: id,
        title: title,
        description: description,
        rows: tableRows,
        columns: tableColumns,
        columnHeaders: colHeaders,
        //cellData: rowdata,
      };

      console.log(JSON.stringify(payload));
      postNewReport(payload, id);
    }
  };

  //The actual report-template creation function
  const ReportTemplatePreview = (indicators, periodTypes, selected) => (
    // <Card title="Report Template" bordered={false} style={{ width: 400, alignContent:"center" }}>
    <MDBCard>
      <MDBCardHeader
        tag="h5"
        className="text-center font-weight-bold text-uppercase py-4"
      >
        {/* Report Template */}
        {title}
      </MDBCardHeader>

      <MDBCardBody style={{ padding: 10 }}>
        <MDBTable id="tableId" striped bordered responsive>
          <MDBTableHead>
            <tr>
              <th>Period | Indicator</th>
              {periodTypes.map((item, key) => (
                <th key={key}>
                  <div id={item.value}>{item.label}</div>
                </th>
              ))}
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {/* A condition for checking if # of columns equals selected indicators */}
            {/* here */}
            {selectedIndicators.map((tableRow, key) => (
              <tr key={key}>
                <td>
                  <FaEdit style={{ paddingRight: "5px", fontSize:"20px" }}
                    onClick={editRowNames} />
                  {tableRow.label}
                </td>
                {indicators.map((indicator, index) => (
                 
                  <td key={index}>
                     {
                      selectedIndicators.filter(
                        (obj) => obj.value === indicator.value
                      )[0].value
                    } 
                  </td>
                ))}
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBCardBody>

      <MDBCardFooter>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ margin: 10 }}
        >
          <MDBBtn onClick={handleSubmit} color="primary">
            Create Report
          </MDBBtn>
        </Grid>
      </MDBCardFooter>
    </MDBCard>
  );

  //The return method
  return (
    <div className="my-NewReport">
      <MDBRow>
        <MDBCol md="3">
          <div
            style={{ marginLeft: "5px", marginRight: "5px", paddingTop: "5px" }}
          >
            <Link to="/">
              <Button type="primary" >
                <FaAngleLeft style={{ paddingRight: "5px" }} />
                Home
              </Button>
            </Link>
          </div>
        </MDBCol>
        <MDBCol md="9"></MDBCol>
      </MDBRow>

      <hr />

      <Paper
        variant="outlined"
        style={{
          marginBottom: "1rem",
          marginTop: "1rem",
          marginLeft: "6rem",
          width: "85%",
        }}
      >
        <MDBBox standard="true">
          <MDBCol className="mb-3">
            <p className="h4 text-center py-4">Create New Report</p>

            <MDBRow style={{ marginLeft: "2rem" }}>
              {/** The form is starting from here */}
              <MDBCol md="5" sytle={{ height: "800px" }}>
                <MDBCard>
                  <MDBCardBody>
                    <form>
                      <div className="grey-text">
                        <MDBInput
                          label="Report Title"
                          group
                          type="text"
                          value={title}
                          onChange={(e) => handleReportTitle(e)}
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
                          onChange={(e) => handleReportDescription(e)}
                          validate
                          error="wrong"
                          success="right"
                        />

                        <MDBInput
                          label="Enter number of rows"
                          group
                          type="number"
                          value={tableRows} //corresponding to indicators
                          onChange={(e) => handleTableRows(e)}
                          validate
                          error="wrong"
                          success="right"
                        />

                        <MDBInput
                          label="Enter number of Columns"
                          group
                          type="number"
                          value={tableColumns} //corresponding to actual report columns
                          onChange={(e) => handleTableColumns(e)}
                          validate
                          error="wrong"
                          success="right"
                        />
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6" style={{ display: "flex" }}>
                <MDBCard>
                  <MDBCardBody>
                    <div className="grey-text">
                      <div style={{ paddingBottom: "2rem" }}>
                        <p className="text-center">
                          Select indicators, Organization unit & Period for the
                          report template
                        </p>
                        <hr />
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          onChange={onChangeInput}
                          isMulti
                          options={indicators.map((SelectOptions, id) => ({
                            value: SelectOptions.id,
                            label: SelectOptions.displayName,
                          }))}
                          placeholder="Select indicators..."
                        />
                      </div>

                      <div style={{ paddingBottom: "2rem" }}>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          onChange={SelectedPeriodType}
                          isMulti
                          options={
                            periodTypes &&
                            periodTypes.map((period) => ({
                              value: period.isoFormat,
                              label: period.name,
                            }))
                          }
                          placeholder="Select Period"
                        />
                      </div>

                      <Scrollbars style={{ width: 480, height: 150 }}>
                        <div>
                          <label className="grey-text ml-2">
                            <strong>Select Organisation Unit :</strong>
                          </label>
                          <TreeView
                            className={classes.root}
                            defaultCollapseIcon={<ExpandMoreIcon />}
                            defaultExpandIcon={<ChevronRightIcon />}
                            multiSelect
                            expanded={expanded}
                            selected={selected}
                            onNodeToggle={handleToggle}
                            onNodeSelect={handleSelect}
                            treeData={orgUnits}
                          >
                            <RenderChildren orgUnits={orgUnits} />
                          </TreeView>
                        </div>
                      </Scrollbars>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBBox>
        <MDBCardFooter>
          <Button type="primary" onClick={showReportTemplate}>
            {" "}
            Preview template
          </Button>
        </MDBCardFooter>

        {/* </MDBCard> */}
      </Paper>
      {showPreview ? (
        <MDBCard className="mt-2">
          <Grid item>
            <ModalView>
              {ReportTemplatePreview(selectedIndicators, selectedPT, selected)}
            </ModalView>
          </Grid>
        </MDBCard>
      ) : null}
    </div>
  );
}

export default NewReport;
