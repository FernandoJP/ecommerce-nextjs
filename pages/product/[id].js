import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { getData } from '../../utils/fetchData';

const DetailProduct = (props) => {
    console.log("props = "+props);
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const isActive = (index) => {
        if(tab === index) return ' active'
        return ''
    }

    return (
        <div className="row detail_page">
            <Head>
                <title>Detail product</title>
            </Head>

            <div className="col-md-6">
                <img src={product.images[tab].url} alt={product.images[tab].url} 
                className="d-block img-thumbnail rounded mt-4 w-100" style={{height: 350}}/>
            </div>

            <div className="col-md-6 mt-3">
                    <h2 className="text-uppercase">{product.title}</h2>
                    <h5 className="text-danger">{product.price}</h5>
                    <div className="row mx-0 d-flex justify-content-between">
                        {
                            product.inStock > 0 
                            ? <h6 className="text-danger">In stock: {product.inStock}</h6>
                            : <h6 className="text-danger">Out stock</h6>
                        }

                        <h6 className="text-danger">Sold: {product.sold}</h6>

                        <div className="my-2">{product.description}</div>
                        <div className="my-2">{product.content}</div>

                        <button type="buttton" 
                        className="btn btn-dark d-block my-3 px-5"
                        disabled={product.inStock === 0}
                        onClick={() => dispatch(addToCart(product, cart))}>
                        >
                            Buy
                        </button>
                    </div>
            </div>

            <div className="row mx-0" style={{cursor: 'pointer'}}>
                {product.images.map((img, index) => (
                    <img key={index} src={img.url} alt={img.url} className={`img-thunbnail rounded ${isActive(index)}`}
                    style={{height: 80, width: '20%'}}
                    onClick={() => setTab(index)}
                    />
                ))}
            </div>

        </div>
    )
}

export async function getServerSideProps({params: {id}}) {
    console.log(id);
    const res = await getData(`product/${id}`)
    console.log('res = ',res);
    return {
      props: {
         product: res.product,
      },
    }
  }

export default DetailProduct