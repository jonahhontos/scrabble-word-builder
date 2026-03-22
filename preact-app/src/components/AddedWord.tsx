import TileGroup from "./TileGroup";

function AddedWord({word, points}: {word: string, points: number | string}) {
    return (
        <div className={'added-word' + (word ? '' : ' inactive')}>
            <p>Highest Scorer:</p>
            <TileGroup tiles={word} />
            <p>Points: {points || '--'}</p>
        </div>
    )
}

export default AddedWord;