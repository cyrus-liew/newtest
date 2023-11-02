import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
  <div>
    {/* import header component  */}
    <Header />
    {/* children is use to include everything in mainlayout tag between header to footer */}
    {children}
    {/* import footer component  */}
    <Footer />
  </div>
  ); 
};

export default MainLayout;