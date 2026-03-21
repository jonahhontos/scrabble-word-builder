import ScrabbleTile from "./ScrabbleTile";

function TileGroup({ tiles }: { tiles: string }) {
    return (
        <div className="tile-group">
            {tiles.split('').map((letter, index) => (
                <ScrabbleTile key={index} letter={letter} />
            ))}
        </div>
    )
};

export default TileGroup;