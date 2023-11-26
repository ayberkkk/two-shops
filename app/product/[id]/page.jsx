import DetailClient from "@/app/components/detail/DetailClient";
import { products } from "@/utils/Products";

function Detail({ params }) {
  const { id } = params;
  const product = products.find((product) => product.id == id);

  return (
    <div>
      <DetailClient product={product} />
    </div>
  );
}

export default Detail;
