import { render } from 'preact';
import { useState, useRef } from 'preact/hooks';

import { validatePlacedWord, validateRackTiles, calculateHighestScoringWord } from './js/gameLogic';
import Board from './components/Board';
import Rack from './components/Rack';
import Input from './components/Input';

import './style.css';

export function App() {
	const [placedWord, setPlacedWord] = useState('');
	const [placedWordError, setPlacedWordError] = useState('');
	const [addedWord, setAddedWord] = useState('');
	const [points, setPoints] = useState(0);
	const [tiles, setTiles] = useState('');
	const [tilesError, setTilesError] = useState('');

	let placedWordDebounce : ReturnType<typeof setTimeout> | null = null;
	let rackDebounce : ReturnType<typeof setTimeout> | null = null;

	function placeWord(word: string) {
		placedWordDebounce && clearTimeout(placedWordDebounce);
		setPlacedWordError('');

		placedWordDebounce = setTimeout(() => {
			if (word !== '') {
				const result = validatePlacedWord(word.trim().toUpperCase(), tiles.toUpperCase());
				if (!result.valid) {
					setPlacedWordError(result.error || 'Invalid word!');
					return;
				}

				setPlacedWord(word.trim().toUpperCase());
			}
		}, 500);
	}

	function validateTiles(tiles: string) {
		const result = validateRackTiles(tiles.trim().toUpperCase(), placedWord.trim().toUpperCase());

		if (!result.valid) {
			setTilesError(result.error || 'Invalid tiles!');
			return;	
		}
		
		setTiles(tiles.toUpperCase());
		setTilesError('');
	}

	function calculate() {
		const highestScoringWord = calculateHighestScoringWord(tiles, placedWord);
		if (highestScoringWord) {
			setAddedWord(highestScoringWord.word);
			setPoints(highestScoringWord.points);
		} else {
			setAddedWord('');
			setPoints(0);
		}
	}

	return (
		<div>
			<Board placedWord={placedWord} addedWord={addedWord} points={points}/>

			<Rack tiles={tiles} onPlay={calculate}/>
			<section class="inputs">
				<Input label="Rack Tiles" value={tiles} error={tilesError} onChange={validateTiles} maxLength={7}/>
				<Input label="Placed Word" value={placedWord} error={placedWordError} onChange={placeWord} maxLength={15}/>
			</section>

		</div>
	);
}

render(<App />, document.getElementById('app'));
