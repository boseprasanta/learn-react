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
      /* 
        After each change in square. As boards's status will be reset the 
        board will rerender, so will all the squares
      */
    //  const winner = calculateWinner(this.state.squares)
    //  const status = winner === null ? `Next player: ${this.state.xIsNext === true ? "X":"O"}` : `${winner} is the winner`
  
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
    render() {
      const history = this.state.history.slice()
      const block = history[history.length - 1]
      return (
        <div className="game">
          <div className="game-board">
            <Board squares= {block.squares} onClick = {this.handleClick} />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  