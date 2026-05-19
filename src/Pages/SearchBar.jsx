import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="position-relative">
        <input
          type="text"
          className="form-control ps-5"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FaSearch
          className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
        />
      </div>
    </form>
  );
}