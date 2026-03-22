import { useEffect, useState } from 'preact/hooks';
interface lettersObject {
    [key: string]: {
        points: number,
        count: number
    }
}

function ScrabbleTile({ letter, letterData }: { letter: string, letterData: lettersObject }) {
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