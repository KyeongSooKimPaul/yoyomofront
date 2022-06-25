import React, { useEffect, useRef, useState } from 'react'
import CommonLayout from '../../../components/shop/common-layout'
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from 'reactstrap'

import { useFormik } from 'formik'

import { gql, useMutation } from '@apollo/client'

const SIGNUP_MUTATION = gql`
  mutation signup(
    $name: String
    $email: String!
    $password: String!
    $phonenumber: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password
      phonenumber: $phonenumber
    ) {
      token
    }
  }
`

const Register = () => {
    const [activeemail, setactiveemail] = useState(false)
  const [varificationcode, sestvarificationcode] = useState()
  const [phonenumber, setphonenumber] = useState()
  const [activephonenumber, setactivephonenumber] = useState(false)
  const [varificationcodeforphone, setvarificationcodeforphone] = useState()
  const [check1, setcheck1] = useState(false)
  const [check2, setcheck2] = useState(false)
  const [check3, setcheck3] = useState(false)

    useEffect(()=> {
        console.log("REACT_S3_BUCKETNAME", process.env.NEXT_PUBLIC_REACT_S3_BUCKETNAME)
    },[])

  const initFormState = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    phonenumber: '',
  }

  const [formState, setFormState] = useState(initFormState)

  const [signup, { data, error }] = useMutation(SIGNUP_MUTATION, {
   
    onCompleted: (data) => {
      window.alert('회원가입이 완료되었습니다')

      history.push('/login')
    },
    onError: (error) => {
      window.alert('이미 존재하는 이메일입니다')
      console.log('err', error)
    },
  })

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
    },

    onSubmit: (values) => {
      // dispatch(userForgetPassword(values, props.history))
      console.log('values', values.email)
    },
    onError: (error2) => {
      console.log('error2', error2)
      window.alert('에러 발생')
    },
  })

  const startsignup = () => {
    if (formState.confirmpassword !== formState.password) {
      return window.alert('입력하신 비밀번호가 일치하지 않습니다.')
    }
    if (check1 !== true && check2 !== true && check3 !== true) {
      return window.alert('모든 사항에 동의해야 합니다.')
    }

    signup({
      variables: {
        name: String(formState.name),
        email: String(formState.email),
        password: String(formState.password),
        phonenumber: String(formState.phonenumber),
      },
    })
  }
  return (
    <CommonLayout parent="home" title="register">
      <section className="register-page section-b-space">

      <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
              
                <CardBody className="pt-0">
                  <div>
               
                  </div>
                  <div className="p-2">
                    <div className="mb-3">
                      <Label className="form-label">이메일</Label>
                      <Input
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        type="text"
                        value={formState.email}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            email: e.target.value,
                          })
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">성함</Label>

                      <Input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            name: e.target.value,
                          })
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">비밀번호</Label>

                      <Input
                        id="password"
                        name="password"
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        value={formState.password}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            password: e.target.value,
                          })
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">비밀번호 확인</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={formState.confirmpassword}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            confirmpassword: e.target.value,
                          })
                        }}
                      />
                    </div>

                    <hr />

                
                    

                    <div className="mt-4">
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="exampleRadios1"
                          id="exampleRadios1"
                          value="option1"
                          onChange={(e) => {
                            if (e.target.checked == true) {
                              setcheck1(true)
                            } else {
                              setcheck1(false)
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios1"
                        >
                          요요모{' '}
                          <a href="#">
                            이용약관
                          </a>{' '}
                          동의 (필수)
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="exampleRadios2"
                          id="exampleRadios2"
                          value="option1"
                          onChange={(e) => {
                            if (e.target.checked == true) {
                              setcheck2(true)
                            } else {
                              setcheck2(false)
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios1"
                        >
                          <a href="#" >
                            개인정보 수집 이용
                          </a>{' '}
                          동의 (필수)
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="exampleRadios3"
                          id="exampleRadios3"
                          value="option1"
                          onChange={(e) => {
                            if (e.target.checked == true) {
                              setcheck3(true)
                            } else {
                              setcheck3(false)
                            }
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios1"
                        ></label>
                           <a href="#" >
                            상품수집 / 관리 / 등록 및 환불조건
                          </a>
                          동의 (필수)
                      
                      </div>
                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          onClick={() => startsignup()}
                        >
                          회원가입
                        </button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                 이미 회원가입을 하셨습니까?
                  <a href="#" >
                    로그인
                  </a>{' '}
                </p>
              </div>
              <div className="mt-2 text-center">
              
                <p>© {new Date().getFullYear()} 요요모</p>
              </div>
            </Col>
          </Row>
        </Container>





        {/* <Container>
          <Row>
            <Col lg="12">
              <h3>회원가입</h3>
              <div className="theme-card">
                <Form className="theme-form">
                  <Row>
                    <Col md="12">
                      <Label for="email">성함</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="fname"
                        placeholder="First Name"
                        required=""
                      />
                    </Col>
                    <Col md="12">
                      <Label for="review">핸드폰 번호</Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="lname"
                        placeholder="Last Name"
                        required=""
                      />
                    </Col>
                    <Col md="12">
                      <Label for="email">추천인 핸드폰 번호</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        required=""
                      />
                    </Col>
                    <Col md="12">
                      <Label for="review">이메일</Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="review"
                        placeholder="Enter your password"
                        required=""
                      />
                    </Col>
                    <Col md="12">
                      <Label for="review">비밀번호</Label>
                      <Input
                        type="password"
                        className="form-control"
                        id="review"
                        placeholder="Enter your password"
                        required=""
                      />
                    </Col>
                  </Row>
                  <Row>
                    <a href="#" className="btn btn-solid">
                      회원가입
                    </a>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container> */}
      </section>
    </CommonLayout>
  )
}

export default Register
