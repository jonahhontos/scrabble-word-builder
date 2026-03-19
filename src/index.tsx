import { render } from 'preact';
import { useState } from 'preact/hooks';

import { init, validatePlacedWord } from './js/gameLogic';
import Board from './components/Board';
import Rack from './components/Rack';
import Input from './components/Input';

import './style.css';

export function App() {
	const [placedWord, setPlacedWord] = useState('placed');
	const [placedWordError, setPlacedWordError] = useState('error');
	const [addedWord, setAddedWord] = useState('added');
	const [points, setPoints] = useState(999);
	const [tiles, setTiles] = useState('abcdefg');
	const [tilesError, setTilesError] = useState('error');

	function placeWord(word: string) {
		const result = validatePlacedWord(word);
		if (!result.valid) {
			setPlacedWordError(result.error || 'Invalid word!');
			return;
		}

		setPlacedWordError('');
		setPlacedWord(word);
	}

	function validateTiles(word: string) {
		if (word.length < 1 || word.length > 7) {
			setTilesError('Must be between 1 and 7 characters!');
		} else {
			setTiles(word);
			setTilesError('');
		}

	}

	return (
		<div>
			<Board placedWord={placedWord} addedWord={addedWord} points={points}/>
			<Rack tiles={tiles}/>
			<section class="inputs">
				<Input label="Rack Tiles" value={tiles} error={tilesError} onChange={validateTiles}/>
				<Input label="Placed Word" value={placedWord} error={placedWordError} onChange={placeWord}/>
			</section>

		</div>
	);
}

render(<App />, document.getElementById('app'));
