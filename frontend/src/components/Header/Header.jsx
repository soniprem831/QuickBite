import React from 'react'
import './Header.css'
import ExploreMenu from '../ExploreMenu/ExploreMenu'
const Header = () => {
  const handleScrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className='header'>
    <div className='header-contents'>
      <h2>Get Your Favourite Meals Here</h2>
      <p>
        Hungry for something special? Browse, order, and enjoy meals crafted with premium ingredients by culinary experts. Easy, fast, and delicious. Your next meal is just a click away!
      </p>
      <button className='pointer'onClick={handleScrollToMenu} >View Menu</button>
    </div>
  </div>
  )
}

export default Header
