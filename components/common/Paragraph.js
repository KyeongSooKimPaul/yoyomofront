import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Paragraph = ({title, inner, line ,hrClass}) => {
    return (
        <>
            <div className={title}>
                {/* <h4>진행중인 프로젝트</h4> */}
                <h3 className={inner}>지금 바로 참여 가능한 그룹딜</h3>
                {
                    line ?
                        <div className="line" ></div> : 
                    hrClass ?
                        <hr role="tournament6"></hr>
                    : ''
                }
                   
  
            </div>
            {/* <Container>
                <Row>
                    <Col lg="6" className="m-auto">
                        <div className="product-para">
                            <p className="text-center">건강, 가격  모두를 챙겨보세요</p>
                        </div>
                    </Col>
                </Row>
            </Container> */}
        </>
    )
}

export default Paragraph;