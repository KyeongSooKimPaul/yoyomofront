import React, { useEffect,useState } from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import firebase from '../../../config/base'
import CheckoutPageMulti from './common/checkout-page-multi';
import Login from './login-auth'

const CheckoutMulti = () => {
    const [currentUser, setCurrentUser] = useState(true);
    useEffect(() => {
        firebase.onAuthStateChanged(setCurrentUser);
    })
    return (
        <>
        
            <CommonLayout parent="home" title="checkout">
                <CheckoutPageMulti />
            </CommonLayout>

        
        {/* {currentUser !== null ?
            <CommonLayout parent="home" title="checkout">
                <CheckoutPage />
            </CommonLayout>
        :
        <Login/>
        } */}
        </>
    )
}

export default CheckoutMulti;