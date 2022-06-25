import React, { useContext, useState } from 'react'
import { Media, Container, Form, Row, Input, Col } from 'reactstrap'
import { PayPalButton } from 'react-paypal-button'
import CartContext from '../../../../helpers/cart'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useParams } from 'react-router-dom'
import { CurrencyContext } from '../../../../helpers/Currency/CurrencyContext'
import { gql } from '@apollo/client'
import { useQuery, useMutation } from '@apollo/client'
import { jsonSchema } from 'uuidv4'

const ME_QUERY = gql`
  query me {
    me {
      id
    }
  }
`

const ORDER_MUTATION = gql`
  mutation createOrder(
    $product_main_image: String!
    $name: String!
    $keepingamount: String!
    $wholeamount: String!
    $multiorder: String
    $shipping_amount: String!
    $item_price: String!
    $updated_at: String!
    $paidstatus: String!
    $productid: Int!
  ) {
    createOrder(
      product_main_image: $product_main_image
      name: $name
      keepingamount: $keepingamount
      wholeamount: $wholeamount
      multiorder: $multiorder
      shipping_amount: $shipping_amount
      item_price: $item_price
      updated_at: $updated_at
      paidstatus: $paidstatus
      productid: $productid
    ) {
      id
    }
  }
`

const CheckoutPageMulti = () => {
  const cartContext = useContext(CartContext)
  const quantityforkeep = cartContext.quantityforkeep
  const quantityforremain = cartContext.quantityforremain
  const quantity = cartContext.quantity
  const cartItems = cartContext.state
  const orderproduct = cartContext.orderproduct
  const cartTotal = cartContext.cartTotal
  const curContext = useContext(CurrencyContext)
  const symbol = curContext.state.symbol
  const [obj, setObj] = useState({})
  const [payment, setPayment] = useState('stripe')
  const { register, handleSubmit, errors } = useForm() // initialise the hook
  const router = useRouter()

  console.log('orderproduct', orderproduct)
  console.log('cartItems', cartItems)
  console.log('quantityforkeep', quantityforkeep)

  const checkhandle = (value) => {
    setPayment(value)
  }

  const onSuccess = (payment) => {
    router.push({
      pathname: '/page/order-success',
      state: {
        payment: payment,
        items: cartItems,
        orderTotal: total,
        symbol: symbol,
      },
    })
  }

  const initFormState = {
    product_main_image: '',
    name: '',
    keepingamount: '',
    wholeamount: '',
    multiorder: JSON.stringify(cartItems),
    shipping_amount: '',
    updated_at: '',
    item_price: '',
    paidstatus: 'no',
    productid: 0,

  }

  const [formState, setFormState] = useState(initFormState)





  const [ordercreated, { data, error }] = useMutation(ORDER_MUTATION, {
    onCompleted: (data) => {
      window.alert('주문이 완료되었습니다')
      // history.push('/login')
    },
    onError: (error) => {
      window.alert('에러 발생')
      console.log('err', error)
    },
  })


  const { loading, error : usererror, data : userdata} = useQuery(ME_QUERY, {
    onCompleted: (userdata) => {
    
      console.log('data!3', userdata)
    },
    onError: (usererror) => {
      console.log('error!3', usererror)
      window.alert("로그인 후 이용 가능합니다.")
      return history.push("/login")
    },
  })

  const finalhandler = () => {
    if (cartItems.length > 0) {
      var itemsss1 = []
      var itemsss2 = []
      var itemsss3 = []
      var itemsss4 = []
      var itemsss5 = []
      var itemsss6 = []
      var itemsss7 = []
      var itemsss8 = []
      var itemsss9 = []

      for (var i = 0; i < cartItems.length; i++) {
        itemsss1.push({
          discount: cartItems[i].discount,
          images: cartItems[i].images,

          price: String(
            (
              Number(cartItems[i].price) -
              (Number(cartItems[i].price) * Number(cartItems[i].discount)) / 100
            ).toFixed(0),
          ),
          qty: cartItems[i].qty,
          qtyforkeep: cartItems[i].qtyforkeep,
          title: cartItems[i].title,
          total: cartItems[i].total,
          id: cartItems[i].id,
        
        })

        if (cartItems.length - 1 == i) {
          console.log('dddaa', itemsss1)
          ordercreated({
            variables: {
              product_main_image: String(formState.product_main_image),
              name: String(formState.name),
              keepingamount: String(formState.keepingamount),
              wholeamount: String(formState.wholeamount),
              multiorder: String(JSON.stringify(itemsss1)),
              shipping_amount: String(formState.shipping_amount),
              updated_at: String(formState.updated_at),
              item_price: String(formState.item_price),
              paidstatus: String(formState.paidstatus),
              productid: Number(formState.productid),
            },
          })
        }
      }
    }
  }

  // const onSubmit = (data) => {
  //   if (data !== '') {
  //     alert('You submitted the form and stuff!')
  //     router.push({
  //       pathname: '/page/order-success',
  //       state: { items: cartItems, orderTotal: cartTotal, symbol: symbol },
  //     })
  //   } else {
  //     errors.showMessages()
  //   }
  // }

  const setStateFromInput = (event) => {
    obj[event.target.name] = event.target.value
    setObj(obj)
  }

  const onCancel = (data) => {
    console.log('The payment was cancelled!', data)
  }

  const onError = (err) => {
    console.log('Error!', err)
  }

  const paypalOptions = {
    clientId:
      'AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_',
  }

  return (
    <>
      {/* 
    <section className="section-b-space">
      <Container>
        <div className="checkout-page">
          <div className="checkout-form">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg="6" sm="12" xs="12">
                  <div className="checkout-title">
                    <h3>Billing Details</h3>
                  {console.log("cartItems",cartItems)}
                  </div>
                  <div className="row check-out">
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">First Name</div>
                      <input
                        type="text"
                        className={`${errors.firstName ? "error_border" : ""}`}
                        name="first_name"
                        ref={register({ required: true })}
                      />
                      <span className="error-message">
                        {errors.firstName && "First name is required"}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Last Name</div>
                      <input
                        type="text"
                        className={`${errors.last_name ? "error_border" : ""}`}
                        name="last_name"
                        ref={register({ required: true })}
                      />
                      <span className="error-message">
                        {errors.last_name && "Last name is required"}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Phone</div>
                      <input
                        type="text"
                        name="phone"
                        className={`${errors.phone ? "error_border" : ""}`}
                        ref={register({ pattern: /\d+/ })}
                      />
                      <span className="error-message">
                        {errors.phone && "Please enter number for phone."}
                      </span>
                    </div>
                    <div className="form-group col-md-6 col-sm-6 col-xs-12">
                      <div className="field-label">Email Address</div>
                      <input
                        className="form-control"
                        className={`${errors.email ? "error_border" : ""}`}
                        type="text"
                        name="email"
                        ref={register({
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                      <span className="error-message">
                        {errors.email && "Please enter proper email address ."}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Country</div>
                      <select name="country" ref={register({ required: true })}>
                        <option>India</option>
                        <option>South Africa</option>
                        <option>United State</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Address</div>
                      <input
                        className="form-control"
                        className={`${errors.address ? "error_border" : ""}`}
                        type="text"
                        name="address"
                        ref={register({ required: true, min: 20, max: 120 })}
                        placeholder="Street address"
                      />
                      <span className="error-message">
                        {errors.address && "Please right your address ."}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-12 col-xs-12">
                      <div className="field-label">Town/City</div>
                      <input
                        className="form-control"
                        type="text"
                        className={`${errors.city ? "error_border" : ""}`}
                        name="city"
                        ref={register({ required: true })}
                        onChange={setStateFromInput}
                      />
                      <span className="error-message">
                        {errors.city && "select one city"}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">State / County</div>
                      <input
                        className="form-control"
                        type="text"
                        className={`${errors.state ? "error_border" : ""}`}
                        name="state"
                        ref={register({ required: true })}
                        onChange={setStateFromInput}
                      />
                      <span className="error-message">
                        {errors.state && "select one state"}
                      </span>
                    </div>
                    <div className="form-group col-md-12 col-sm-6 col-xs-12">
                      <div className="field-label">Postal Code</div>
                      <input
                        className="form-control"
                        type="text"
                        name="pincode"
                        className={`${errors.pincode ? "error_border" : ""}`}
                        ref={register({ pattern: /\d+/ })}
                      />
                      <span className="error-message">
                        {errors.pincode && "Required integer"}
                      </span>
                    </div>
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <input
                        type="checkbox"
                        name="create_account"
                        id="account-option"
                      />
                      &ensp;{" "}
                      <label htmlFor="account-option">Create An Account?</label>
                    </div>
                  </div>
                </Col>
                <Col lg="6" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 > 0 ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>
                            Product <span>Total</span>
                          </div>
                        </div>
                        <ul className="qty">
                          {cartItems.map((item, index) => (
                            <li key={index}>
                              {item.title} × {item.qty}{" "}
                              <span>
                                {symbol}
                                {item.total}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <ul className="sub-total">
                          <li>
                            Subtotal{" "}
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                          <li>
                            Shipping
                            <div className="shipping">
                              <div className="shopping-option">
                                <input
                                  type="checkbox"
                                  name="free-shipping"
                                  id="free-shipping"
                                />
                                <label htmlFor="free-shipping">
                                  Free Shipping
                                </label>
                              </div>
                              <div className="shopping-option">
                                <input
                                  type="checkbox"
                                  name="local-pickup"
                                  id="local-pickup"
                                />
                                <label htmlFor="local-pickup">
                                  Local Pickup
                                </label>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <ul className="total">
                          <li>
                            Total{" "}
                            <span className="count">
                              {symbol}
                              {cartTotal}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="payment-box">
                        <div className="upper-box">
                          <div className="payment-options">
                            <ul>
                              <li>
                                <div className="radio-option stripe">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-2"
                                    defaultChecked={true}
                                    onClick={() => checkhandle("stripe")}
                                  />
                                  <label htmlFor="payment-2">Stripe</label>
                                </div>
                              </li>
                              <li>
                                <div className="radio-option paypal">
                                  <input
                                    type="radio"
                                    name="payment-group"
                                    id="payment-1"
                                    onClick={() => checkhandle("paypal")}
                                  />
                                  <label htmlFor="payment-1">
                                    PayPal
                                    <span className="image">
                                      <Media src={"/assets/images/paypal.png"} alt="" />
                                    </span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        {cartTotal !== 0 ? (
                          <div className="text-right">
                            {payment === "stripe" ? (
                              <button type="submit" className="btn-solid btn">
                                Place Order
                              </button>
                            ) : (
                              <PayPalButton
                                paypalOptions={paypalOptions}
                                amount={cartTotal}
                                onPaymentSuccess={onSuccess}
                                onPaymentError={onError}
                                onApprove={onSuccess}
                                onPaymentCancel={onCancel}
                              />
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </section> */}
      <section className="section-b-space">
        <Container>
          <div className="checkout-page">
            <div className="checkout-form">
              <Row>
                <Col lg="12" sm="12" xs="12">
                  {cartItems && cartItems.length > 0 > 0 ? (
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <div>Product</div>
                        </div>
                        {cartItems.map((item, index) => (
                          <ul className="qty" key={index}>
                            <li>
                              {item.title} × {item.qty}개
                            </li>
                            <li>
                              개당 가격 -{' '}
                              {(item.price - (item.price * item.discount) / 100)
                                .toFixed(0)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              원
                            </li>
                            <li>키핑 수량 - {item.qtyforkeep}개</li>
                            <li>
                              주문 수량 -{' '}
                              {Number(item.qty) - Number(item.qtyforkeep)}개
                            </li>
                            <li>
                              합계 -{' '}
                              {(
                                (
                                  item.price -
                                  (item.price * item.discount) / 100
                                ).toFixed(0) * item.qty
                              )
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              원
                            </li>
                          </ul>
                        ))}
                        <ul className="sub-total">
                          <li>
                            총 합계 -
                            {cartTotal
                              .toFixed(0)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            원
                          </li>
                        </ul>
                        <ul className="total">
                          <button
                            className="btn btn-purple"
                            onClick={() => finalhandler()}
                          >
                            최종 결제
                          </button>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>{' '}
    </>
  )
}

export default CheckoutPageMulti
