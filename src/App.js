
import { useState } from "react";
import Form from "./Components/Form/Form";
import ProductItem from "./Components/Products/ProductsItem";
import CartContext from "./Components/Contexts/Cartcontext";
import CartModal from "./Components/Modal/CartModal";
import Cart from "./Components/Cart/Cart";

function App() {
  const[productList , setProductList] = useState([]);
  const [orderList , setOrderList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ctxObj = {
    orderList : orderList ,
    setOrderList: setOrderList ,
    productList : productList ,
    cartVisibility: isModalOpen,
    setCartVisibility: setIsModalOpen,
    setProductList : setProductList
  }
  const formSubmitHandler = (value) => {
    setProductList((prevList)=>{
      return [value , ...prevList]
    })
  } 
  
  const ShowProducts = productList.map((product)=>{
   return  <ProductItem key = {product.id} item ={product} ></ProductItem>
  })
  let cartItemCount = 0 ;
  orderList.forEach((item)=>{
    cartItemCount += item.count
  })
 
  return (
      <>
      <CartContext.Provider value = {ctxObj}>
      {isModalOpen && <CartModal>
      <Cart></Cart>
      </CartModal> } 
      <button style={{float:'right'}} onClick={()=>setIsModalOpen(true)}>{`My Cart ${cartItemCount}`} </button>
      <Form onSubmit = {formSubmitHandler}></Form>
      {ShowProducts}
      </CartContext.Provider>
      </>
       
  );
}

export default App;