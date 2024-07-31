'use client'
import { useEffect, useState } from "react";
import { createNewBoardFromMockData, createNewBoard } from '../utils/boardHelper.js';
import Card from "./Card.jsx";

export default function Board({ rows = 3, columns = 4, mockData, waitingTime = 1000 }) {
    const [board, setBoard] = useState([]);
    const [uncoveredCards, setUncoveredCards] = useState([]);
    const [currentCardPair, setCurrentCardPair] = useState([]);

    useEffect(() => {
        let newBoard;
        if (mockData) {
            setUncoveredCards([]);
            setCurrentCardPair([]);
            newBoard = createNewBoardFromMockData(mockData);
        } else {
            newBoard = createNewBoard(rows, columns);
        }
        setBoard(newBoard);
    }, [mockData]);

    function handleCardReveal(cardData) {
        if (currentCardPair.length === 0) {
            setCurrentCardPair([cardData]);
            setUncoveredCards([...uncoveredCards, cardData]);
        } else if (currentCardPair.length === 1) {
            setCurrentCardPair([...currentCardPair, cardData]);
            setUncoveredCards([...uncoveredCards, cardData]);
            if (!isCardMatch([...currentCardPair, cardData])) {
                clearCurrentCardPair();
            } else {
                setUncoveredCards([...uncoveredCards, cardData]);
                setCurrentCardPair([]);
            }
        }
    }

    function clearCurrentCardPair() {
        setTimeout(() => {
            let removedLastTwoCards = uncoveredCards.slice(0, -2);
            setUncoveredCards(removedLastTwoCards);
            setCurrentCardPair([]);
        }, waitingTime);
    }

    function isCardMatch(cards) {
        let match = false;
        if (cards[0].cardNumber === cards[1].cardNumber) match = true;
        if (match) console.log("It's a match");
        return match;
    }

    function isCellCovered(card) { 
        return !uncoveredCards.some(uncoveredCard => //checks if an object in uncoveredCards has the same properties as the card param.
            uncoveredCard.y === card.y &&
            uncoveredCard.x === card.x &&
            uncoveredCard.cardNumber === card.cardNumber
        );
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
