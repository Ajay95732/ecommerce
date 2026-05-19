import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Food() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(6);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch(`https://dummyjson.com/recipes/search?q=${search}&limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFoods(data.recipes || []);
      })
      .catch((err) => {
        setError(err.message || "Failed to load");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit, search]);

  if (loading)
    return <div className="text-center mt-5 fs-4">Loading...</div>;

  if (error)
    return <div className="text-danger mt-5 text-center">Error: {error}</div>;

  return (
    <div className="container py-5">
     <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Food
          </li>
        </ol>
      </nav>
      <h2 className="text-center fw-bold mb-4">🍽 Delicious Recipes</h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50 shadow-sm"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {foods.map((item) => (
          <div key={item.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card border-0 shadow-lg h-100 food-card">
              <img
                src={item.image}
                className="card-img-top"
                alt={item.name}
                style={{ height: "220px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="fw-bold">{item.name}</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span className="badge bg-success">
                    ⭐ {item.rating}
                  </span>
                  <span className="badge bg-warning text-dark">
                    {item.cuisine}
                  </span>
                </div>

                <p className="text-muted small">
                  🍴 {item.servings} Servings  
                  <br />
                  🔥 {item.caloriesPerServing} Calories
                </p>

                <div className="mb-2">
                  {item.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark me-1 mb-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button className="btn btn-dark w-100">
                  View Recipe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => setLimit(limit + 6)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}