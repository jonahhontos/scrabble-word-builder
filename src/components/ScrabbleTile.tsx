import letterData from '../assets/letter_data.json'
import { useEffect, useLayoutEffect, useState } from 'preact/hooks';

function ScrabbleTile({ letter }: { letter: string }) {
    const points = letterData[letter]?.points || 0;
    const [transitioning, setTransitioning] = useState(true);

    useEffect(() => {
        setTransitioning(false);
    }, []);
    return (
        <div className={'scrabble-tile' + (transitioning ? ' transitioning' : '')}>
            <span className="letter">{letter}</span>
            <span className="points">{points}</span>
        </div>
    )
}

export default ScrabbleTile;