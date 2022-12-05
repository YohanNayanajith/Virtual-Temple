import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CellTowerIcon from "@mui/icons-material/CellTower";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
// import { useSelector } from "react-redux";
export const SlideBarListItems = () => {
  // const user = useSelector((state) => state.user.currentUser);
  // const userType = user.userrole;
  let listItems = [
    {
      id: "leftbar-listItem-1",
      listName: "Dashboard",
      icon: <BookmarksIcon />,
      link: "/dashboard",
      name:"dashboard"
    },
    {
      id: "leftbar-listItem-2",
      listName: "Manage Normal Users",
      link: "/user",
      icon: <BookmarksIcon />,
      hasExpand: false,
      name:"view_users"
    },
    {
      id: "leftbar-listItem-3",
      listName: "Manage Admin Users",
      link: "/userAdmin",
      icon: <BookmarksIcon />,
      hasExpand: false,
      name:"view_users"
    },
    {
      id: "leftbar-listItem-4",
      listName: "Manage Events",
      icon: <BookmarksIcon />,
      hasExpand: false,
      link: "/event",
      name:"view_events"
    },
    {
      id: "leftbar-listItem-5",
      listName: "Manage Advertisements",
      icon: <BookmarksIcon />,
      hasExpand: false,
      link: "/advertisement",
      name:"view_advertisement"
    },
    {
      id: "leftbar-listItem-6",
      listName: "Manage Posts",
      icon: <BookmarksIcon />,
      hasExpand: false,
      link: "/post",
      name:"view_posts"
    },
  ];

  return listItems;
};
