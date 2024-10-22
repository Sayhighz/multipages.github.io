import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import Home from "./pages/Home/Home";
import Todo from "./pages/Todo/Todo";
import Layout from "./layouts/Layout/Layout";
import Animation from './pages/Animation/Animation';
import Carts from "./pages/Carts/Carts";
import Products from "./pages/Products/Products";
import Componnets from "./pages/Componnets/Componnets";
import Calculator from "./pages/Calculator/Calculator";
import { fetchProducts } from "../data/products";
import Login from "./pages/Login/Login";

function App() {
  const [products, setProdusts] = useState([]);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    setProdusts(fetchProducts());
  }, []);
  useEffect(() => {
    console.log(products)
  })

  if (token === ''){

    return (
      <Login setToken={setToken} setRole={setRole}/>
    )
  }else{
    return (
      <>
        <HashRouter>
          <Routes>
            <Route element={<Layout product={products} cart={cart} setToken={setToken} />}>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />}></Route>
              <Route path="/animation" element={<Animation />}></Route>
              <Route path="/componnets" element={<Componnets />}></Route>
              <Route path="/todo" element={<Todo />}></Route>
              <Route path="/products" element={<Products product={products} cart={cart} setCart={setCart}/>}></Route>
              <Route path="/carts" element={<Carts cart={cart} setCart={setCart}/>}></Route>
            </Route>
          </Routes>
        </HashRouter>
      </>
    );
  }
  }


export default App;
