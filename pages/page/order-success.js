import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import CommonLayout from '../../components/shop/common-layout'
import { Container, Row, Col, Media, Table } from 'reactstrap'
import CartContext from '../../helpers/cart'
import { CurrencyContext } from '../../helpers/Currency/CurrencyContext'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import moment from 'moment'

const GET_ORDER = gql`
  query ordersbyorderid($id: Int!) {
    ordersbyorderid(id: $id) {
      id
      createdAt
      product_main_image
      name
      keepingamount
      wholeamount
      multiorder
      shipping_amount
      created_at
      updated_at
      item_price
      paidstatus
      userId
    }
  }
`

const OrderSuccess = () => {
  const imgStyle = {
    maxHeight: 128,
  }
 
  const router = useRouter()
  //   const data = router.query.orderid
  const [orderdata, setorderdata] = useState()
  const [orderdatadetail, setorderdatadetail] = useState()

  var { loading, data } = useQuery(GET_ORDER, {
    variables: {
      id: Number(router.query.orderid),
    },
    onCompleted: (data) => {
      console.log('detaildata', data.ordersbyorderid[0])

      if (data.ordersbyorderid[0].multiorder.length > 2) {
        setorderdata(data.ordersbyorderid[0])
        setorderdatadetail(JSON.parse(data.ordersbyorderid[0].multiorder))
        console.log('data1', JSON.parse(data.ordersbyorderid[0].multiorder))
      } else {
        console.log('data2')
        setorderdata(data.ordersbyorderid[0])
      }
    },
    onError: (error) => {
      console.log('err', error)
    },
  })

  const cartContext = useContext(CartContext)
  const cartItems = cartContext.state
  const cartTotal = cartContext.cartTotal
  const curContext = useContext(CurrencyContext)
  const symbol = curContext.state.symbol

  return (
    <CommonLayout parent="home" title="order success">
      {orderdata && (
        <>
          <section className="section-b-space light-layout">
            <Container>
              <Row>
                <Col md="12">
                  <div
                    className="success-text text-left"
                    style={{
                      fontWeight: 'bold',
                    }}
                  >
                    {/* <i className="fa fa-check-circle" aria-hidden="true"></i> */}

                    <p>
                      주문날짜 -
                      {moment(new Date(orderdata.createdAt)).format(
                        'YYYY-MM-DD-A hh:mm',
                      )}
                    </p>
                    <p>
                      주문번호 - {router.query.orderid}번{}
                    </p>

                    <p>
                      입금확인 -{' '}
                      {orderdata.paidstatus == 'no' ? '확인전' : '확인완료'}
                      {}
                    </p>

                    {console.log('result', orderdatadetail)}
                  </div>

                  {orderdatadetail !== undefined ? (
                    <div className="table-responsive">
                      <Table
                        className="table mb-0"
                        style={{ fontSize: '15px' }}
                      >
                        <thead>
                          <tr>
                            <th>이미지</th>
                            <th>상품명</th>
                            <th>키핑수량</th>
                            <th>발송요청수량</th>
                            <th>총 수량</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderdatadetail !== undefined &&
                            orderdatadetail.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {' '}
                                  <Link
                                    href={`/left-sidebar/product/` + item.id}
                                  >
                                    <a
                                      style={{
                                        height: '90px !important',
                                      }}
                                    >
                                      <Media
                                        style={imgStyle}
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
                                <th scope="row" className="drag-pointer">
                                  {item.title}
                                </th>

                                <td> {item.qtyforkeep}개</td>
                                <td>
                                  {' '}
                                  {Number(item.qty) - Number(item.qtyforkeep)}개
                                </td>
                                <td> {item.qty}개</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                      <>
                       <div className="table-responsive">
                      <Table
                        className="table mb-0"
                        style={{ fontSize: '15px' }}
                      >
                        <thead>
                          <tr>
                            <th>이미지</th>
                            <th>상품명</th>
                            <th>키핑수량</th>
                            <th>발송요청수량</th>
                            <th>총 수량</th>
                          </tr>
                        </thead>
                        <tbody>
                       
                              <tr>
                                  {
                                      console.log("JSON.parse(orderdata.product_main_image)[0]",orderdata.product_main_image)
                                  }
                                <td>
                                  {' '}
                                  <Link
                                    href={`/left-sidebar/product/` + orderdata.id}
                                  >
                                    <a
                                      style={{
                                        height: '90px !important',
                                      }}
                                    >
                                         <Media
                                        style={imgStyle}
                                        src={
                                            orderdata.product_main_image !== ""
                                            ? JSON.parse(orderdata?.product_main_image)[0]
                                            : ""
                                        }
                                        alt=""
                                      />
                                      {/* <Media
                                        style={imgStyle}
                                        src={
                                            orderdata.product_main_image
                                            ? JSON.parse(orderdata?.product_main_image)[0]
                                            : JSON.parse(orderdata.product_main_image)[0]
                                        }
                                        alt=""
                                      /> */}
                                    </a>
                                  </Link>
                                </td>
                                <th scope="row" className="drag-pointer">
                                  {orderdata.name}
                                </th>

                                <td> {orderdata.keepingamount}개</td>
                                <td>
                                  {' '}
                                  {Number(orderdata.wholeamount) - Number(orderdata.keepingamount)}개
                                </td>
                                <td> {orderdata.wholeamount}개</td>
                              </tr>
                          
                        </tbody>
                      </Table>
                    </div>
                      </>
                  )
                  
                  
                  
                  
                  }
                </Col>
              </Row>
            </Container>
          </section>
          {/* 
          <section className="section-b-space">
            <Container>
              <Row>
                <Col lg="12">
                  <div className="product-order">
                    <h3>your order details</h3>

                    {cartItems.map((item, i) => (
                      <Row className="product-order-detail" key={i}>
                        <Col xs="3">
                          <Media
                            src={item.images[0].src}
                            alt=""
                            className="img-fluid blur-up lazyload"
                          />
                        </Col>
                        <Col xs="3" className="order_detail">
                          <div>
                            <h4>product name</h4>
                            <h5>{item.title}</h5>
                          </div>
                        </Col>
                        <Col xs="3" className="order_detail">
                          <div>
                            <h4>quantity</h4>
                            <h5>{item.qty}</h5>
                          </div>
                        </Col>
                        <Col xs="3" className="order_detail">
                          <div>
                            <h4>price</h4>
                            <h5>
                              {symbol}
                              {item.price}
                            </h5>
                          </div>
                        </Col>
                      </Row>
                    ))}
                    <div className="total-sec">
                      <ul>
                        <li>
                          subtotal{' '}
                          <span>
                            {symbol}
                            {cartTotal}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="final-total">
                      <h3>
                        total{' '}
                        <span>
                          {symbol}
                          {cartTotal}
                        </span>
                      </h3>
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <Row className="order-success-sec">
                    <Col sm="6">
                      <h4>summery</h4>
                      <ul className="order-detail">
                        <li>order ID: 5563853658932</li>
                        <li>Order Date: October 22, 2021</li>
                        <li>Order Total: $907.28</li>
                      </ul>
                    </Col>
                    <Col sm="6">
                      <h4>shipping address</h4>
                      <ul className="order-detail">
                        <li>gerg harvell</li>
                        <li>568, suite ave.</li>
                        <li>Austrlia, 235153</li>
                        <li>Contact No. 987456321</li>
                      </ul>
                    </Col>
                    <Col sm="12" className="payment-mode">
                      <h4>payment method</h4>
                      <p>
                        Pay on Delivery (Cash/Card). Cash on delivery (COD)
                        available. Card/Net banking acceptance subject to device
                        availability.
                      </p>
                    </Col>
                    <Col md="12">
                      <div className="delivery-sec">
                        <h3>expected date of delivery</h3>
                        <h2>october 22, 2021</h2>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section> */}
        </>
      )}
    </CommonLayout>
  )
}

export default OrderSuccess
