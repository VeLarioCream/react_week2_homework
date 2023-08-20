import { useEffect, useState } from 'react'
import Menu from './components/MenuItem'
import CartItem from './components/CartItem'
import OrderItem from './components/OrderItem'
import MenuItem from './components/MenuItem'


function Pos() {
    const data = [
        {
            "id": 1,
            "name": "珍珠奶茶",
            "description": "香濃奶茶搭配QQ珍珠",
            "price": 50
        },
        {
            "id": 2,
            "name": "冬瓜檸檬",
            "description": "清新冬瓜配上新鮮檸檬",
            "price": 45
        },
        {
            "id": 3,
            "name": "翡翠檸檬",
            "description": "綠茶與檸檬的完美結合",
            "price": 55
        },
        {
            "id": 4,
            "name": "四季春茶",
            "description": "香醇四季春茶，回甘無比",
            "price": 45
        },
        {
            "id": 5,
            "name": "阿薩姆奶茶",
            "description": "阿薩姆紅茶搭配香醇鮮奶",
            "price": 50
        },
        {
            "id": 6,
            "name": "檸檬冰茶",
            "description": "檸檬與冰茶的清新組合",
            "price": 45
        },
        {
            "id": 7,
            "name": "芒果綠茶",
            "description": "芒果與綠茶的獨特風味",
            "price": 55
        },
        {
            "id": 8,
            "name": "抹茶拿鐵",
            "description": "抹茶與鮮奶的絕配",
            "price": 60
        }
    ]


    const [drinks, setDrinks] = useState(data)
    const [shopCar, setShopCar] = useState([])
    const [grandTotal, setGrandTotal] = useState(0)
    const [orderList, setOrderList] = useState([])
    const [memo, setMemo] = useState('')
    const [orderMemo, setOrderMemo] = useState('')
    const [orderGrandTotal, setOrderGrandTotal] = useState(0)


    function addToCar(drink) {
        const existingItem = shopCar.find(item => item.id === drink.id)

        if(existingItem) {
            const updateCarlist = shopCar.map(item => {
                return item.id === drink.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    total: (item.quantity + 1) * item.price
                  }
                : item
            })
            setShopCar(updateCarlist)
            console.log(JSON.stringify(updateCarlist, null, 2));
        }
        else {
            const updateCarlist = [
                ...shopCar,{
                    ...drink,
                    quantity: 1,
                    total: drink.price
                }
            ]
            setShopCar(updateCarlist)
            console.log(JSON.stringify(updateCarlist, null, 2));
        }
        
    }

    function updateCar(drink) {
        //點選減量按鈕
        const updateCarlist = shopCar.map(item => {
            return item.id === drink.id 
                ? item.quantity === 1 
                    ? null 
                    : {
                        ...item,
                        quantity: item.quantity - 1,
                        total: (item.quantity - 1) * item.price
                    }
                : item
        })
        const filterCarList = updateCarlist.filter(item => item !== null)
        setShopCar(filterCarList)
        console.log(JSON.stringify(filterCarList, null, 2));
    }

    function removeCar(drink) {
        //移除該品項
        const updateCarlist = shopCar.filter((newdrink) => {
            return newdrink.id !== drink.id
        })
        setShopCar(updateCarlist)
        console.log(JSON.stringify(updateCarlist, null, 2));
    }

    function updateQty(drink, value) {
        //下拉選單更新數量
        const updateCarlist = shopCar.map(item => {
            return item.id === drink.id 
                ? {
                    ...item,
                    quantity: parseInt(value),
                    total: parseInt(value) * item.price
                }
                : item
        })
        setShopCar(updateCarlist)
        console.log(JSON.stringify(updateCarlist, null, 2));
    }

    function allClear() {
        setShopCar([])
        setMemo('')
    }

    function createOrder() {
        setOrderList([...shopCar])
        setOrderMemo(memo)
        setOrderGrandTotal(grandTotal)
        allClear()
        console.log(JSON.stringify(orderList, null, 2));
    }

    useEffect(() => {
        //金額加總
        setGrandTotal(
            shopCar.reduce((pre, curr) => pre + curr.total, 0)
        )
    }, [shopCar])

    

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="list-group">
                            {
                                drinks.map((drink) => {
                                    return (
                                        <a href="#" className="list-group-item list-group-item-action"  key ={drink.id} onClick={(e) => {
                                            e.preventDefault()
                                            addToCar(drink)
                                        }}>
                                            <MenuItem drink={drink}></MenuItem>
                                        </a>
                                )})
                            }                            
                        </div>
                    </div>
                    <div className="col-md-8">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" width="50">刪除</th>
                                    <th scope="col" width="50">減量</th>
                                    <th scope="col">品項</th>
                                    <th scope="col">描述</th>
                                    <th scope="col" width="90">數量</th>
                                    <th scope="col">單價</th>
                                    <th scope="col">小計</th>
                                </tr>
                            </thead>
                              <tbody>
                                {
                                    shopCar.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <CartItem item={item} removeCar={removeCar} updateCar={updateCar} updateQty={updateQty}></CartItem>
                                            </tr>
                                        )
                                    })
                                }                                
                            </tbody>
                        </table>

                        {
                            shopCar.length ===0 ? <div className="alert alert-primary text-center" role="alert">請選擇商品</div> 
                            : (<>                                
                                    <div className="text-end mb-3">
                                        <h5>總計: <span>{grandTotal}</span></h5>
                                    </div>
                                    <textarea
                                        className="form-control mb-3"
                                        rows="3"
                                        placeholder="備註"
                                        value={memo}
                                        onChange={(e) => {
                                            setMemo(e.target.value)
                                        }}
                                    ></textarea>
                                    <div className="text-end">
                                        <button className="btn btn-primary" onClick={() => allClear()}>清空</button>
                                        <button className="btn btn-primary" onClick={() => createOrder()}>送出</button>
                                    </div>
                                </>)                           

                        }
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-8">
                        {
                            orderList.length === 0 ? <div className="alert alert-secondary text-center" role="alert">尚未建立訂單</div>
                            : (<>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <h5>訂單</h5>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">品項</th>
                                                        <th scope="col">數量</th>
                                                        <th scope="col">小計</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        orderList.map((item) => {
                                                            return(
                                                                <tr key={item.id}>
                                                                    <OrderItem item={item}></OrderItem>
                                                                </tr>
                                                            )
                                                        })
                                                    }                                            
                                                </tbody>
                                            </table>
                                            <div className="text-end">備註: <span>{orderMemo}</span></div>
                                            <div className="text-end">
                                                <h5>總計: <span>{orderGrandTotal}</span></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>                            
                            </>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Pos