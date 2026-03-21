import ScrabbleTile from "./ScrabbleTile";

function Rack({tiles, onPlay}: {tiles: string; onPlay: () => void}) {
    return (
        <section className="rack">
            <div className="rack-tiles tile-group">
                {tiles.split('').map((letter, index) => (
                    <ScrabbleTile key={index} letter={letter} />
                ))}
            </div>
            <button className="button" onClick={onPlay}>PLAY</button>
        </section>
    )
}

export default Rack;