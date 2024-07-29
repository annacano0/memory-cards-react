'use client'
import { useEffect, useState } from "react";
import { createNewBoardFromMockData, createNewBoard } from '../utils/boardHelper.js';
import Card from "./Card.jsx";

export default function Board({ rows=3, columns=4, mockData }) {
    const [board, setBoard] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [cardsToFlipAgain, setCardsToFlipAgain] = useState([]);
    const [currentCardPair, setCurrentCardPair] = useState([]);

    useEffect(() => {
        function getNewBoard() {
            let newBoard;
            if (mockData) {
                setMatchedCards([]);
                setCardsToFlipAgain([]);
                setCurrentCardPair([]);
                newBoard = createNewBoardFromMockData(mockData);
            } else {
                newBoard = createNewBoard(rows, columns);
            }
            setBoard(newBoard);
        }
        getNewBoard();
    }, [mockData]);

    function handleCardReveal(cardData) {
        if (currentCardPair.length === 0) {
            setCurrentCardPair([cardData]);
        } else if (currentCardPair.length === 1) {
            setCurrentCardPair([...currentCardPair, cardData]);
            if (!isCardMatch([...currentCardPair, cardData])) {
                clearCurrentCardPair([]);
            } else {
                setMatchedCards([...matchedCards, cardData.cardNumber]);
                setCurrentCardPair([]);
            }
        }
    }

    function clearCurrentCardPair() {
        setTimeout(() => {
            setCardsToFlipAgain([]);
            setCurrentCardPair([]);
        }, 2000);
    }

    function isCardMatch(cards) {
        let match = false
        if(cards[0].cardNumber===cards[1].cardNumber) match=true
        return  match;
    }

    function isCellCovered(card) {
        let isCellCovered=true
        if( matchedCards.includes(card.cardNumber) || cardsToFlipAgain.includes(card) || currentCardPair.includes(card)){
            isCellCovered=false
        }
        return isCellCovered
        
    }

    return (
        <>
            <div className="board" data-testid='board'>
                {board.map((row, rowIndex) => (
                    <div className='board-row' data-testid='board-row' key={rowIndex}>
                        {row.map((card, cellIndex) => (
                            <Card
                                key={cellIndex}
                                cardData={card}
                                isMatched={matchedCards.includes(card.cardNumber)}
                                handleCardReveal={handleCardReveal}
                                isCovered={isCellCovered(card)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
