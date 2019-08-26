import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   /*
//      If a component doesn't need to have a state for itself
//      counstructor can be removed
//   */ 
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     value: null // react doesn't support setState in here
//   //   }
//   // }
//     render() {
//       return (
//         <button className="square" onClick= {()=>{ this.props.onClick() }}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }

  // functional component: Square
  function Square(props) {
    console.log("square")
      return (
        <button className="square" onClick= {()=>{ props.onClick() }}>
          {props.value}
        </button>
      );
  }
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value= {this.props.squares[i]} onClick = { () => { this.props.onClick(i) } } />;
    }

    render() {
      return (
        <div>
          <div className="status">{}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        xIsNext: true
      }
    }
    handleClick = (i) => {
      const history = this.state.history
      const current = history[history.length - 1]
      const squares = current.squares.slice()
      if(calculateWinner(squares) || squares[i]) {
        return
      }
      squares[i] = this.state.xIsNext === true ? "X" : "O"
      this.setState({
        history: history.concat([ // concat returns a new array
          {
            squares
          }
        ]),
        xIsNext: !this.state.xIsNext
      })
    }

    jumpTo = (step) => {
      const history = this.state.history
      const current = history.slice(0, step+1)
      this.setState({
        history: current,
        xIsNext: current.length % 2 === 1
      })
    }
    render() {
      const history = this.state.history.slice()
      const current = history[history.length - 1]
      const winner = calculateWinner(current.squares)
      const status = winner === null ? `Next player: ${this.state.xIsNext === true ? "X":"O"}` : `${winner} is the winner`
      const moves = history.map((step, move) => {
          const desc = move ? // move only as, js considers 0 as false
            'Go to move #' + move :
            'Go to game start';
          return (
            <li>
              <button key={move} onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });
      return (
        <div className="game">
          <div className="game-board">
            <Board squares= {current.squares} onClick = {this.handleClick} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  