import React,{useState} from 'react';
import Board from './Board';
import {ISquare, History} from './Type'
import './Game.scss'

const Game:React.FC = ()=> {
    const [history,setHistory] = useState<History[]>([{squares:Array(9).fill(null)}]);
    const [stepNumber,setStepNumber] = useState<number>(0);
    const [isNext, setIsNext] = useState<boolean>(true);

    const handleClick = (i:number)=> {
        const _history = history.slice(0, stepNumber + 1);
        const current = _history[_history.length -1 ];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = isNext? "O" : "X" ;
        setHistory(_history.concat([{ squares:squares }]));
        setStepNumber(_history.length);
        setIsNext(!isNext);
    }

    const jumpTo = (step:number)=> {
        setStepNumber(step);
        setIsNext(step % 2 === 0);
    }

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step,move)=> {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
            <li className="game--move" key={move}>
                <button className="game--btn" onClick={()=>{jumpTo(move)}}>{desc}</button>
            </li>
        );
    });

    let status;
    if(winner) {
        status = winner + " is Win!";
    } else {
        status = (isNext ? 'X':'O') + " is Next turn"
    }

    return (
        <div className="game">
            <div className="game--board">
               <Board squares={current.squares} onClick={(i:number)=> {handleClick(i)}} />
            </div>
            <div className="game--state">
                <div className="game--status">
                    {status}
                </div>
                <ol className="game--moves">
                    {moves}
                </ol>
            </div>
        </div>
    );
}

function calculateWinner (squares:Array<ISquare>) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i:number　= 0; i < lines.length; i++) {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;