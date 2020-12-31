import React, { Component } from 'react';
import { Modal} from 'antd';
import { MDBBtn } from 'mdbreact';


class ModalView extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    console.log(this.props.cols)
    this.setState({
      visible: !this.state.visible,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };


  render() {
    const { visible} = this.state;

    return (
      <>
        <MDBBtn color="primary" onClick={this.showModal} style={{ float: "center" }} size="sm">
          Preview Table
            </MDBBtn>
        <Modal style={{ height: "250px", width: "450px" }}
          visible={visible}
          title="A snapshot of data in similar time period"
          
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.props.children}
        </Modal>
      </>
    )
  }
}

export default ModalView
