import PlacedWord from "./PlacedWord";
import AddedWord from "./AddedWord";

interface BoardProps  {
    placedWord?: string,
    addedWord?: string,
    points?: number,
}

function Board({placedWord, addedWord, points} : BoardProps) {
	return (
		<section class="board">
            <PlacedWord word={placedWord || ''}/>
            <AddedWord word={addedWord || ''}/>

            <div class="points">
                <h5>Points:</h5>
                <p>{points}</p>
            </div>
        </section>
	);
}

export default Board;