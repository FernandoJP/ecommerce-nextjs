import Head from "next/head"
import { useContext } from "react"
import { DataContext } from "../store/GlobalState"

const Cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  if(cart.length === 0) 
    return <img className="img-responsible w-100" src="/img/empty_cart.png" />

    return (
      <div>
        <Head>Cart page</Head>

        <h1>Cart</h1>
      </div>
    )
  }
  
  export default Cart