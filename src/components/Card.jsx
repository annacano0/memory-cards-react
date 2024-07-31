export default function Card({ cardData, handleCardReveal, isCovered}) {

    function handleClickCard() {
        if(isCovered){
            handleCardReveal(cardData)
        } 
    }

    function getCellContent(cardNumber){
        return ( <img
            src={`/memory_img/${cardNumber}.jpg`}
            alt={cardNumber}
          />)
    }

    return (
        <>
            <div onClick={handleClickCard} 
            className={`board-card ${(isCovered) ? 'unflipped' : 'flipped'}`} 
            data-testid={`board-card${cardData.y + 1}-${cardData.x + 1}`} >
             {!isCovered && getCellContent(cardData.cardNumber)}
            </div>
        </>
    )
}