'use client'
import { useEffect, useState } from "react";
import { getBoard } from '../utils/boardHelper.js';
import Card from "./Card.jsx";

export default function Board({ rows = 3, columns = 4, mockData, waitingTime = 1000 }) {
    const [board, setBoard] = useState([]);
    const [uncoveredCards, setUncoveredCards] = useState([]);
    const [currentCardPair, setCurrentCardPair] = useState([]);

    useEffect(() => {
        setBoard(getBoard(mockData, rows, columns))
        if (mockData) {
            setUncoveredCards([]);
            setCurrentCardPair([]);
        }
    }, [mockData]);

    function handleCardReveal(cardData) {
        const isFirstCard = currentCardPair.length===0;
        const isSecondCard = currentCardPair.length===1
        if (isFirstCard) {
            setCurrentCardPair([cardData]);
            setUncoveredCards([...uncoveredCards, cardData]);
        } else if (isSecondCard) {
            setCurrentCardPair([...currentCardPair, cardData]);
            setUncoveredCards([...uncoveredCards, cardData]);
            if (!isCardMatch([...currentCardPair, cardData])) {
                clearCurrentCardPair();
            }
            setCurrentCardPair([]);
        }
    }

    function clearCurrentCardPair() {
        setTimeout(() => {
            let removedLastTwoCards = uncoveredCards.slice(0, -1); //TODO: create a scenario for this (it cant be -2 but test dont contemplate it)
            setUncoveredCards(removedLastTwoCards);
        }, waitingTime);
    }

    function isCardMatch(cards) {
        return (cards[0].cardNumber === cards[1].cardNumber)
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
