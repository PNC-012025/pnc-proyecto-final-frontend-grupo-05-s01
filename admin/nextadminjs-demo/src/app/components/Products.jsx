import { FaBasketShopping } from "react-icons/fa6";

const ProductInfo = ({ image, title, items }) => (
  <div className="flex flex-col items-center">
    <img
      src={image}
      alt={title}
      className="rounded-full w-40 h-40 object-cover mb-4"
    />
    <h3 className="text-lg font-bold font-titles text-title mb-2">{title}</h3>
    <p className="text-base text-left text-foreground font-info mb-1">Colocar viñeta con:</p>
    <ul className="space-y-2 text-base font-info text-foreground text-left">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <FaBasketShopping className="text-base text-title" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default ProductInfo;
