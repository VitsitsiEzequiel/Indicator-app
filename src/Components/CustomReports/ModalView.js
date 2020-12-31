import React, { Component } from "react";
import { Modal } from "antd";
import { MDBBtn } from "mdbreact";

class ModalView extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    console.log(this.props.cols);
    this.setState({
      visible: !this.state.visible,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    return (
      <>
        <MDBBtn
          style={{ position: "relative", display:"flex"}}
          color="primary"
          onClick={this.showModal}
          style={{ float:"top" }}
          size="sm"
        >
          Continue
        </MDBBtn>

        <Modal
          style={{ maxHeight: "250px", width: "100%", maxWidth: "800px" }}
          visible={visible}
          title="Custom Report Template"
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.props.children}
        </Modal>
      </>
    );
  }
}

export default ModalView;
