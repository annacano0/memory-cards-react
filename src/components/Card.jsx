export default function Card({ cardData, isMatched, handleCardReveal, isCovered}) {

    function handleClickCard() {
        if(!isMatched&&isCovered){
            handleCardReveal(cardData)
        } 
    }

    return (
        <>
            <div onClick={handleClickCard} 
            className={`board-card ${(isCovered) ? 'unflipped' : 'flipped'}`} 
            data-testid={`board-card${cardData.y + 1}-${cardData.x + 1}`} >{!isCovered && cardData.cardNumber}</div>
        </>
    )
}