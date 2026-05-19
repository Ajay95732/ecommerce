import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Electronics() {
  const [mobiles, setMobiles] = useState([]);
  const [tvs, setTvs] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("https://dummyjson.com/products/category/smartphones").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/tvs").then(res => res.json()),
      fetch("https://dummyjson.com/products/category/laptops").then(res => res.json())
    ])
      .then(([mobilesData, tvsData, laptopsData]) => {
        setMobiles(mobilesData.products || []);
        setTvs(tvsData.products || []);
        setLaptops(laptopsData.products || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });

  }, []);

  const renderProducts = (title, items) => (
    <div className="mt-5">
      <h2 className="mb-3">{title}</h2>

      <div className="row">
        {items.length === 0 ? (
          <p>No products found</p>
        ) : (
          items.map(item => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.thumbnail}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h6>{item.title}</h6>
                  <p className="fw-bold">₹ {item.price}</p>
                  <button className="btn btn-primary w-100">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Products...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Electronics
          </li>
        </ol>
      </nav>
      <h1 className="text-center mb-4">Electronics Store</h1>

      {renderProducts("Mobiles", mobiles)}
      {renderProducts("TVs", tvs)}
      {renderProducts("Laptops", laptops)}
    </div>
  );
}