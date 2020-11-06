import React from 'react';
import ImageHelper from './helper/ImageHelpers';
import {Redirect} from "react-router-dom";
import { addItenCart,removeItemFromCart } from './helper/CartHelpers';


var isauthenticated=true


const Card = ({
    product,
    addtoCart=true,
    removeFromCart=true
}) => {

    const cartTitle = product ? product.name 
        :'default Title';
    const cartDescription = product ? product.description
        :'default Description';
    const cartPrice = product ? product.price 
        :'default Title';

    const addToCart = () =>{
      if(isauthenticated){
        addItenCart(product,()=>{})
        console.log("added")

      }else{
        console.log("login plse")
      }
    };

    const getAredirect=(redirect)=>{
      if(redirect){
        return <Redirect to="/cart"/>;

      }
    };

    const showAddtocartButton = (addtoCart)=>{
      return(
        addtoCart && (
          <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
        )
      )
    }

    const removeFromcartButton = (removeFromCart)=>{
      return(
        removeFromCart && (
          <button
                onClick={()=>{removeItemFromCart(product.id)}}
                className="btn btn-block btn-outline-warning mt-2 mb-2"
              >
                Remove from cart
              </button>
        )
      )
    }

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead text-center">{cartTitle}</div>
        <div className="card-body">
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
    <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddtocartButton(addtoCart)}
            </div>
            <div className="col-12">
             {removeFromcartButton(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card;