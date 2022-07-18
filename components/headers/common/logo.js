import React, { Fragment } from 'react';
import Link from 'next/link';

const LogoImage = ({ logo }) => {
    return (
        <Fragment>
            <Link href={'/'} >
                <a>
                    <img src={`/assets/images/icon/${logo?logo:'logo.png'}`} alt=""  style={{maxWidth:"auto", height:"28px"}}/>
                </a>
            </Link>
        </Fragment>
    )
}

export default LogoImage;