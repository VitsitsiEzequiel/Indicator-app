import React from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./DataAnalysis.css";
import { Link } from "react-router-dom";


function DataAnalysis() {
  return (
    <div className="">
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
    </div>
  );
}

export default DataAnalysis;
