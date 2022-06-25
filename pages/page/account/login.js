import React,{useRef} from 'react'
import CommonLayout from '../../../components/shop/common-layout'
import Link from 'next/link'
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  FormFeedback,
  Label,
} from 'reactstrap'
import * as Yup from 'yup'
import { useFormik, ErrorMessage, Field, Form, Formik } from 'formik'

import { gql, useMutation } from '@apollo/client'
import * as AWS from 'aws-sdk'
import { v4 as uuidv4 } from "uuid"

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`
const Login = () => {

  var node = useRef()
  const [login, { data }] = useMutation(LOGIN_MUTATION, {
    fetchPolicy: 'network-only',
    context: { clientName: 'my-party' },
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.token)
      window.alert('반갑습니다')
      console.log('반갑습니다22', data)

      location.reload()
    },
    onError: (error) => {
      window.alert('계정 정보를 다시 확인해주세요')
    },
  })
  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email Required'),
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Password Required'),
  })

  const config = {
    bucketName: process.env.NEXT_PUBLIC_REACT_S3_BUCKETNAME,
    region: process.env.NEXT_PUBLIC_REACT_S3_REGION,
    // accessKeyId: process.env.REACT_S3_ACCESSKEYID,
    accessKeyId: process.env.NEXT_PUBLIC_REACT_S3_ACCESSKEYID,
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_S3_SECRETACCESSKEY,
  }

  const s3 = new AWS.S3({
    region: process.env.NEXT_PUBLIC_REACT_S3_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_REACT_S3_ACCESSKEYID,
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_S3_SECRETACCESSKEY,
  })

  const uploadToS3 = async (data) => {
    //   let name1 = uuidv4() + data.type;
    let name = uuidv4() + '.' + data.type.substring(6)
    console.log('sdfsdf', data.name)
    await s3
      .putObject({
        Key: name,
        Bucket: 'yoyomobucket',
        ContentType: data.type,
        Body: data,
        ACL: 'public-read',
      })
      .promise()
    return `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${name}`
  }

  const uploadFile = async (e) => {
    /* Import s3 config object and call the constrcutor */
    console.log(e.target.files[0])
    try {
      // let res = await e.target.files[0];
      // let res = await e
      const url = await uploadToS3(e.target.files[0])

      // arrayforimages.push(url)
      // sets3imagesforup((prevImages) => prevImages.concat(url));
      console.log('url', url)
   
      // res = ""
    } catch (error) {
      console.log("error", error)
      window.alert(
        '업로드 도중 오류가 발생하였습니다. 잠시 후 다시 시도 부탁드립니다.',
        error,
      )

      // window.location.reload()
      /* handle the exception */
    }
  }
  return (
    <CommonLayout parent="home" title="login">
      <section className="login-page section-b-space">
        <Container>
          <Row className="justify-content-center">
            {/* <h5> 이미지 업로드</h5>
            <input type="file" name="file" onChange={uploadFile} ref={node} /> */}
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
            
                <CardBody className="pt-0">
                 
                  <div className="p-2">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        const response = await login({
                          variables: values,
                        })
                        // localStorage.setItem("token", response.data.login.token)
                        setSubmitting(false)
                        // history.push("/")
                      }}
                    >
                      <Form className="form-horizontal">
                        <div className="mb-3">
                          <Label className="form-label">이메일</Label>
                          <Field
                            name="email"
                            className="form-control"
                            type="text"
                            placeholder="Email"
                          />
                        </div>
                        <ErrorMessage name="email" component={'div'} />

                        <div className="mb-3">
                          <Label className="form-label">비밀번호</Label>
                          <Field
                            name="password"
                            className="form-control"
                            type="password"
                            placeholder="Password"
                          />
                        </div>
                        <ErrorMessage name="password" component={'div'} />
                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            로그인
                          </button>
                        </div>
                        {/* <button type="submit" className="login-button">
                          <span>Login</span>
                        </button> */}
                      </Form>
                    </Formik>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  {/* Don&#39;t have an account ?{' '} */}
                  아직 회원이 아니십니까?
                  <a href="#" >
                    회원가입
                  </a>
                </p>
              </div>
          
            </Col>
          </Row>
        </Container>
        {/* <Container>
          <Row>
            <Col lg="12">
              <h3>로그인</h3>
              <div className="theme-card">
                <Form className="theme-form">
                  <div className="form-group">
                    <Label for="email">이메일 주소</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <Label for="review">비밀번호</Label>
                    <Input
                      type="password"
                      className="form-control"
                      id="review"
                      placeholder="Enter your password"
                      required=""
                    />
                  </div>
                  <a href="#" className="btn btn-solid">
                    로그인
                  </a>
                  <hr />

                  <p>아직 회원이 아니신가요?  <a href="/page/account/register">회원가입하기</a></p>
                
                </Form>
              </div>
            </Col>
             <Col lg="6" className="right-login">
                            <h3>New Customer</h3>
                            <div className="theme-card authentication-right">
                                <h6 className="title-font">Create A Account</h6>
                                <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                            able to order from our shop. To start shopping click register.</p><a href="#"
                                    className="btn btn-solid">Create an Account</a>
                            </div>
                        </Col> 
          </Row>
        </Container> */}
      </section>
    </CommonLayout>
  )
}

export default Login
