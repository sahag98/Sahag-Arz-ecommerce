import React from 'react'

import { Product, FooterBanner, HeroBanner, Category }
  from "../components"
import { client } from '../lib/client'
import product from '../sanity_ecommerce/schemas/product'

const Home = ({ products, categories, bannerData }) => {
  console.log(categories)
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.slice(0, 4).map(
          (product) => <Product key={product._id} product={product} />)
        }
      </div>
      <div className='products-heading'>
        <h2>Categories</h2>
      </div>
      <div className='products-container'>
        {categories?.map(
          (category) => <Category key={category._id} category={category} />)
        }
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type=="product"]'
  const products = await client.fetch(query)
  const bannerQuery = '*[_type=="banner"]'
  const bannerData = await client.fetch(bannerQuery)
  const categoryQuery = '*[_type=="categories"]'
  const categories = await client.fetch(categoryQuery)
  console.log(categories)
  return {
    props: { products, categories, bannerData }
  }
}

export default Home
