import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My First Book",
    description: "The first book I ever wrote",
  },
  {
    id: "p2",
    price: 5,
    title: "My Second Book",
    description: "The second book I ever wrote",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;

// 253 REFRESHER / PRACTICE

// CAME FROM ./store/index.js
// STEP 3:
// 3.1 Add Dummy products, as a array. /// "const DUMMY_PRODUCTS = []"
// 3.2 Let'ss populate this array. id, price, title => like as in cart-slice.js /// "{id: "p1", price: 6, title: "My First Book", description: "The first book I ever wrote"}". Now I wanna use that dummy data to dynamically render these product items.
// 3.3 "{DUMMY_PRODUCTS.map((product) => (..." I'll maping all <ProductItem />
// 3.4 In "<ProductItem />" add "title={product.title}"... price, description.
// 3.5 Don't foget - if we mapping, we need to add the "key" /// "key={product.id}" to help React!
// GO TO ProductItem.js --- >>> there I wanna work with the these data

// CAME FROM ProductItem.js --- >>>
// STEP 5:
// 5.1 "id={product.id}"
// GO TO productItem.js --->>>
// 253 REFRESHER / PRACTICE
