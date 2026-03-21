function Rack({tiles, onPlay}: {tiles: string; onPlay: () => void}) {
    return (
        <section className="rack">
            <p className="rack-tiles">{tiles}</p>
            <button className="button" onClick={onPlay}>Play!</button>
        </section>
    )
}

export default Rack;