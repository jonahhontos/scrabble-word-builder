import ScrabbleTile from "./ScrabbleTile";
import letterData from '../assets/letter_data.json';

function TileGroup({ tiles }: { tiles: string }) {
    return (
        <div className="tile-group">
            {tiles.split('').map((letter, index) => (
                <ScrabbleTile key={index} letter={letter} letterData={letterData} />
            ))}
        </div>
    )
};

export default TileGroup;