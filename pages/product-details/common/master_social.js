import React from "react";

const MasterSocial = () => {
  return (
    <ul className="product-social">
      {/* <li>
        <a href="https://www.kakaocorp.com/page/" target="_blank">
         카카오톡 공유하기
        </a>
      </li> */}
      <li style={{marginLeft:"10px"}}>
        <a href="https://plus.google.com" target="_blank">
          <i className="fa fa-google-plus"></i>
        </a>
      </li>
      <li style={{marginLeft:"10px"}}>
        <a href="https://twitter.com" target="_blank">
          <i className="fa fa-twitter"></i>
        </a>
      </li>
      <li style={{marginLeft:"10px"}}>
        <a href="https://www.instagram.com" target="_blank">
          <i className="fa fa-instagram"></i>
        </a>
      </li>
      <li style={{marginLeft:"10px"}}>
        <a href="https://rss.com" target="_blank">
          <i className="fa fa-rss"></i>
        </a>
      </li>
    </ul>
  );
};

export default MasterSocial;
