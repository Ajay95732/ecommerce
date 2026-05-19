import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  
export default function Sports() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    "all",
    "cricket",
    "volleyball",
    "basketball",
    "softball",
  ];

  useEffect(() => {
    setLoading(true);

    fetch("https://dummyjson.com/products/category/sports-accessories")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) =>
          p.title.toLowerCase().includes(selectedCategory)
        );

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger mt-5">{error}</div>;

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Sports
          </li>
        </ol>
      </nav>
      <h2 className="text-center fw-bold mb-4">🏏 Sports Kits Store</h2>

      {/* Category Filter */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${
              selectedCategory === cat
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="row g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 border-0 shadow-lg sport-card">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="fw-bold">{product.title}</h6>
                <p className="text-muted small">{product.brand}</p>
                <p className="fw-bold text-primary fs-5">
                  ${product.price}
                </p>
                <button className="btn btn-dark w-100">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">
            No products found in this category.
          </p>
        </div>
      )}

      {/* Hover CSS */}
      <style>{`
        .sport-card {
          border-radius: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sport-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}