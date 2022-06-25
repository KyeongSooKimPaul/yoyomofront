import React, { useState, useContext } from 'react'
import Link from 'next/link'
import CartContext from '../../../../helpers/cart'
import { Container, Row, Col, Media, Modal, ModalBody } from 'reactstrap'
import { CurrencyContext } from '../../../../helpers/Currency/CurrencyContext'

const CartPage = () => {
  const [modal, setModal] = useState(false)
  const context = useContext(CartContext)
  const cartItems = context.state
  const curContext = useContext(CurrencyContext)

  const plusQty = context.plusQty
  const minusQty = context.minusQty
  const quantity = context.quantity

  const plusQtyforkeep = context.plusQtyforkeep
  const minusQtyforkeep = context.minusQtyforkeep
  const quantityforkeep = context.quantityforkeep
  const quantityforremain = context.quantityforremain
  const orderproducttotal = context.orderproducttotal

  const symbol = curContext.state.symbol
  const total = context.cartTotal
  const removeFromCart = context.removeFromCart
  // const [quantity, setQty] = useState(1);
  const [quantityError, setQuantityError] = useState(false)
  const updateQty = context.updateQty
  const updateQtyforkeep = context.updateQtyforkeep

  orderproducttotal(cartItems)
  const handleQtyUpdate = (item, quantity, quantityforkeep) => {
    console.log('dd2', quantity)
    console.log('dd2', quantityforkeep)
    if (
      quantity >= 1 &&
      Number(quantity) >= Number(quantityforkeep) &&
      Number(quantityforkeep) >= 0
    ) {
      return updateQty(item, quantity, quantityforkeep)
    } else if (quantity >= 1 && Number(quantity) < Number(quantityforkeep)) {
      return window.alert('키핑 수량은 총 수량을 초과할 수 없습니다')
    } else if (Number(quantity) < 0) {
      return window.alert('1 이상의 숫자를 입력해주세요')
    } else if (Number(quantityforkeep) < 0) {
      return window.alert('0 이상의 숫자를 입력해주세요')
    } else {
      return window.alert('입력하신 숫자를 다시 확인해주세요')
    }
  }

  const toggle = () => setModal(!modal)
  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value))
  }

  const changeQtyforkeep = (e) => {
    setQuantityforkeep(parseInt(e.target.value))
  }
  // const minusQty = () => {
  //   if (quantity > 1) {
  //     setStock("InStock");
  //     setQty(quantity - 1);
  //   }
  // };

  // const plusQty = (product) => {
  //   if (product.stock >= quantity) {
  //     setQty(quantity + 1);
  //   } else {
  //     setStock("Out of Stock !");
  //   }
  // };

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <table className="table cart-table table-responsive-xs">
                  <thead>
                    <tr className="table-head">
                      <th scope="col">이미지</th>
                      <th scope="col">상품명</th>
                      <th scope="col">가격</th>
                      <th scope="col">총 수량</th>
                      <th scope="col">키핑 수량</th>
                      <th scope="col">삭제</th>
                      <th scope="col">합계</th>
                    </tr>
                  </thead>
                  {cartItems.map((item, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>
                            <Link href={`/left-sidebar/product/` + item.id}>
                              <a>
                                <Media
                                  src={
                                    item.images
                                      ? JSON.parse(item.images)[0]
                                      : JSON.parse(item.images)[0]
                                  }
                                  alt=""
                                />
                              </a>
                            </Link>
                          </td>

                          <td>
                            <Link href={`/left-sidebar/product/` + item.id}>
                              <a>{item.title}</a>
                            </Link>
                            <div className="mobile-cart-content row">
                              <div className="col-xs-3">
                                <div className="qty-box">
                                  <div className="input-group">
                                    <input
                                      type="number"
                                      name="quantity"
                                      onChange={(e) =>
                                        handleQtyUpdate(item, e.target.value)
                                      }
                                      className="form-control input-number"
                                      defaultValue={item.qty}
                                      style={{
                                        borderColor: quantityError && 'red',
                                      }}
                                    />
                                  </div>
                                </div>
                                {/* {item.qty >= item.stock ? 'out of Stock' : ''} */}
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  {symbol}
                                  {item.price -
                                    (item.price * item.discount) / 100}
                                </h2>
                              </div>
                              <div className="col-xs-3">
                                <h2 className="td-color">
                                  <a href="#" className="icon">
                                    <i
                                      className="fa fa-times"
                                      onClick={() => removeFromCart(item)}
                                    ></i>
                                  </a>
                                </h2>
                              </div>
                            </div>
                          </td>

                          <td>
                            <h2>
                              {(item.price - (item.price * item.discount) / 100)
                                .toFixed(0)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              원
                            </h2>
                          </td>
                          <td>
                            <div className="qty-box">
                              <div className="input-group">
                                <input
                                  type="number"
                                  name="quantity"
                                  onChange={(e) =>
                                    handleQtyUpdate(
                                      item,
                                      e.target.value,
                                      item.qtyforkeep,
                                    )
                                  }
                                  className="form-control input-number"
                                  value={item.qty}
                                  // style={{
                                  //   borderColor: quantityError && 'red',
                                  // }}
                                />
                              </div>
                            </div>
                            {/* {item.qty >= item.stock ? 'out of Stock' : ''} */}
                          </td>
                          <td>
                            <div className="qty-box">
                              <div className="input-group">
                                <input
                                  type="number"
                                  name="quantityforkeep"
                                  onChange={(e) =>
                                    handleQtyUpdate(
                                      item,
                                      item.qty,
                                      e.target.value,
                                    )
                                  }
                                  className="form-control input-number"
                                  value={item.qtyforkeep}
                                  // style={{
                                  //   borderColor: quantityError && 'red',
                                  // }}
                                />
                              </div>
                            </div>
                            {/* {item.qty >= item.stock ? 'out of Stock' : ''} */}
                          </td>
                          <td>
                            <i
                              className="fa fa-times"
                              onClick={() => removeFromCart(item)}
                            ></i>
                          </td>
                          <td>
                            <h2 className="td-color">
                              {Number(item.total)
                                .toFixed(0)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              원
                            </h2>
                          </td>
                        </tr>
                      </tbody>
                    )
                  })}
                </table>
                <table className="table cart-table table-responsive-md">
                  <tfoot>
                    <tr>
                      <td>합계 :</td>
                      <td>
                        <h2>
                          {Number(total)
                            .toFixed(0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          원
                        </h2>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </Col>
            </Row>
            <Row className="cart-buttons">
              <Col xs="6">
                <Link href={`/shop/no_sidebar`}>
                  <a className="btn btn-solid">쇼핑 계속하기</a>
                </Link>
              </Col>
              <Col xs="6">
                <Link href={`/page/account/checkoutMulti`}>
                  <a className="btn btn-solid">함께하기</a>
                </Link>
              </Col>
            </Row>
          </Container>

          {/* <Modal
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
                    <div className="quick-view-img">{item.title}</div>
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
                            {(item.price - (item.price * item.discount) / 100)
                              .toFixed(0)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            원
                            <del>
                              <span className="money">
                                {item.price
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
                                  onClick={() => plusQty(item)}
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
                                  onClick={() => plusQtyforkeep(item)}
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
                                item.price -
                                (item.price * item.discount) / 100
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
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </ModalBody>
            </Modal> */}
        </section>
      ) : (
        <section className="cart-section section-b-space">
          <Container>
            <Row>
              <Col sm="12">
                <div>
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Media
                      src={'/assets/images/icon-empty-cart.png'}
                      className="img-fluid mb-4 mx-auto"
                      alt=""
                    />
                    <h3>
                      <strong>장바구니가 비어있습니다.</strong>
                    </h3>
                    <h4>쇼핑을 계속 해 보세요</h4>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  )
}

export default CartPage
