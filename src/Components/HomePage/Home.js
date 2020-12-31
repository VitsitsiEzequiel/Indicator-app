import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { MDBBox, MDBCard, MDBCol, MDBInput, MDBRow } from "mdbreact";
import { FaPlus } from "react-icons/fa";
import { BiFontSize, BiTimer } from "react-icons/bi";
import { Button, Card } from "antd";
import "antd/dist/antd.css";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      querry: "",
      loading: false,
      message: "",
    };
    this.cancel = '';
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;
              this.setState({ query, loading: true, message: ''  } );
  };

  /**
 * Fetch the search results and update the state with the result.
 *
 * @param {String} query Search Query.
 *
 */

  render() {
    return (
      <div className="my-Home">
        <div className="my-Card">
          <Card bordered={false} style={{ width: "100%", height: "75px" }}>
            <MDBRow>
              <MDBCol md="4">
                {/* The logo and the title are to be removed prior to installation*/}
                <logo className="mylogo">
                  <img src="/images/LOGO.png" alt="Logo" />
                  <title>DHIS 2 Indicator App</title>
                </logo>
              </MDBCol>

              <MDBCol md="4">
               <div class="w3-container" >
                  <input class="w3-input w3-border w3-padding"
                    type="text"
                    placeholder="Search for saved reports..."
                    id="myInput"
                    onChange={this.handleOnInputChange} />
                 <i className="fa fa-search search-icon" /> 
                </div>
              </MDBCol>

              <MDBCol md="4">
                <Link to="time-periods">
                  <Button
                    type="primary"
                    style={{
                      justifyContent: "center",
                      float: "right",
                      marginLeft: 8,
                    }}
                    onClick={this.handleBtnClick}
                  >
                    <BiTimer style={{paddingRight:"5px" ,fontSize:"24px"}}/> Similar Time Period
                  </Button>
                </Link>

                <Link to="new-report">
                  <Button style={{fontFamily: "Century Gothic, CenturyGothic, AppleGothic, sans-serif"}}
                    type="primary"
                    href="/newReport"
                    style={{ justifyContent: "center", float: "right" }}
                    onClick={this.handleBtnClick}
                  >
                    <FaPlus style={{paddingRight:"5px",fontSize:"19px"}} /> Create
                  </Button>
                </Link>
              </MDBCol>
            </MDBRow>
          </Card>
        </div>
        <hr />

        <div className="myBody">
          <h1>Welcome to Indicator App!</h1>
          <h5>
            {" "}
            Creation of custom reports and taking snapshots of data in similar
            time period made less stressful!
          </h5>
          <hr style={{ color: "orange" }} />
          <p>
            1. Click create new, Write your custom report title, description
            <br />
            2. Enter number of rows and columns form the report
            <br />
            3. Select period from a drop down
            <br />
            4. Select OrgUnit from a drop down list
            <br />
            5. Select indicator group and click indicators to add to the group
            <br />
            <ul>
              <li>
                Make sure the number of rows entered is equal to the number of
                indicators selected
              </li>
              <li>
                Make sure the number of rows entered is equal to the number of
                periodTypes selected
              </li>
              <li>
                Click The preview changes button, to envolke a modal of results
              </li>
            </ul>
            6. Click create to preview changes, then save otherwise modify
            <br />
            <Fragment>
              <Link to="new-report">
                <Button
                  type="primary"
                  href="/newReport"
                  style={{ marginTop: "2rem", justifyContent: "center" }}
                  onClick={this.handleBtnClick}
                >
                  <FaPlus style={{paddingRight:"5px", fontSize:"19px"}}/> New Report
                </Button>
              </Link>
            </Fragment>
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
