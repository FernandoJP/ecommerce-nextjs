import { useState } from 'react';
import { getData } from '../utils/fetchData'
import Head from 'next/head'
import ProductItem from '../components/product/ProductItem';

const Home = (props) => {
  const [products, setProducts] = useState(props.products)

  console.log('products',products);

  return (
    <div className="products">
      <Head>
        <title>Home page</title>
      </Head>
      {
        products.length === 0
        ? <h2>No products</h2>
        : products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))
      }
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await getData('product')
  console.log('res = ',res);
  return {
    props: {
      products: res.products,
      result: res.result
    },
  }
}

export default Home