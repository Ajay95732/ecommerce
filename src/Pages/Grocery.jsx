import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Grocery() {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products/category/groceries")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch groceries");
          return res.json();
        }),

      fetch("https://dummyjson.com/products/category/kitchen-accessories")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch kitchen items");
          return res.json();
        }),
    ])
      .then(([groceryData, kitchenData]) => {
        const allItems = [
          ...groceryData.products,
          ...kitchenData.products,
        ];
        setGroceries(allItems);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading Groceries...</div>;
  if (error) return <div className="text-danger mt-5">{error}</div>;

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Grocery
          </li>
        </ol>
      </nav>
      <h2 className="text-center fw-bold mb-4">🛒 Grocery Store</h2>

      <div className="row g-4">
        {groceries.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow border-0 h-100 grocery-card">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h6 className="fw-bold">{item.title}</h6>
                <p className="text-muted small">{item.brand}</p>
                <h5 className="text-success">₹ {item.price}</h5>

                <button className="btn btn-success w-100 mt-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .grocery-card {
          border-radius: 12px;
          transition: 0.3s ease;
        }
        .grocery-card:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}