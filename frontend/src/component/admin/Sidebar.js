import React from 'react';
import"./sidebar.css"
import logo from "../../images/logo.png"
import { useNavigate } from 'react-router-dom';
import { TreeItem,TreeView } from '@material-ui/lab';
// import Link from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Sidebar = () => {

    const navigate=useNavigate();
  return (
    // <div className='sidebar'>
    //     <img src={logo} alt="" onClick={()=>{
    //         navigate("/");
    //     }} className='logoicon'/>
   
    //  <p>
    //     <DashboardIcon className='navigateclass' onClick={()=>{
    //        navigate("/admin/dashboard"); 
    //     }}/>
        
    //  </p>

    //  <TreeView
    //  defaultCollapseIcon={<ExpandMoreIcon/>}
    //  defaultExpandIcon={<ImportExportIcon/>}
    //  >
    //     <TreeItem className="mainItem" nodeId='1' label="Products">
    //         <TreeItem className="navigateclass" nodeId='2' label="All" icon={<PostAddIcon/>} onClick={()=>{
    //             navigate("/admin/products")
    //         }}></TreeItem>
    //         <TreeItem className='navigateclass' nodeId='3' label="Create" icon={<AddIcon/>} onClick={()=>{
    //             navigate("/admin/product")
    //         }}></TreeItem>
    //     </TreeItem>
       
    //  </TreeView>
    
    // <p className='navigateclass' onClick={()=>{navigate("/admin/orders")}}>
    //     <ListAltIcon/>
    //     Orders
    // </p>
    // <p className='navigateclass' onClick={()=>{navigate("/admin/users")}}>
    //     <PeopleIcon/>
    //     Users
    // </p>
    // <p className='navigateclass' onClick={()=>{navigate("/admin/reviews")}}>
    //   <RateReviewIcon/>
    //   Reviews
    // </p>


    // </div>
    <div className="sidebar">
      <a href="/">
        <img src={logo} alt="Ecommerce" />
      </a>
      <a href="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </a>
      <a>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <a href="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </a>

            <a href="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </a>
          </TreeItem>
        </TreeView>
      </a>
      <a href="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </a>
      <a href="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </a>
      <a href="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </a>
    </div>
  )
}

export default Sidebar
