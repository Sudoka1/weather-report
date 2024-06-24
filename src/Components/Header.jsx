import { useState } from "react";
import "./Header.css";

const Header = ({ title, subtitle, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="display-4">{title}</h1>
        {subtitle && <h2 className="lead">{subtitle}</h2>}
        <div className="input-group mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <div className="input-group-append">
            <button className="btn btn-light" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
