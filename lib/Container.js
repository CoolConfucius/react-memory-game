import React from "react";

import Game from "./Game"

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gameId: 1 }; 
  }
  handleClick() {
    this.setState({ gameId: this.state.gameId + 1 }); 
  }
  render() {
    return (
      <div>
        <Game key={this.state.gameId} randomCellCount={6} countDown={10} />
        <button onClick={this.handleClick.bind(this)}>Change</button>
      </div>
    );
  }
}

export default Container; 