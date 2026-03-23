import TileGroup from "./TileGroup";

interface RackProps {
    tiles: string,
    notFound: boolean,
    onPlay: () => void,
    disablePlay: boolean
}

function Rack({tiles, notFound, onPlay, disablePlay}: RackProps) {
    return (
        <section className="rack">
            <TileGroup tiles={tiles} />
            <button className={'button' + (disablePlay ? ' disabled' : '')} disabled={disablePlay} onClick={onPlay}>PLAY</button>
            <span className={'error not-found' + (notFound ? ' visible' : '')}>No valid words found.</span>
        </section>
    )
}

export default Rack;