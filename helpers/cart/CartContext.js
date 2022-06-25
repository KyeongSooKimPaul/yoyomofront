import React, { useState, useEffect } from 'react'
import Context from './index'
import { toast } from 'react-toastify'

const getLocalCartItems = () => {
  try {
    const list = localStorage.getItem('cartList')
    if (list === null) {
      return []
    } else {
      return JSON.parse(list)
    }
  } catch (err) {
    return []
  }
}

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState(getLocalCartItems())
  const [cartTotal, setCartTotal] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [quantityforkeep, setQuantityforkeep] = useState(0)
  const [quantityforremain, setQuantityforremain] = useState(1)
  const [orderproduct, setorderproduct] = useState()
  const [stock, setStock] = useState('InStock')

  useEffect(() => {
    const Total = cartItems.reduce((a, b) => a + b.total, 0)
    setCartTotal(Total)

    localStorage.setItem('cartList', JSON.stringify(cartItems))
  }, [cartItems])

  // Add Product To Cart
  const addToCart = (item, quantity) => {
    toast.success('장바구니에 상품이 담겼습니다!')
    const index = cartItems.findIndex((itm) => itm.id === item.id)
    console.log("dddd", (item.price - (item.price * item.discount) / 100).toFixed(0) *
    item.quantity,)
    console.log("quan", quantity)
    if (index !== -1) {
      
      cartItems[index] = {
        ...item,
        qty: quantity,
        qtyforkeep: 0,
        total:
          (item.price - (item.price * item.discount) / 100).toFixed(0) *
          quantity,
      }
      setCartItems([...cartItems])
    } else {
      const product = {
        ...item,
        qty: quantity,
        qtyforkeep: 0,
        total:
          (item.price -
          (item.price * item.discount) / 100).toFixed(0) * quantity,
      }
      setCartItems([...cartItems, product])
    }
  }

  const removeFromCart = (item) => {
    toast.error('Product Removed Successfully !')
    setCartItems(cartItems.filter((e) => e.id !== item.id))
  }

  const orderproducttotal = (item) => {
    setorderproduct(item)
  }

  const minusQty = () => {
    if (quantity > 1 && quantity > quantityforkeep) {
      setQuantity(quantity - 1)
      setQuantityforremain(quantity - quantityforkeep - 1)
      setStock('InStock')
    }
  }

  const plusQty = (item) => {
    if (item.stock >= quantity) {
      setQuantity(quantity + 1)
      setQuantityforremain(quantity - quantityforkeep + 1)
    } else {
      setStock('Out of Stock !')
    }
  }

  const minusQtyforkeep = () => {
    if (quantityforkeep > 0) {
      setQuantityforremain(quantity - quantityforkeep + 1)
      setQuantityforkeep(quantityforkeep - 1)

      setStock('InStock')
    }
  }

  const plusQtyforkeep = (item) => {
    if (quantity > quantityforkeep) {
      setQuantityforremain(quantity - quantityforkeep - 1)
      setQuantityforkeep(quantityforkeep + 1)
    } else {
      setStock('Out of Stock !')
    }
  }

  // Update Product Quantity
  const updateQty = (item, quantity, quantityforkeep) => {
    if (quantity >= 1) {
      const index = cartItems.findIndex((itm) => itm.id === item.id)
      if (index !== -1) {
        cartItems[index] = {
          ...item,
          qty: quantity,
          qtyforkeep: quantityforkeep,
          // total: item.price * quantity,
          total:
            (item.price - (item.price * item.discount) / 100).toFixed(0) *
            quantity,
        }
        setCartItems([...cartItems])
        toast.info('Product Quantity Updated !')
      } else {
        const product = {
          ...item,
          qty: quantity,
          total:
            (item.price - (item.price * item.discount) / 100).toFixed(0) *
            quantity,
        }
        setCartItems([...cartItems, product])
        toast.success('Product Added Updated !')
      }
    } else {
      toast.error('Enter Valid Quantity !')
    }
  }

  const updateQtyforkeep = (item, quantityforkeep) => {
    if (quantity >= quantityforkeep) {
      console.log('qu', quantity)
      console.log('qu', quantityforkeep)
      const index = cartItems.findIndex((itm) => itm.id === item.id)
      if (index !== -1) {
        cartItems[index] = {
          ...item,

          qtyforkeep: quantityforkeep,
          // total: item.price * quantity,
          total:
            (item.price - (item.price * item.discount) / 100).toFixed(0) *
            quantity,
        }
        setCartItems([...cartItems])
        toast.info('Product Keep Quantity Updated !')
      } else {
        const product = {
          ...item,

          qtyforkeep: quantityforkeep,
          total:
            (item.price - (item.price * item.discount) / 100).toFixed(0) *
            quantity,
        }
        setCartItems([...cartItems, product])
        toast.success('Product Added Updated !')
      }
    } else {
      toast.error('Enter Valid Quantity !')
    }
  }

  const updateQtyforremain = (item, quantity) => {
    if (quantity >= 1) {
      const index = cartItems.findIndex((itm) => itm.id === item.id)
      if (index !== -1) {
        cartItems[index] = {
          ...item,
          qty: quantity,
          // total: item.price * quantity,
          total:
            (item.price - (item.price * item.discount) / 100).toFixed(0) *
            quantity,
        }
        setCartItems([...cartItems])
        toast.info('Product Quantity Updated !')
      } else {
        const product = {
          ...item,
          qty: quantity,
          total:
            (item.price - (item.price * item.discount) / 100).toFixed(0) *
            quantity,
        }
        setCartItems([...cartItems, product])
        toast.success('Product Added Updated !')
      }
    } else {
      toast.error('Enter Valid Quantity !')
    }
  }

  return (
    <Context.Provider
      value={{
        ...props,
        state: cartItems,
        cartTotal,
        setQuantity,
        quantity,
        setQuantityforkeep,
        quantityforkeep,
        stock,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        plusQty: plusQty,
        minusQty: minusQty,
        plusQtyforkeep: plusQtyforkeep,
        minusQtyforkeep: minusQtyforkeep,
        quantityforremain: quantityforremain,
        orderproduct: orderproduct,
        orderproducttotal: orderproducttotal,
        updateQty: updateQty,
        updateQtyforkeep: updateQtyforkeep,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default CartProvider
