function Rack({tiles, onPlay}: {tiles: string; onPlay: () => void}) {
    return (
        <section class="rack">
            <p class="rack-tiles">{tiles}</p>
            <button class="button" onClick={onPlay}>Play!</button>
        </section>
    )
}

export default Rack;