import React, { Fragment } from "react";
import { Products } from "../components";
import { ICart, IProduct } from "../types/product";

const HomeContainer: React.FC<{
  cart: ICart;
  products: IProduct[];
  handleAddToCart: (productId: string, qty: number) => Promise<void>;
}> = ({ cart, products, handleAddToCart }) => {
  return (
    <Fragment>
      <Products products={products} onAddToCart={handleAddToCart} />
    </Fragment>
  );
};

export default HomeContainer;
