import React from "react"; 

class Cell extends React.Component {
  handleClick(){
    if (this.props.gameState === "challenge") {
      // console.log(this.active());
      this.props.recordGuess({
        cellId: this.props.id,
        correct: this.active()
      });
    };
  }
  active(){
    return this.props.randomCellIds.indexOf(this.props.id) >= 0
  }
  correctGuess(){
    return this.props.correctGuesses.indexOf(this.props.id) >= 0
  }
  wrongGuess(){
    return this.props.wrongGuesses.indexOf(this.props.id) >= 0
  }

  render(){
    let style = {
      display: 'inline-block', 
      width: 50, 
      height: 50, 
      border: '1px solid #999',
      marginRight: 4 
    }

    if (this.active() && this.props.gameState === "highlight") {
      style.backgroundColor = 'blue';
    }

    if (this.correctGuess()) {
      style.backgroundColor = 'green';
    }

    if (this.wrongGuess()) {
      style.backgroundColor = 'red';
    }

    return (
      <div 
        style={style}
        onClick={this.handleClick.bind(this)}
      >
      </div>
    );
  }
}

Cell.propTypes = {
  recordGuess: React.PropTypes.func
};

export default Cell; 