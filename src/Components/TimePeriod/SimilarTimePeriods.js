import React, { useEffect, useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBDropdown,
  MDBDropdownToggle,
  MDBBox,
  MDBBtn,
  MDBCardHeader,
  MDBDropdownMenu,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBDropdownItem,
} from "mdbreact";
import { Link } from "react-router-dom";
import "./SimilarTimePeriods.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button} from "antd";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { getInstance } from "d2";
import Grid from "@material-ui/core/Grid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as autoTable from "jspdf-autotable";
import { Scrollbars } from "react-custom-scrollbars";
import ModalView from "./ModalView";
import { FaAngleLeft } from "react-icons/fa";


const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});


//Main function
const SimilarTimePeriods = (props) => {
  //Array for the fixed periodTypes
  var relativeTime = [
    { these: "THIS_WEEK", last: "LAST_WEEK" },
    { these: "THIS_MONTH", last: "LAST_MONTH" },
    { these: "THIS_BIMONTH", last: "LAST_BIMONTH" },
    { these: "THIS_QUARTER", last: "LAST_QUARTER" },
    { these: "QUARTERS_THIS_YEAR", last: "QUARTERS_LAST_YEAR" },
    { these: "MONTHS_THIS_YEAR", last: "MONTHS_LAST_YEAR" },
    { these: "THIS_SIX_MONTH", last: "LAST_SIX_MONTH" },
    { these: "THIS_YEAR", last: "LAST_YEAR" },
    { these: "THIS_FINANCIAL_YEAR", last: "LAST_FINANCIAL_YEAR" },
  ];

  //Variable Creation
  var initialState = props.indicatorProps;
  var orgs = props.orgProps;

  //Variable declaration
  const classes = useStyles();
  const [orgUnits, setOrgUnits] = useState(orgs);
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [indicators, setIndicators] = React.useState(initialState);
  const [selectedIndicator, setSelectedIndicator] = React.useState();
  const [orgValue, setOrgValue] = React.useState([]);
  const [selectedOrgUnit, setSelectedOrgUnit] = React.useState([]);
  const [cols, setCols] = React.useState([]);
  const [showTable, setShowTable] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [showDownloading, setShowDownloading] = React.useState(false);
  const [thisPeriod, setThisPeriod] = React.useState(
    "select a period this year"
  );
  const [lastPeriod, setLastPeriod] = React.useState("");
  const [years, setYears] = React.useState([]);

  //Event handler for indicators
  const handleIndicatorClick = (e, value) => {
    const filterIndicator = indicators.filter(
      (indicator) => indicator.id === e.target.value && indicator
    )[0];
    console.log(filterIndicator);
    setSelectedIndicator(filterIndicator);
  };

  function handleChange(event) {
    this.setState({ value: event.target.value });
  }

  function handleSubmit(event) {
    alert("You have chosen : " + this.state.value);
    event.preventDefault();
  }

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
          console.log(response)
          returnBack(response);
        })
        .catch((error) => {
          console.log(error);
          // setLoading(false)
        });
    });
  };

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

  const getProgramIndicators = (D2) => {
    const endPoint = "/indicators.json";

    D2.Api.getApi()
      .get(endPoint)
      .then((response) => {
        if (response) {
          // console.log(response.indicators)
          setIndicators(response.indicators);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  //console.log(indicators);

  //When the periods dropdown is clicked
  const handlePeriodClick = (value) => {
    // console.log(value)
    setThisPeriod(value.these);
    setLastPeriod(value.last);
  };

  //Event handler for compare button, the comparison process
  const handleCompare = () => {
    //If the user has forgotten to select a period
    if (thisPeriod === "select a period this year") {
      alert("please select a time period to proceed");
    } else {
      //Load the compare button
      setShowLoading(true);

      //Add the periods as a string
      var period = thisPeriod + ";" + lastPeriod;

      //Define an array for the org units
      var units = [];
      // console.log(selected)
      selected.map((item) => {
        units.push(item);
      });

      //Start the comparison process
      makeComparison(
        thisPeriod,
        lastPeriod,
        selectedIndicator,
        period,
        units.join(";")
      );
    }
  };

  //When org unit has been clicked
  const handle = (value) => {
    setOrgValue(value);
  };

  //when an orgUnit has been selected
  const onSelect = (value, node) => {
    //setSelectedOrgUnit(node);
    setSelectedOrgUnit((selectedOrgUnit) => [...selectedOrgUnit, node]);
  };

  //Defining Make Comparison Function
  const makeComparison = (
    thisPeriod,
    lastPeriod,
    indicator,
    timePeriod,
    orgUnit
  ) => {
    console.log(orgUnit);
    const returnback = (result) => {
      console.log(result);
      if (result == null) {
        alert("oops, an error occurred! Try reloading your page");
      } else {
        var columns = [];
        var period1 = result.metaData.dimensions.pe[0];
        var period2 = result.metaData.dimensions.pe[1];
        var periods = [
          result.metaData.items[period1].name,
          result.metaData.items[period2].name,
        ];
        setYears(periods);

        periods.map((period) => {
          selected.map((unit) => {
            columns.push({ year: period, unit: unit, value: 0 });
          });
        });

        //let value = [];
        let rows = [];
        if (result.rows == null || result.rows.length === 0) {
          alert(
            "No data available, try again with a different orgUnit, period or indicator!"
          );
        } else {
          let i;
          for (i = 0; i < result.rows.length; i++) {
            let year = result.rows[i][0];
            let org = result.rows[i][1];
            //  console.log(result.rows[i][1])
            columns.map((item) => {
              if (item.year === year || item.unit === org) {
                rows.push({ year: year, unit: org, value: result.rows[i][2] });
              }
            });
          }
        }

        rows.map((item) => {
          if (item.value == null || item.value === 0) {
            alert(
              "No data available, try again with a different orgUnit, period or indicator!"
            );
            item.value = "N/A";
          }
        });
        console.log(rows);
        setCols(rows);

        setShowTable(true);
        setShowLoading(false);
      }
    };

    comparisons(indicator, timePeriod, orgUnit, returnback);
  };

  //Download function for the table
  const downloadPDF = (title) => {
    setShowDownloading(true);
    const input = document.getElementById("tableDiv");
    html2canvas(input)
      .then((canvas) => {
        const pdf = new jsPDF();
        pdf.setFontSize(25);
        pdf.autoTable({ startY: 20, html: "#tableDiv" });
        pdf.text(title, 50, 15);
        pdf.save(title + ".pdf");
      })
      .then(() => {
        setShowDownloading(false);
      });
  };

  //Table for the comparisons of similar time periods
  const Table = ({ columns }) => (
    <MDBBox display="flex" justifyContent="center">
      <MDBCol className="mb-5" md="10" style={{ width: "350px" }}>
        <MDBCard>
          <MDBCardHeader
            tag="h5"
            className="text-center font-weight-bold text-uppercase py-4"
          >
            {selectedIndicator.displayName}
          </MDBCardHeader>

          <MDBCardBody>
            <MDBTable
              id="tableDiv"
              hover
              bordered
              responsive
              className="border-light border"
              hover
              small
            >
              <MDBTableHead>
                <tr>
                  <th>OrgUnit | Period</th>

                  {years.map((item, key) => (
                    <th key={key}>{item}</th>
                  ))}
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {columns.map((column, key) => (
                  <tr key={key}>
                    <td>{column.unit}</td>
                    {years.map((year, index) => (
                      <td key={index}>
                        {columns.filter((obj) => obj.year === year)[0].value}
                      </td>
                    ))}
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ margin: 10 }}
        >
          <Button
            onClick={() => {
              downloadPDF(selectedIndicator.displayName);
            }}
            type="primary"
          >
            Download{" "}
            {showDownloading ? (
              <div
                className="spinner-border mx-2 text-white spinner-border-sm"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}
          </Button>
        </Grid>
      </MDBCol>
    </MDBBox>
  );

  //The return
  return (
    <div className="period">
      {/**A div for the header */}
      <div
        style={{
          maxHeight: "100px",
          marginLeft: "5px",
          marginRight: "5px",
          paddingTop: "5px",
        }}
      >
        <Link to="/">
          <Button type="primary"> <FaAngleLeft style={{ paddingRight: "5px" }} />Home</Button>
        </Link>
      </div>
      <hr />

      {/** A div for the Container for the form */}
      <div className="container">
        <div className="jumbotron">
          <h2>Similar Time Period</h2>
          <hr />
          <form action="#" onSubmit={handleSubmit} className="MyForm">
            <MDBRow style={{ marginLeft: "2rem", height: 400 }}>
              <MDBCol md="5" style={{ height: "400px" }}>
                <MDBCard>
                  <MDBCardBody>
                    <Scrollbars style={{ width: 350, height: 350 }}>
                      <div>
                        <label className="grey-text ml-2">
                          <strong>Select Organisation units</strong>{" "}
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

                    {/*END OF ORGANISATION UNIT SECTION*/}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              {/* A section for indicators */}
              <MDBCol
                md="7"
                style={{ display: "flex", paddingLeft: "6rem", height: 400 }}
              >
                <MDBCard>
                  <MDBCardBody>
                    <hr />
                    <label className="control-label">Indicator :</label>
                    &nbsp;&nbsp;&nbsp;
                    <select
                      name="mark_location"
                      id="mark_location"
                      style={{ width: "300px" }}
                      onChange={handleIndicatorClick}
                    >
                      <option>Select Indicator</option>

                      {indicators &&
                        indicators.map((indicator) => {
                          return (
                            <option value={indicator.id}>
                              {indicator.displayName}
                            </option>
                          );
                        })}
                    </select>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <hr />
            {/* <MDBCardFooter> */}
            <MDBRow style={{ marginLeft: "3rem" }}>
              <MDBCol size="5">
                <MDBRow>
                  <MDBRow>
                    <MDBDropdown
                      className=" myDropDown"
                      style={{ width: "400px" }}
                      size="sm"
                    >
                      <MDBBtn color="primary" style={{ float: "left" }}>
                        {thisPeriod}
                      </MDBBtn>
                      <MDBDropdownToggle caret color="primary" />
                      <MDBDropdownMenu className="dropdown-menu myDrop" basic>
                        {relativeTime.map((item, index) => (
                          <MDBDropdownItem
                            onClick={() => {
                              handlePeriodClick(item);
                            }}
                            key={index}
                          >
                            {item.these}
                          </MDBDropdownItem>
                        ))}
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBRow>
                </MDBRow>
              </MDBCol>
            
              <div>
                <MDBRow style={{ marginLeft: "5rem" }}>
                  <MDBBtn color="primary" size="sm" onClick={handleCompare}>
                    Compare with Same period last year
                    {showLoading ? (
                      <div
                        className="spinner-border mx-2 text-white spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : null}
                  </MDBBtn>
                </MDBRow>

                {showTable ? (
                  <Grid item>
                    {/* {Table(cols)} */}
                    <ModalView>
                      <Table columns={cols} />
                    </ModalView>
                  </Grid>
                ) : null}
              </div>
            </MDBRow>
            {/* </MDBCardFooter> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimilarTimePeriods;
