import React from "react";
import { Link } from "react-router-dom";
import {MDBBox,MDBCard,MDBCol,MDBInput,MDBRow} from "mdbreact";
import { Button } from "antd";
import "antd/dist/antd.css";
import Paper from "@material-ui/core/Paper";
import "./SavedReports.css";

class SavedReports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      querry: "",
      results: {},
      loading: false,
      message: "",
    };
  }

  render() {
    return (
       <div style={{ backgroundColor: "#f0f0f0", paddingBottom: "20px", height:"100%"}}>
        <div
          style={{
            maxHeight: "100px",
            marginLeft: "5px",
            marginRight: "5px",
            paddingTop: "5px",
          }}
        >
          <Link to="/">
            <Button type="primary">Home</Button>
          </Link>
        </div>
        <hr />
        
        <Paper
          variant="outlined"
          style={{marginBottom: "1rem",
            marginTop: "1rem",
            marginLeft: "4rem",
            marginRight:"4rem",
            
          }}
        >
        <div className="container">
          {/* Heading */}
          <h2 className="heading">Saved Reports</h2>
          {/* serach input */}
          <label
            className="search-label"
            htmlFor="search-input"
            sytle={{ width: "450px", float: "center" }}
            >
              
            <input
              type="text"
              value=""
              id="search-input"
              placeholder="search..."
              />
             <i className="fa fa-search search-icon" />
          </label>
        </div>
        </Paper>
      </div>
    );
  }
}

export default SavedReports;
