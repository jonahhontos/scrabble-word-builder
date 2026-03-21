import PlacedWord from "./PlacedWord";
import AddedWord from "./AddedWord";

interface BoardProps  {
    placedWord?: string,
    addedWord?: string,
}

function Board({placedWord, addedWord} : BoardProps) {
	return (
		<section className="board">
            <PlacedWord word={placedWord || ''}/>
            <AddedWord word={addedWord || ''}/>
        </section>
	);
}

export default Board;