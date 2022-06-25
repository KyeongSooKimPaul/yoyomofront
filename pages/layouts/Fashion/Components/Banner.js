import React, { Fragment } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import MasterBanner from "./MasterBanner";

const Data = [
  {
    img: "/assets/images/icon/banner_1.jpg",
    // title: "건강한 일상",
    // desc: "렛잇비",
    // link: "/left-sidebar/collection ",
    link: "/shop/no_sidebar",
    
  },
  {
    img: "/assets/images/icon/banner_2.jpg",
    // title: "매일이 다른 하루",
    // desc: "렛잇비",
    link: "/shop/no_sidebar",
  },
  {
    img: "/assets/images/icon/banner_3.jpg",
    // title: "상쾌한 하루",
    // desc: "렛잇비",
    link: "/shop/no_sidebar",
  },
];

const Banner = () => {
  return (
    <Fragment>
      <section className="p-0">
        <Slider className="slide-1 home-slider">
          {Data.map((data, i) => {
            return (
              <MasterBanner
              
                key={i}
                img={data.img}
                desc={data.desc}
                title={data.title}
                link={data.link}
              />
            );
          })}
        </Slider>
      </section>
    </Fragment>
  );
};

export default Banner;
