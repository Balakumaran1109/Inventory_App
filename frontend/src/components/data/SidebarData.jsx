import React from "react";
import { MdAccountBox } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { TbMessageReport } from "react-icons/tb";

const menu = [
  {
    title: "Dashboard",
    icon: <MdOutlineDashboardCustomize size={25}/>,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <MdOutlineAddBox size={25}/>,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <MdAccountBox size={25}/>,
    children: [
      {
        title: "Profile",
        icon: <MdAccountBox size={25}/>,
        path: "/profile",
      },
      {
        title: "Edit Profile",
        icon: <MdAccountBox size={25}/>,
        path: "/addProfile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <TbMessageReport size={25}/>,
    path: "/contact-us",
  },
];

export default menu;
