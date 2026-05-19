import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "Electronics", link: "/electronics" },
    { name: "Clothes", link: "/clothes" },
    { name: "Grocery", link: "/grocery" },
    { name: "Furniture", link: "/furniture" },
    { name: "Sports", link: "/sports" },
    { name: "Food", link: "/food" },
  ];

  return (
    <main style={styles.page}>
      
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div>
          <p style={styles.subtitle}>Welcome to MyShop</p>
          <h1 style={styles.title}>Simple, Stylish, and Fast</h1>
          <p style={styles.description}>
            Discover curated products for every lifestyle.
          </p>

          <button
            style={styles.button}
            onClick={() => navigate("/electronics")}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section style={styles.categorySection}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Shop by Category
        </h2>

        <div style={styles.grid}>
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

    </main>
  );
};

/* Reusable Card Component */
const CategoryCard = ({ name, link }) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div style={styles.card}>
        <h3>{name}</h3>
      </div>
    </Link>
  );
};

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    padding: "40px 20px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "60px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#2563eb",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "2.5rem",
    margin: "15px 0",
  },
  description: {
    maxWidth: "500px",
    margin: "0 auto 20px",
    color: "#555",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  categorySection: {
    marginTop: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "30px",
    textAlign: "center",
    borderRadius: "15px",
    background: "#f1f5f9",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default Home;