import React, { Fragment, useContext } from 'react'
import Link from 'next/link'
import CartContext from '../../../helpers/cart'
import { Media } from 'reactstrap'

const CartHeader = ({ item, symbol }) => {
  const context = useContext(CartContext)

  return (
    <Fragment>
      <li>
        <div className="media">
          <Link href={'/product/' + item.id}>
            <a>
              <Media
                style={{
                  width: '50px',
                  objectFit:"cover",
                  objectPosition:"center"
                }}
                alt=""
                className="mr-3"
                src={`${JSON.parse(item.images)[0]}`}
              />
            </a>
          </Link>
          <div className="media-body">
            <Link href={'/product/' + item.id}>
              <a>
                <h4>{item.name}</h4>
              </a>
            </Link>

            <h4>
              <span>
           
                {(item.price - (item.price * item.discount) / 100).toFixed(0).toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 x {item.qty}개 
              </span>
            </h4>
          </div>
        </div>
        <div className="close-circle">
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={() => context.removeFromCart(item)}
          ></i>
        </div>
      </li>
    </Fragment>
  )
}

export default CartHeader
