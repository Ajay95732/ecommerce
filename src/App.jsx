import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Electronics from "./Pages/Electronics";
import Clothes from "./Pages/Clothes";
import Grocery from "./Pages/Grocery";
import Sports from "./Pages/Sports";
import Food from "./Pages/Food";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Furniture from "./Pages/Furniture";

import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/electronics" element={<Electronics />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/food" element={<Food />} />
        <Route path="/furniture" element={<Furniture />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;