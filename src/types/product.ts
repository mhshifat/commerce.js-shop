export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: {
    formatted_with_symbol: string;
  };
  media: {
    source: string;
  };
}

export interface ICart {
  id: string;
  line_items: any[];
  total_items: number;
  subtotal: {
    formatted_with_symbol: string;
  };
}
