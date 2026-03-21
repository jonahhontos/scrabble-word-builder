function Points({points}: {points: number}) {
    return (
        <div className="points">
            <h5>Points:</h5>
            <p>{ points || 0 }</p>
        </div>
    )
}

export default Points;