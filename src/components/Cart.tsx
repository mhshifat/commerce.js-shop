import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "../styles/cart";
import { ICart } from "../types/product";
import CartItem from "./CardItem";

const Cart: React.FC<{
  cart: Partial<ICart>;
  handleEmptyCart: any;
  handleRemoveFromCart: any;
  handleUpdateQty: any;
}> = ({ cart, handleEmptyCart, handleRemoveFromCart, handleUpdateQty }) => {
  const classes = useStyles();

  const isEmpty = cart.line_items?.length === 0;

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link className={classes.link} to="/">
        start adding some
      </Link>
      !
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart?.line_items?.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              item={lineItem}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateQty={handleUpdateQty}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart?.subtotal?.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
