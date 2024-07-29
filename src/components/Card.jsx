import {useEffect} from 'react'
export default function Card({ cardData, isMatched, handleCardReveal, isCovered}) {

    useEffect(() => {
        function hola() {
           console.log("update de isCovered ")
        }
        hola();
    }, [isCovered]);

    function handleClickCard() {
        if(!isMatched&&isCovered){
            handleCardReveal(cardData)
        } 
    }

    return (
        <>
            <button onClick={handleClickCard} 
            className={`board-card ${(isCovered) ? 'unflipped' : 'flipped'}`} 
            data-testid={`board-card${cardData.y + 1}-${cardData.x + 1}`} >{!isCovered && cardData.cardNumber}</button>
        </>
    )
}