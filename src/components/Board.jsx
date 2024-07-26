'use client'
import { useEffect, useState } from "react";
import { createNewBoardFromMockData, createNewBoard } from '../utils/boardHelper.js';
import Card from "./Card.jsx";

export default function Board({ rows=3, columns=4, mockData }) {
    const [board, setBoard] = useState([])

    useEffect(() => {
        function getNewBoard() {
            let newBoard
            if (mockData) {
                newBoard = createNewBoardFromMockData(mockData)
            } else {
                newBoard = createNewBoard(rows, columns)
            }
            setBoard(newBoard);
        }
        getNewBoard();
    }, [mockData]);


    return (
        <>
            <div className="board" data-testid='board'>
                {board.map((row, rowIndex) => (
                    <div className='board-row' data-testid='board-row' key={rowIndex}>
                        {row.map((card, cellIndex) => (
                            <Card key={cellIndex} rowIndex={rowIndex} columnIndex={cellIndex} cardNumber={card.cardNumber}></Card>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )

}