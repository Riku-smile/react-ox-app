import React from 'react'
import { ISquare } from './Type';
import './Square.scss';

type SquareProps = {
    value: ISquare;
    onClick:()=> void;
}

const Square:React.FC<SquareProps> =(props)=> {
    return (
        <button className="square" onClick={props.onClick}>
            <span>{props.value}</span>
        </button>
    )
}

export default Square;
