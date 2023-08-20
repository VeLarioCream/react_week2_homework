
function MenuItem({drink}) {
    return (
        <>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{drink.name}</h5>
                <small>{drink.price}</small>
            </div>
            <p className="mb-1">{drink.description}</p>
        </>
    )
}

export default MenuItem