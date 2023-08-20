
function OrderItem({item}) {
    return (
        <>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.total}</td>
        </>
    )
}

export default OrderItem