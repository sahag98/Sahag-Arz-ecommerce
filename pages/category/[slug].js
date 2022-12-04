import React from 'react'
import Link from 'next/link'
import { client, urlFor } from '../../lib/client'
import { Product } from '../../components'
const CategoryDetails = ({ category }) => {
    const { products } = category
    return (
        <>
            <div className='products-heading'>
                <h2>Best {category.name}</h2>
            </div>
            <div className='products-container'>
                {products?.map(
                    (product) => <Product key={product._id} product={product} />)
                }
            </div>
            {/* <Link href={`/product/${products[0].slug.current}`}>
                <div className='product-card'>
                    <img
                        src={urlFor(products[0].image[0])}
                        width={250}
                        height={250}
                        className="product-image"
                    />
                    <p className='product-name'>{products[0].name}</p>
                </div>
            </Link> */}

        </>
    )
}


export const getStaticPaths = async () => {
    const query = `*[_type=="categories"] {
        slug {
            current
        }
    }
    `
    const categories = await client.fetch(query)
    const paths = categories.map((category) => ({
        params: {
            slug: category.slug.current
        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type=="categories" && slug.current == '${slug}'][0]`
    const categoriesQuery = '*[_type == "categories"]'
    const category = await client.fetch(query)
    const categories = await client.fetch(categoriesQuery)

    return {
        props: { categories, category }
    }
}

export default CategoryDetails