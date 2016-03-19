import React from "react";

import Game from "./Game"

class Container extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <Game rows={5} columns={5} randomCellCount={6} countDown={10} />
      </div>
    );
  }
}

export default Container; 