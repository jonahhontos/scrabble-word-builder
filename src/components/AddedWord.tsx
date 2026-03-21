import TileGroup from "./TileGroup";

function AddedWord({word}: {word: string}) {
    const split = word.split(' ');
    const wordTiles = split[0] || ''; // Unfortunately have to do it this way due to a rendering quirk in Preact
    const points = split.length > 1 ? split[1] : '--'; // Same as above, but for points

    return (
        <div className={'added-word' + (word ? '' : ' inactive')}>
            <p>Highest Scorer:</p>
            <TileGroup tiles={wordTiles} />
            <p>Points: {points}</p>
        </div>
    )
}

export default AddedWord;