import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        <p className='explore-menu-text'>
            Discover a variety of delicious dishes with our Explore Menu section. From local favorites to international flavors, browse through curated categories to find meals that satisfy every craving. It's the easiest way to try something new or stick with your go-to comfort food — all in one place!
        </p>
        <div className="explore-menu-list">
            {menu_list.map((item, idx)=>{
                return(
                    <div key={idx} onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}className="explore-menu-list-item">
                        <img className={category===item.menu_name?"active":""}src={item.menu_image} alt="" />
                        <p>
                            {item.menu_name}
                        </p>
                    </div>
                )
            })}
        </div>
        <hr />
      
    </div>
  )
}

export default ExploreMenu
