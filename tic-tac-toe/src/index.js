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
    constructor(props) {
      super(props)
      this.state = {
        // squares: Array(9).fill(null)
        squares: [
          null,null,null,
          null,null,null,
          null,null,null,
        ],
        xIsNext: true
      }
    }

    handleClick(i) {
      const winner = calculateWinner(this.state.squares)
      if(winner || this.state.squares[i]) {
        return
      }
      const squares = this.state.squares.slice() // slice() will create a new copy | refer to example in blue pad
      squares[i] = this.state.xIsNext === true ? "X" : "O"
      this.setState({
        squares,
        xIsNext: !(this.state.xIsNext)
      })
    }
    renderSquare(i) {
      return <Square value= {this.state.squares[i]} onClick = { () => { this.handleClick(i) } } />;
    }
  
    render() {
      /* 
        After each change in square. As boards's status will be reset the 
        board will rerender, so will all the squares
      */
     const winner = calculateWinner(this.state.squares)
     const status = winner === null ? `Next player: ${this.state.xIsNext === true ? "X":"O"}` : `${winner} is the winner`
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
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
  