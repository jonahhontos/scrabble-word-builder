import letterData from '../assets/letter_data.json';

function ScrabbleTile({ letter }: { letter: string }) {
    const points = letterData[letter]?.points || 0;
    return (
        <div className="scrabble-tile">
            <span className="letter">{letter}</span>
            <span className="points">{points}</span>
        </div>
    )
}

export default ScrabbleTile;