import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Link from 'next/link'
import firebase from '../../../config/base'
import { useRouter } from 'next/router'

const TopBarDark = ({ topClass, fluid }) => {
  const router = useRouter()
  const firebaseLogout = () => {
    firebase.auth().signOut()
    router.push('/page/account/login-auth')
  }
  return (
    <div className={topClass}>
      <Container fluid={fluid}>
        <Row>
          <Col lg="6">
            <div className="header-contact">
              <ul>
                <li>공동제조 플랫폼</li>
                <li>
                  <i className="fa fa-phone" aria-hidden="true"></i>고객센터:
                  123 - 456 - 7890
                </li>
              </ul>
            </div>
          </Col>
          <Col lg="6" className="text-right">
            <ul className="header-dropdown">
              <li className="onhover-dropdown mobile-account">
                <Link href={`/page/account/login`}>
                  <a>로그인</a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <Link href={`/page/account/register`}>
                  <a>회원가입</a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <Link href={`/page/account/login`}>
                  <a>로그아웃</a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <Link href={`/page/account/profile`}>
                  <a></a>
                </Link>
              </li>
              <li className="onhover-dropdown mobile-account">
                <i className="fa fa-user" aria-hidden="true"></i> 마이 페이지
                <ul className="onhover-show-div">
                  <li>
                    <Link href={`/page/account/profile`}>
                      <a>기본 정보</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/page/account/register`}>
                      <a>주문 / 배송 조회</a>
                    </Link>
                  </li>
                  <li onClick={() => firebaseLogout()}>
                    <a> 마이 창고</a>
                  </li>
                </ul>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default TopBarDark
