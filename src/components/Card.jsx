import {useState } from "react";

export default function Card({rowIndex, columnIndex, cardNumber}) {
    const [isCovered, setIsCovered] = useState(true)

    function handleClickCard() {
        setIsCovered(false)
    }


    return (
        <>
            <button onClick={handleClickCard} className={`board-card ${isCovered ? 'unflipped' : 'flipped'}`} data-testid={`board-card${rowIndex + 1}-${columnIndex + 1}`} >{cardNumber}</button>
        </>
    )
}