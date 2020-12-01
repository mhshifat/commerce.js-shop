import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/commerce.png";
import useStyles from "../styles/navbar";

const Navbar: React.FC<{ totalItems: number }> = ({ totalItems }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          className={classes.title}
          component={Link}
          to="/"
        >
          <img
            src={logo}
            alt="Commerce.js"
            height="25px"
            className={classes.image}
          />
          Commerce.js
        </Typography>
        <div className={classes.grow} />
        <div className="">
          <IconButton
            aria-label="Show cart items"
            color="inherit"
            component={Link}
            to="/cart"
          >
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
