import React, {memo} from "react";
import SidebarPreloader from "./preloaders/SidebarPreloader";
import Category from "../pages/Home/Category";

const Sidebar = ({categories, isFetching}) => {
  return (
    <ul className="list-group col-3 mt-4">
      {isFetching
        ?
        Array(3).fill(0).map((loader, index) =>
          <SidebarPreloader key={index}/>)
        :
        <>
          <li className="list-group-item">Categories:</li>
          {categories && categories.map(category =>
            <Category key={category.id} {...category}/>
          )}
        </>
      }
    </ul>
  )
};

export default memo(Sidebar);