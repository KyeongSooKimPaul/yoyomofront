import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Row, Col, Media, Modal, ModalBody, Progress } from 'reactstrap'
import CartContext from '../../../helpers/cart'
import { CurrencyContext } from '../../../helpers/Currency/CurrencyContext'
import MasterProductDetail from './MasterProductDetail'
import { background, opacity } from 'jimp'
import CountdownComponent from '../../../components/common/widgets/countdownComponent'

const ProductItem = ({
  product,
  addCart,
  backImage,
  des,
  addWishlist,
  cartClass,
  productDetail,
  addCompare,
  title,
}) => {
  // eslint-disable-next-line
  const router = useRouter()
  const cartContext = useContext(CartContext)
  const curContext = useContext(CurrencyContext)
  const currency = curContext.state
  const plusQty = cartContext.plusQty
  const minusQty = cartContext.minusQty
  var quantity = cartContext.quantity
  const setQuantity = cartContext.setQuantity

  const [image, setImage] = useState('')
  const [modal, setModal] = useState(false)
  const [modalCompare, setModalCompare] = useState(false)
  const toggleCompare = () => setModalCompare(!modalCompare)
  const toggle = () => {
    setQuantity(1)
    setModal(!modal)
  }
  const uniqueTags = []

  const onClickHandle = (img) => {
    setImage(img)
  }

  const startaddcart = (product) => {
    setModal(!modal)
    addCart(product)
  }

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value))
  }

  const clickProductDetail = () => {
    const titleProps = product.title.split(' ').join('')
    // router.push(`/product-details/${product.id}` + "-" + `${titleProps}`);
    router.push(`/product-details/${product.id}`)
  }

  const variantChangeByColor = (imgId, product_images) => {
    product_images.map((data) => {
      if (data.image_id == imgId) {
        setImage(data.src)
      }
    })
  }
  return (
    <div
      className="product-box product-wrap"
      style={{
        cursor: 'pointer',
      }}
    >
      <div className="img-wrapper">
        <div className="lable-block">
          {/* {product.new === true ? <span className="lable3">new</span> : ""}
          {product.sale === true ? <span className="lable4">on sale</span> : ""} */}
        </div>
        <div className="front" onClick={clickProductDetail}>
          <Media
            src={`${image ? image : JSON.parse(product.images)[0]}`}
            className="shop-image"
            alt=""
          />
        </div>
        {/* {backImage ? (
          JSON.parse(product.images)[1] === 'undefined' ? (
            'false'
          ) : (
            <div className="back" onClick={clickProductDetail}>
              <Media
                src={`${image ? image : JSON.parse(product.images)[1]}`}
                className="img-fluid m-auto"
                alt=""
              />
            </div>
          )
        ) : (
          ''
        )} */}

        <div className={cartClass}>
          {/* <a href={null} title="Quick View" onClick={toggle}>
            <i className="fa fa-shopping-cart" ></i>
        
          </a> */}

          <Modal
            isOpen={modalCompare}
            toggle={toggleCompare}
            size="lg"
            centered
          >
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                    <Media
                      src={`${
                        product.variants && image ? image : product.images[0]
                      }`}
                      alt=""
                      className="img-fluid"
                    />
                    <div className="media-body align-self-center text-center">
                      <h5>
                        <i className="fa fa-check"></i>Item{' '}
                        <span>{product.title}</span>
                        <span>successfully added to your Compare list</span>
                      </h5>
                      <div className="buttons d-flex justify-content-center">
                        <Link href="/page/compare">
                          <a
                            href={null}
                            className="btn-sm btn-solid"
                            onClick={addCompare}
                          >
                            View Compare list
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
        {product.images ? (
          <>
            <ul
              className="product-thumb-list"
              style={{
                bottom: '50px !important',
              }}
            >
              <li>
                <a href={null} title="Quick View" onClick={toggle}>
                  <i
                    className="fa fa-shopping-cart"
                    style={{
                      fontSize: '20px',
                      cursor: 'pointer',
                      padding: '10px',
                      background: 'black',
                      borderRadius: '100px',
                      background: '#6610f2 0',
                      color: 'white',
                      marginRight: '10px',
                      marginBottom: '10px',
                    }}
                  ></i>
                </a>
              </li>
            </ul>

            {/* <ul
              className="product-thumb-list"
              style={{
                background: 'black',
                opacity: '0.7',
                width : "100% !important",
                position:"absolute",
                bottom:"0",
                textAlign:"center",
                width:"100%"
                // position: absolute;
                // bottom: 0;
                // text-align: center;
                // width: 100%;


              }}
            >
              <li>
                <div className="border-product">
                 
                  <CountdownComponent />
                </div>
              </li>
            </ul> */}
          </>
        ) : (
          ''
        )}
      </div>
      <MasterProductDetail
        product={product}
        productDetail={productDetail}
        currency={currency}
        uniqueTags={uniqueTags}
        title={title}
        des={des}
        variantChangeByColor={variantChangeByColor}
      />
      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-md quickview-modal"
        centered
      >
        <ModalBody>
          <Row>
            <Col
              lg="12"
              xs="12"
              style={{
                textAlign: 'left',
              }}
            >
              <div className="quick-view-img">{product.title}</div>
              <hr />
              <div
                className="product-description border-product"
                style={{ marginTop: '30px' }}
              >
                <Row>
                  <Col
                    lg="6"
                    xs="6"
                    style={{
                      textAlign: 'left',
                      margin: 'auto',
                    }}
                  >
                    <h4 style={{ fontWeight: 'bold' }}>
                      {(
                        product.price -
                        (product.price * product.discount) / 100
                      )
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      원
                      <del>
                        <span className="money">
                          {product.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          원
                        </span>
                      </del>
                    </h4>
                  </Col>
                  <Col
                    lg="6"
                    xs="6"
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    {' '}
                    <div className="qty-box">
                      <div className="input-group">
                        <span className="input-group-prepend">
                          <button
                            type="button"
                            className="btn quantity-left-minus"
                            onClick={minusQty}
                            data-type="minus"
                            data-field=""
                          >
                            <i className="fa fa-angle-left"></i>
                          </button>
                        </span>
                        <input
                          type="text"
                          name="quantity"
                          value={quantity}
                          onChange={changeQty}
                          className="form-control input-number"
                        />
                        <span className="input-group-prepend">
                          <button
                            type="button"
                            className="btn quantity-right-plus"
                            onClick={() => plusQty(product)}
                            data-type="plus"
                            data-field=""
                          >
                            <i className="fa fa-angle-right"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div
                className="product-description border-product"
                style={{ marginTop: '50px' }}
              >
                <Row>
                  <Col
                    lg="6"
                    xs="6"
                    style={{
                      textAlign: 'left',
                    }}
                  >
                    <h4 style={{ fontWeight: 'bold' }}>합계</h4>
                  </Col>
                  <Col
                    lg="6"
                    xs="6"
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <h4 style={{ fontWeight: 'bold' }}>
                      {(
                        (
                          product.price -
                          (product.price * product.discount) / 100
                        ).toFixed(0) * quantity
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      원
                    </h4>
                  </Col>
                </Row>
              </div>
              <div
                className="product-description border-product"
                style={{ marginTop: '30px' }}
              >
                <Row>
                  <Col
                    lg="6"
                    xs="6"
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    <button
                      className="btn btn-solid"
                      onClick={() => setModal(!modal)}
                      style={{
                        width: '100%',
                      }}
                    >
                      취소
                    </button>
                  </Col>
                  <Col lg="6" xs="6">
                    <button
                      className="btn btn-purple"
                      style={{
                        width: '100%',
                      }}
                      onClick={(product) => startaddcart(product)}
                    >
                      장바구니 담기
                    </button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ProductItem
