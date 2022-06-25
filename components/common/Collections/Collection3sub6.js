import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import ProductItems from "../product-box/ProductBox1";
import { Row, Col, Container } from "reactstrap";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import PostLoader from "../PostLoader";
import { CompareContext } from "../../../helpers/Compare/CompareContext";

const QUERY_PROUDCTSBYIDFIRSTMUTATION2 = gql`
  query productpage {
    productpage(id: 1) {
      Product(first: 3, orderBy: { id: desc },after: { id: 4 }) {
        id
        title
        description
        type
        brand
        category
        price
        newproduct
        sale,
        stock
        discount
        variants
        images
      }
    }
  }
`

const GET_PRODUCTS = gql`
  query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
    products(type: $type, indexFrom: $indexFrom, limit: $limit) {
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        stock
        sale
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`;

const TopCollection = ({
  type,
  title,
  subtitle,
  designClass,
  noSlider,
  cartClass,
  productSlider,
  titleClass,
  noTitle,
  innerClass,
  inner,
  backImage,
}) => {
  const context = useContext(CartContext);
  const contextWishlist = useContext(WishlistContext);
  const comapreList = useContext(CompareContext);
  const quantity = context.quantity;
  const [delayProduct, setDelayProduct] = useState(true);

  // var { loading, data } = useQuery(GET_PRODUCTS, {
  //   variables: {
  //     type: type,
  //     indexFrom: 0,
  //     limit: 4,
  //   },
  // });


  var { loading, data, error } = useQuery(QUERY_PROUDCTSBYIDFIRSTMUTATION2, {
    variables: {
      id: 1,
    }
  })


  useEffect(() => {
    if (data === undefined) {
      noSlider === false;
    } else {
      noSlider === true;
    }
    setTimeout(() => {
      setDelayProduct(false);
    }, 1);
  }, [delayProduct]);
  
  useEffect(() => {
    if (data) {
    //  console.log("dddd", data)
    } 
  }, [data]);
  useEffect(() => {
    if (error) {
     console.log("ddderrord", error)
    } 
  }, [error]);


  return (
    <>
      <section className={designClass}>
         (
          <>
          
            <Container>
              <Row className="margin-default">
                {!data ||
                !data.productpage ||
                !data.productpage.Product ||
                !data.productpage.Product.length === 0 ||
                loading ? (
                  <div className="row margin-default">
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                    <div className="col-xl-3 col-lg-4 col-6">
                      <PostLoader />
                    </div>
                  </div>
                ) : (
                  data &&
                  data.productpage.Product.slice(0, 8).map((product, index) => (
                    <Col xl="3" sm="6" key={index}>
                      <div>
                        <ProductItems
                          product={product}
                          backImage={backImage}
                          addCompare={() => comapreList.addToCompare(product)}
                          addWishlist={() => contextWishlist.addToWish(product)}
                          title={title}
                          cartClass={cartClass}
                          addCart={() => context.addToCart(product, quantity)}
                          key={index}
                        />
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </Container>
          </>
        )
      </section>
    </>
  );
};

export default TopCollection;
