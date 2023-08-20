
function CartItem({item, removeCar, updateCar, updateQty}) {
    return (
        <>
            <td><button type="button" className="btn btn-sm" onClick={(e) => {
                e.preventDefault
                removeCar(item)
            }}>【X】</button></td>
            <td><button type="button" className="btn btn-sm" onClick={(e) => {
                e.preventDefault
                updateCar(item)
            }}>▼</button></td>
            <td>{item.name}</td>
            <td><small>{item.description}</small></td>
            <td>
                <select className="form-select" value={item.quantity} onChange={(e) => {
                    const value = e.target.value
                    updateQty(item, value)
                }} >
                    {
                        [...Array(20).keys()].map((item) => {
                            return (<option value={item + 1} key={item + 1}>{item + 1}</option>)
                        })
                    }

                </select>
            </td>
            <td>{item.price}</td>
            <td>{item.total}</td>
        </>
    )
}

export default CartItem