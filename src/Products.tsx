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
      .catch((err) => {
        console.error(err);
        setState({ data: [], status: Status.Error });
      });
  }, []);

  if (state.status === Status.Loading) {
    return (
      <h2 className="text-center text-xl mt-10 font-semibold">
        Loading...
      </h2>
    );
  }

  if (state.status === Status.Error) {
    return (
      <h2 className="text-center text-red-500 text-xl mt-10 font-semibold">
        Something went wrong...
      </h2>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Products
      </h2>

      <List<Product>
        items={state.data}
        renderItem={(product) => (
          <div className="bg-white border rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />

            <p className="text-sm font-semibold line-clamp-2 min-h-[40px]">
              {product.title}
            </p>

            <p className="text-blue-600 font-bold text-lg mt-2">
              ${product.price}
            </p>
          </div>
        )}
      />
    </div>
  );
}
export default Products;