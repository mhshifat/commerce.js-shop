import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "../components";
import { commerce } from "../lib/commerce";
import { ICart, IProduct } from "../types/product";
import { routes } from "./routes";

const Routes = () => {
  const [order, setOrder] = useState({});
  const [cart, setCart] = useState<Partial<ICart>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (productId: string, qty: number) => {
    const item = await commerce.cart.add(productId, qty);
    setCart(item.cart);
  };

  const handleUpdateQty = async (productId: string, qty: number) => {
    const item = await commerce.cart.update(productId, { quantity: qty });
    setCart(item.cart);
  };

  const handleRemoveFromCart = async (productId: string) => {
    const item = await commerce.cart.remove(productId);
    setCart(item.cart);
  };

  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();
    setCart(item.cart);
  };

  const handleCaptureCheckout = async (
    checkoutTokenId: string,
    orderData: object
  ) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        orderData
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (err) {
      setErrorMessage(err.data.error.message);
    }
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  return (
    <Fragment>
      <Navbar totalItems={cart.total_items ?? 0} />
      <Switch>
        {routes.map(({ component: Component, ...route }) => (
          <Route key={route.path} exact={route.exact} path={route.path}>
            <Component
              cart={cart}
              products={products}
              handleAddToCart={handleAddToCart}
              handleUpdateQty={handleUpdateQty}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
              handleCaptureCheckout={handleCaptureCheckout}
              order={order}
              error={errorMessage}
            />
          </Route>
        ))}
      </Switch>
    </Fragment>
  );
};

export default Routes;
