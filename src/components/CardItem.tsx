import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "../styles/cartItem";

const CardItem: React.FC<{
  item: any;
  handleRemoveFromCart: any;
  handleUpdateQty: any;
}> = ({ item, handleUpdateQty, handleRemoveFromCart }) => {
  const classes = useStyles();

  return (
    <Card className="cart-item">
      <CardMedia image={item.media.source} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;
