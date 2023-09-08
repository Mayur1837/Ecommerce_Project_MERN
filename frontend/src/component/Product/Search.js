import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Search.css"
import MetaData from '../layout/MetaData';


const Search = () => {

    const[keyword,setKeyword]=useState("");
    const navigate=useNavigate();
    const serachsubmithandler=(event)=>{
      event.preventDefault();
      if(keyword.trim())
      {
          navigate(`/products/${keyword}`);
      }
      else{
        navigate("/products");
      }
    }
  return (
    <>
    {/* <form className='serachBox' onSubmit={serachsubmithandler}> 
    <input type ="text" placeholder='Search a Product...' 
    onChange={(e)=> setKeyword(e.target.value)}></input>
    <input type="submit" value="Search" />
    </form> */}

 <MetaData title="SEARCH--ECOMMERCE"/>
<div className='serachBox'>
<form class="search-box" onSubmit={serachsubmithandler}>
  <input class="s-box" type="text" name="search" placeholder="Type keyword" onChange={(e)=> setKeyword(e.target.value)} />
  <button class="s-btn"  type="submit" href="">
  <i class="fab fa-searchengin"></i>
  
  </button>
</form>
</div>


    

    </>
  )
}

export default Search
