import React, { useState, useContext } from 'react'
import Link from 'next/link'
import {
  Modal,
  ModalBody,
  ModalHeader,
  Media,
  Input,
  Row,
  Col,
} from 'reactstrap'
import { CurrencyContext } from '../../../helpers/Currency/CurrencyContext'
import CartContext from '../../../helpers/cart'
import CountdownComponent from '../../../components/common/widgets/countdownComponent'
import MasterSocial from './master_social'
import { start } from 'nprogress'

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const [modal, setModal] = useState(false)
  const CurContect = useContext(CurrencyContext)
  const symbol = CurContect.state.symbol
  const toggle = () => setModal(!modal)
  const product = item
  const context = useContext(CartContext)
  const stock = context.stock
  const plusQty = context.plusQty
  const minusQty = context.minusQty
  const quantity = context.quantity

  const plusQtyforkeep = context.plusQtyforkeep
  const minusQtyforkeep = context.minusQtyforkeep
  const quantityforkeep = context.quantityforkeep

  const quantityforremain = context.quantityforremain
  const orderproduct = context.orderproduct
  const orderproducttotal = context.orderproducttotal
  orderproducttotal(item)

  const uniqueColor = []
  const uniqueSize = []

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value))
  }

  const changeQtyforkeep = (e) => {
    setQuantityforkeep(parseInt(e.target.value))
  }

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.title} </h2>
        <h4>
          <del>
            <span className="money">
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </span>
          </del>
          <span>{product.discount}% off</span>
        </h4>
        <h3>
          {(product.price - (product.price * product.discount) / 100)
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          원
        </h3>
        {/* {product.variants.map((vari) => {
          var findItem = uniqueColor.find((x) => x.color === vari.color);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })} */}
        {/* {changeColorVar === undefined ? (
          <>
            {uniqueColor ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li className={vari.color} key={i} title={vari.color}></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            {uniqueColor ? (
              <ul className="color-variant">
                {uniqueColor.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      onClick={() => changeColorVar(i)}
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )} */}
        <div>
          {/* {product.variants ? (
            <div>
              <h6 className="product-title size-text">
                select size
                <span>
                  <a
                    href={null}
                    data-toggle="modal"
                    data-target="#sizemodal"
                    onClick={toggle}
                  >
                    size chart
                  </a>
                </span>
              </h6>
              <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                <ModalBody>
                  <Media
                    src={"/assets/images/size-chart.jpg"}
                    alt="size"
                    className="img-fluid"
                  />
                </ModalBody>
              </Modal>
              <div className="size-box">
                <ul>
                  {uniqueSize.map((data, i) => {
                    return (
                      <li key={i}>
                        <a href={null}>{data}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )} */}
          {/* <span className="instock-cls">{stock}</span> */}
          {/* <h6 className="product-title">quantity</h6>
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
              <Input
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
          </div> */}
        </div>
        <div className="product-buttons">
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => context.addToCart(product, quantity)}
          >
            장바구니 담기
          </a>
          {/* <Link href={`/page/account/checkout`}>
            <a className="btn btn-solid" onClick={toggle}>
              함께하기
            </a>
          </Link> */}

          <a className="btn btn-solid" onClick={toggle}>
            함께하기
          </a>
        </div>
        {/* <div className="border-product">
          <h6 className="product-title">product details</h6>
          <p>{product.description}</p>
        </div> */}
        {/* <div className="border-product">
          <h6 className="product-title">공유하기</h6>
          <div className="product-icon">
            <ul className="product-social">
              <li>
                <a href="https://www.kakaocorp.com/page/" target="_blank">
                  카카오톡 공유하기
                </a>
              </li>
            </ul>

       ]
          </div>
        </div> */}

        <div className="border-product">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <h5
              style={{ color: '#191919', float: 'left' }}
              className="product-title"
            >
              공유하기
            </h5>
            <h5
              style={{ color: '#191919', float: 'right' }}
              className="product-title"
            >
              공유하기
              {/* <MasterSocial /> */}
            </h5>
          </div>
        </div>

        <div className="border-product">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '15px',
            }}
          >
            <h5
              style={{ color: '#191919', float: 'left' }}
              className="product-title"
            >
              일반유통가
            </h5>
            <h5
              style={{ color: '#191919', float: 'right' }}
              className="product-title"
            >
              17,900원
            </h5>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '15px',
            }}
          >
            <h5
              style={{ color: '#191919', float: 'left' }}
              className="product-title"
            >
              단독구매가
            </h5>
            <h5
              style={{ color: '#191919', float: 'right' }}
              className="product-title"
            >
              15,900원
            </h5>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <h5
              style={{ color: '#F85B5B', float: 'left' }}
              className="product-title"
            >
              함께구매가
            </h5>
            <h5
              style={{ color: '#F85B5B', float: 'right' }}
              className="product-title"
            >
              12,900원
            </h5>
          </div>
        </div>

        <div className="border-product">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',

              justifyContent: 'flex-start',
            }}
          >
            <h6
              style={{ color: '#191919', float: 'left', marginRight: '20px' }}
              className="product-title"
            >
              배송안내
            </h6>
            <h6
              style={{ color: '#F85B5B', float: 'left' }}
              className="product-title"
            >
              지금 주문하시면,
              <span style={{ color: '#191919' }}>
                다음 날에 배송이 시작됩니다. <br />
                배송비 3,500원
              </span>
              <br />
              <span style={{ color: '#191919' }}>
                (40,000원이상 구매시 무료배송)
              </span>
            </h6>
          </div>
        </div>

        {/* <div className="border-product">
          <div
            style={{
            
            }}
          >
            <h6 style={{ color: '#191919' }} className="product-title">
              브랜드판매가 비교
            </h6>
            <Media src=" https://yoyomobucket.s3.ap-northeast-2.amazonaws.com/58008128-13ca-43cb-8a0f-13603e986ced.png" className="img-fluid mb-4 mx-auto" alt="" />
           
          </div>
        </div> */}
        {/* <div className="border-product">
          <h6 className="product-title">종료까지 남은 시간</h6>
          <CountdownComponent />
        </div> */}
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
                            readOnly
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
                      <h4 style={{ fontWeight: 'bold' }}>키핑수량</h4>
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
                              onClick={minusQtyforkeep}
                              data-type="minus"
                              data-field=""
                            >
                              <i className="fa fa-angle-left"></i>
                            </button>
                          </span>
                          <input
                            type="text"
                            name="quantity"
                            value={quantityforkeep}
                            onChange={changeQtyforkeep}
                            readOnly
                            className="form-control input-number"
                          />
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              className="btn quantity-right-plus"
                              onClick={() => plusQtyforkeep(product)}
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
                      <h4 style={{ fontWeight: 'bold' }}>발송수량</h4>
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
                          <input
                            type="text"
                            name="quantity"
                            value={quantityforremain}
                            readOnly
                            className="form-control input-number"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <hr />
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
                      <h4 style={{ fontWeight: 'bold' }}>총 참여금액</h4>
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
                      <Link
                        href={`/page/account/checkout`}
                        params={{ product: product }}
                      >
                        <a
                          className="btn btn-solid"
                          style={{
                            width: '100%',
                          }}
                        >
                          최종 주문
                        </a>
                      </Link>
                      {/* <button
                        className="btn btn-purple"
                        style={{
                          width: '100%',
                        }}
                        onClick={(product) => startaddcart(product)}
                      >
                        장바구니 담기
                      </button> */}
                      {/* <button
                          className="btn btn-purple"
                          style={{
                            width: '100%',
                          }}
                          onClick={() => startorder()}
                        >
                          최종 주문
                        </button> */}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

export default DetailsWithPrice
