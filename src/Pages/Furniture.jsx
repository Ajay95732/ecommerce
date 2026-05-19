import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Furniture() {
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products/category/furniture?limit=100")
        .then((res) => {
          if (!res.ok) throw new Error("Furniture fetch failed");
          return res.json();
        }),

      fetch("https://dummyjson.com/products/category/home-decoration?limit=100")
        .then((res) => {
          if (!res.ok) throw new Error("Home decoration fetch failed");
          return res.json();
        }),
    ])
      .then(([furnitureData, decorationData]) => {
        const allProducts = [
          ...furnitureData.products,
          ...decorationData.products,
        ];
        setFurniture(allProducts);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading Furniture...</div>;
  if (error) return <div className="text-danger mt-5">{error}</div>;

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Furniture
          </li>
        </ol>
      </nav>
      <h2 className="text-center fw-bold mb-4">🪑 Furniture & Home Decor</h2>

      <div className="row g-4">
        {furniture.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-lg border-0 h-100 furniture-card">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="card-img-top"
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h6 className="fw-bold">{item.title}</h6>
                <p className="text-muted small">{item.brand}</p>
                <h5 className="text-success">₹ {item.price}</h5>

                <button className="btn btn-dark w-100 mt-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .furniture-card {
          border-radius: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .furniture-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}