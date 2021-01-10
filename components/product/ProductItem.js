import Link from 'next/link'
import { useContext } from 'react';
import { addToCart } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';

const ProductItem = ({product}) => {
    console.log('ProductItem ',product);

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const userLink = () => {
        return (
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-info mr-1" style={{marginRight: 5, flex: 1}}>View</a>
                </Link>
                <button className="btn btn-success mr-1" style={{marginLeft: 5, flex: 1}}
                disabled={product.inStock === 0}
                onClick={() => dispatch(addToCart(product, cart))}>
                    Buy
                </button>
            </>
        )
    }

    return (
        <div className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src={product.images[0].url} alt={product.images[0].url} />
            <div className="card-body">
                <h2 className="card-title text-capitalize" title={product.title}>
                    {product.title}
                </h2>
                <div className="row justify-content-between mx-0">
                    <h3 className="text-danger">${product.price}</h3>
                    {
                        product.inStock > 0
                        ? <h4 className="text-danger">In stock: ${product.inStock}</h4>
                        : <h4 className="text-danger">Out of stock</h4>
                    }
                </div>
                <p className="card-text">
                    {product.description}
                </p>
                <div className="row justify-content-between mx-0">
                    {userLink()}
                </div>
            </div>
        </div>
    )
}

export default ProductItem