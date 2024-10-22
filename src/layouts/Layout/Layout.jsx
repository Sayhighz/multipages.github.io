import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../../layouts/Footer/Footer';
import { Header } from '../../layouts/Header/Header';
import { Navbar } from '../../layouts/Navbar/Navbar';

const Layout = ({product, cart, setToken}) => {
  return (
    <div>
      <Header />
      <Navbar product={product} cart={cart} setToken={setToken}/>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
