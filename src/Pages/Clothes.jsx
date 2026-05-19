import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Clothes() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products/category/mens-shirts")
        .then(res => res.json()),
      fetch("https://dummyjson.com/products/category/womens-dresses")
        .then(res => res.json())
    ])
    .then(([mens, womens]) => {
      const allClothes = [
        ...mens.products.map(item => ({ ...item, type: "mens" })),
        ...womens.products.map(item => ({ ...item, type: "womens" }))
      ];
      setProducts(allClothes);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching clothes:", error);
      setLoading(false);
    });
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(p => p.type === selectedCategory);

  return (
    <div className="container mt-5 mb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Clothes
          </li>
        </ol>
      </nav>
      <h1 className="mb-4 text-center">Clothes Collection</h1>

      {/* Filter Buttons */}
      <div className="mb-4 text-center">
        <button
          className={`btn m-2 ${selectedCategory === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>

        <button
          className={`btn m-2 ${selectedCategory === "mens" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelectedCategory("mens")}
        >
          Men's Shirts
        </button>

        <button
          className={`btn m-2 ${selectedCategory === "womens" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelectedCategory("womens")}
        >
          Women's Dresses
        </button>
      </div>

      {/* Loading */}
      {loading && <h4 className="text-center">Loading...</h4>}

      {/* Products */}
      <div className="row">
        {filteredProducts.map(item => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow">

              <img
                src={item.thumbnail}
                className="card-img-top"
                alt={item.title}
                height="220"
                style={{ objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5>{item.title}</h5>
                <h6 className="text-success">₹ {item.price}</h6>

                <button className="btn btn-primary btn-sm">
                  Add to Cart
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}