import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import SearchBar from "../Pages/SearchBar";

export default function Navbar() {
  const navigate = useNavigate();

  const handleSearch = (term) => {
    if (!term.trim()) return;
    navigate(`/search/${term}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">

      {/* Logo */}
      <Link className="navbar-brand fw-bold" to="/">
        MyShop
      </Link>

      {/* Search Bar */}
      <div className="me-3 ms-auto" style={{ width: "250px" }}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Right Side */}
      <Link className="btn btn-light me-3" to="/login">
        Login
      </Link>

      <Link to="/cart" className="text-white">
        <FaShoppingCart size={22} />
      </Link>

    </nav>
  );
}