import TileGroup from "./TileGroup";

function Rack({tiles, onPlay}: {tiles: string; onPlay: () => void}) {
    return (
        <section className="rack">
            <TileGroup tiles={tiles} />
            <button className="button" onClick={onPlay}>PLAY</button>
        </section>
    )
}

export default Rack;