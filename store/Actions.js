export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_CART: 'ADD_CART',
    ADD_MODAL: 'ADD_MODAL'
}

export const addToCart = (product, cart) => {
    console.log('addToCart', product, cart);
    if(product.inStock === 0)
        return ({type: 'NOTIFY', payload: {error: 'This product is out of stock.'}})

    const check = cart.every(item => {
        return item._id !== product._id
    })

    if(!check) return ({type: 'NOTIFY', payload: {error: 'The product has been added to cart.'}})

    return ({ type: 'ADD_CART', payload: [...cart, {...product, quantity: 1}] })
}

export const removeFromCart = (product, cart) => {
    console.log('removeFromCart', product, cart);
    const filteredCart = cart.filter(item => {
        return item._id !== product._id
    })
    return ({ type: 'ADD_CART', payload: filteredCart })
}

export const changeProductCartQuantity = (product, cart, quantity) => {
    console.log('changeProductCartQuantity', product, cart, quantity)
    const productCart = cart.map(item => {
        if(item._id !== product._id) return item
        return {...item, quantity}
    })
    console.log(productCart)
    return ({ type: 'ADD_CART', payload: productCart })
}

export const deleteItem = (item, id, type) => {
    const newData = item.filter(item => item._id !== id)
    return ({ 
        type, payload:newData
    })
}