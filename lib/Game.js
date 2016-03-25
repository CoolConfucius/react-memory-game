import React from "react";
import _ from "lodash"; 

import Row from './Row';
import Cell from './Cell';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.grid = [];
    let cols;

    for (let r=0; r < this.props.rows; r++) {
      cols = []; 
      for (let c=0; c < this.props.columns; c++) {
        cols.push(`${r}-${c}`)
      };
      this.grid.push(cols);
    }

    var flatGrid = _.flatten(this.grid);
    this.randomCellIds = _.sampleSize(flatGrid, this.props.randomCellCount);

    this.state = { 
      gameState: 'highlight', 
      correctGuesses: [], 
      wrongGuesses: [],
      countDown: this.props.countDown
    };
  }

  gameover(str){
    setTimeout(() => {
      alert(`You ${str}!`);
    }, 50);
    clearInterval(this.intervalID);
    clearTimeout(this.startcountdown);
    this.setState({ correctGuesses: [], wrongGuesses: [], gameState: 'over' });
  }

  recordGuess({correct, cellId}) {
    let { correctGuesses, wrongGuesses } = this.state; 
    if (correct) {
      correctGuesses.push(cellId);
      if (correctGuesses.length === this.props.randomCellCount) {
        // setTimeout(() => {
        //   alert("You win!");
        // }, 50);
        // clearInterval(this.intervalID);
        // clearTimeout(this.startcountdown);
        // // this.setState({ gameState: 'over' });
        // this.setState({ correctGuesses: [], wrongGuesses: [],
        //   gameState: 'over' });
        this.gameover("win");
      };
    } else {
      wrongGuesses.push(cellId); 
      if (wrongGuesses.length === 3) {
        // setTimeout(() => {
        //   alert("You lose!");
        // }, 50);
        // clearInterval(this.intervalID);
        // clearTimeout(this.startcountdown);
        // // this.setState({ gameState: 'over' });
        // this.setState({ correctGuesses: [], wrongGuesses: [],
        //   gameState: 'over' });
        this.gameover("lose");
      };
    }
    this.setState( { correctGuesses, wrongGuesses });
  }

  componentDidMount() {
    this.showtime = setTimeout(() => {
      this.setState({ gameState: 'challenge' });
      this.startcountdown = setTimeout(() => {
        setTimeout(() => {
          alert("time's up!");
        }, 50);
        this.setState({ gameState: 'over'});
        clearInterval(this.intervalID);
      }, this.props.countDown*1000); 
      this.intervalID = setInterval(() => {
        this.setState({countDown: this.state.countDown - 1});
        // console.log(this.state.countDown);
      }, 1000);
    }, 3000)  
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);  
  }


  restart(){
    console.log("restart! \n"); 
    
    if (this.showtime) {
      clearTimeout(this.showtime);
    };
    if (this.startcountdown) {
      clearTimeout(this.startcountdown);
    };
    if (this.intervalID) {
      clearInterval(this.intervalID);
    };

    this.state = { 
      gameState: 'highlight', 
      correctGuesses: [], 
      wrongGuesses: [],
      countDown: this.props.countDown
    };

    this.grid = [];
    let cols;

    for (let r=0; r < this.props.rows; r++) {
      cols = []; 
      for (let c=0; c < this.props.columns; c++) {
        cols.push(`${r}-${c}`)
      };
      this.grid.push(cols);
    }

    var flatGrid = _.flatten(this.grid);
    this.randomCellIds = _.sampleSize(flatGrid, this.props.randomCellCount);

    this.showtime = setTimeout(() => {
      this.setState({ gameState: 'challenge' });
      this.startcountdown = setTimeout(() => {
        alert("time's up!");
        this.setState({ gameState: 'over'});
        clearInterval(this.intervalID);
      }, this.props.countDown*1000); 
      this.intervalID = setInterval(() => {
        this.setState({countDown: this.state.countDown - 1});
        console.log(this.state.countDown);
      }, 1000);
    }, 3000)  

  }

  render() {
    return (
      <div>
        Number of random tiles: {this.props.randomCellCount}
        <br/>
        Timer: {this.state.countDown}
        {this.grid.map((cols, i) => {
          return (
            <Row key={i}>
              {cols.map(col => 
                <Cell key={col} id={col} 
                recordGuess={this.recordGuess.bind(this)}
                {...this.state}
                randomCellIds={this.randomCellIds} /> 
              )}
            </Row>
          );
        })}
        <button onClick={this.restart.bind(this)}>Restart</button>
      </div>
    );
  }
}

export default Game; 