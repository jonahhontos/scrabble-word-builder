import TileGroup from "./TileGroup";

function Rack({tiles, notFound, onPlay}: {tiles: string; notFound: boolean; onPlay: () => void}) {
    return (
        <section className="rack">
            <TileGroup tiles={tiles} />
            <button className="button" onClick={onPlay}>PLAY</button>
            <span className={'error not-found' + (notFound ? ' visible' : '')}>No valid words found.</span>
        </section>
    )
}

export default Rack;