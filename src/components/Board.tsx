import PlacedWord from "./PlacedWord";
import AddedWord from "./AddedWord";

interface BoardProps  {
    placedWord?: string,
    addedWord?: string,
    points?: number,
}

function Board({placedWord, addedWord, points} : BoardProps) {
	return (
		<section className="board">
            <PlacedWord word={placedWord || ''}/>
            <AddedWord word={addedWord || ''} points={points}/>
        </section>
	);
}

export default Board;