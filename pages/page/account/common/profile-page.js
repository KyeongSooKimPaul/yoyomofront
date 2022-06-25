import React, { useContext, useState } from 'react'
import { Table, Container, Row, Form, Input, Label, Col } from 'reactstrap'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import moment from 'moment'
import { useRouter } from 'next/router'
import Link from 'next/link'

const ME_QUERY = gql`
  query me {
    me {
      id
      name
      email
      Ordermanageitems {
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
      }
    }
  }
`

const ProfilePage = () => {
  const router = useRouter()

  const initFormState = {
    id: 'no',
    email: '',
    name: '',
    Ordermanageitems: [],
  }

  const [formState, setFormState] = useState(initFormState)

  const { loading, error, data } = useQuery(ME_QUERY, {
    onCompleted: (data) => {
      setFormState({
        ...formState,
        id: data.me.id,
        email: data.me.email,
        name: data.me.name,
        Ordermanageitems: data.me.Ordermanageitems,
      })
      console.log('data!3', data)
    },
    onError: (error) => {
      console.log('error!3', error)
      // window.alert("로그인 후 이용 가능합니다.")
      // return history.push("/login")
    },
  })

  const onSuccess = (orderid) => {
    router.push({
      pathname: '/page/order-success',
      state: {
        id: orderid,
      },
    })
  }

  console.log('fonrsta', formState)

  return (
    <>
      {formState && (
        <>
          <section className="contact-page register-page">
            <Container>
              <Row>
                <Col sm="12">
                  <h3>계정 정보</h3>
                  <Form className="theme-form">
                    <Row>
                      <Col md="6">
                        <Label for="name">성함</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="name"
                          readOnly
                          defaultValue={formState.name}
                          placeholder="Enter Your name"
                          required=""
                        />
                      </Col>

                      <Col md="6">
                        <Label for="review">이메일</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="review"
                          readOnly
                          defaultValue={formState.email}
                          placeholder="Enter your number"
                          required=""
                        />
                      </Col>

                      <Col md="12">
                        <Label for="review">
                          총 주문 내역 - {formState.Ordermanageitems.length}개
                        </Label>

                        <div className="table-responsive">
                          <Table
                            className="table mb-0"
                            style={{ fontSize: '15px' }}
                          >
                            <thead>
                              <tr>
                                <th>주문 날짜</th>

                                <th>입금 확인 상태</th>
                                <th>주문내역</th>
                              </tr>
                            </thead>
                            <tbody>
                              {formState.Ordermanageitems.map((item, index) => (
                                <tr key={index}>
                                  <th scope="row" className="drag-pointer">
                                    {moment(new Date(item.createdAt)).format(
                                      'YYYY-MM-DD-A hh:mm',
                                    )}
                                  </th>
                                  <td>{item.paidstatus}</td>
                                  <td>
                                    {' '}
                                    <Link
                                      href={{
                                        pathname: '/page/order-success',
                                        // query: item.id, // the data
                                        query: { orderid: item.id }
                                      }}
                                    >
                                      <a>상세보기</a>
                                    </Link>
                                    {/* <button
                                      className="btn btn-primary btn-block "
                                      onClick={() =>
                                        router.push({
                                          pathname: '/page/order-success',
                                          state: {
                                            id: item,
                                          },
                                        })
                                      }
                                    >
                                      상세보기
                                    </button> */}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>

                        {/* {formState.Ordermanageitems.map((size, i) => (
                          <li key={i}>
                            <a href={null} className="filter_tag">
                              {size.createdAt}
                             
                            </a> <hr />
                          </li>
                         
                        ))} */}
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      )}
    </>
  )
}

export default ProfilePage
