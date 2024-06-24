import { useState } from "react";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");

  const handleSearch = (searchTerm) => {
    setCity(searchTerm);
  };

  return (
    <div className="App">
      <Header
        title="Weather App"
        subtitle="Your city's weather at a glance"
        onSearch={handleSearch}
      />
      <Hero city={city} />
      <Footer />
    </div>
  );
};

export default App;
