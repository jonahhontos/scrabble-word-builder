import { render } from 'preact';
import { useState, useRef } from 'preact/hooks';

import { validatePlacedWord, validateRackTiles, calculateHighestScoringWord } from './js/gameLogic';
import Board from './components/Board';
import Rack from './components/Rack';
import Input from './components/Input';

import './style.css';

export function App() {
	const [placedWord, setPlacedWord] = useState({ word: '', error: '', showError: false });
	const [addedWord, setAddedWord] = useState('');
	const [rack, setRack] = useState({ tiles: '', error: '', showError: false });

	const rackRef = useRef('');
	const placedRef = useRef('');
	const placedWordDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
	const rackDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

	function placeWord(word: string) {
		placedWordDebounce.current && clearTimeout(placedWordDebounce.current);
		placedWordDebounce.current = setTimeout(() => {
			if (word !== '') {
				const result = validatePlacedWord(word.trim().toUpperCase(), rack.tiles);
				if (!result.valid) {
					setPlacedWord({ ...placedWord, error: result.error || 'Invalid word!', showError: true });
					return;
				}

				placedRef.current = word.trim().toUpperCase();
				setPlacedWord({ ...placedWord, word: word.trim().toUpperCase(), showError: false });
			} else {
				placedRef.current = '';
				setPlacedWord({ ...placedWord, word: '', showError: false }); // Clear word and error when input is cleared
			}
		}, 100);
	}

	function validateTiles(tiles: string) {
		rackDebounce.current && clearTimeout(rackDebounce.current);

		rackDebounce.current = setTimeout(() => {
			const result = validateRackTiles(tiles.trim().toUpperCase(), placedWord.word);

			if (!result.valid) {
				setRack({ ...rack, error: result.error || 'Invalid tiles!', showError: true });
				return;	
			}
			
			rackRef.current = tiles.trim().toUpperCase();
			setRack({...rack, tiles: tiles.trim().toUpperCase(), showError: false });
		}, 100);
	}

	function calculate() {
		const highestScoringWord = calculateHighestScoringWord(rackRef.current, placedRef.current);
		if (highestScoringWord) {
			setAddedWord(highestScoringWord.word + ' ' + highestScoringWord.points); // Have to send both at once to get around Preact's batching of state updates
		} else {
			setAddedWord('');
		}
	}

	return (
		<div>
			<Board placedWord={placedWord.word} addedWord={addedWord}/>

			<Rack tiles={rack.tiles} onPlay={calculate}/>
			<section className="inputs">
				<Input label="Rack Tiles" error={rack.error} showError={rack.showError} onChange={validateTiles} maxLength={7}/>
				<Input label="Placed Word" error={placedWord.error} showError={placedWord.showError} onChange={placeWord} maxLength={15}/>
			</section>

		</div>
	);
}

render(<App />, document.getElementById('app'));
