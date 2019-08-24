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
      return (
        <button className="square" onClick= {()=>{ this.props.onClick() }}>
          {this.props.value}
        </button>
      );
  }
  class Board extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        // squares: Array(9).fill(null)
        squares: [
          "O","X",null,
          null,"O",null,
          null,"O","O",
        ]
      }
    }

    handleClick(i) {
      let temp = this.state.squares
      temp[i] = "X"
      this.setState({
        squares: temp
      })
    }
    renderSquare(i) {
      return <Square value= {this.state.squares[i]} onClick = { () => { this.handleClick(i) } } />;
    }
  
    render() {
      const status = 'Next player: X';
  
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
  