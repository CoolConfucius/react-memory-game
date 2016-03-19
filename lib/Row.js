import React from "react"; 

class Row extends React.Component {
  render(){
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default Row; 