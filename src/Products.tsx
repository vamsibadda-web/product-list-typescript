import { useEffect, useState } from "react";
import List from "./List";
import { Status } from "./product";
import type { Product, ApiState } from "./product";

function Products() {
  const [state, setState] = useState<ApiState<Product>>({
    data: [],
    status: Status.Loading,
  });
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setState({ data, status: Status.Success });
      })
      .catch(() => {
        console.log(Error);
        setState({ data: [], status: Status.Error });
      });
  }, []);
  if (state.status === Status.Loading) return <h2>Loading...</h2>;
  if (state.status === Status.Error) return <h2>Error...</h2>;

  return (
    <div>
      <h2>Products</h2>

      <List<Product>
        items={state.data}
        renderItem={(product) => (
          <div>
            <img src={product.image} width="100" />
            <p>{product.title}</p>
            <p>${product.price}</p>
          </div>
        )}
      />
    </div>
  );
}
export default Products;