import { RouteComponentProps } from "react-router-dom";
import { Cart, Checkout } from "../components";
import { Home } from "../pages";

export interface IRoute {
  exact: boolean;
  path: string;
  component: React.FC<RouteComponentProps & any>;
}

export const routes: IRoute[] = [
  {
    exact: true,
    path: "/",
    component: Home,
  },
  {
    exact: true,
    path: "/cart",
    component: Cart,
  },
  {
    exact: true,
    path: "/checkout",
    component: Checkout,
  },
];
