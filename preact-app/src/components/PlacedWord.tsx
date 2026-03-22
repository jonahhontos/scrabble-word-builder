import TileGroup from "./TileGroup";

function PlacedWord({word}: {word: string}) {
    return (
        <div className={'placed-word' + (word ? '' : ' inactive')}>
            <p>Placed Word:</p>
            <TileGroup tiles={word} />
        </div>
    )
}

export default PlacedWord;