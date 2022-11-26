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
    },
    {
      id: "leftbar-listItem-2",
      listName: "Manage Users",
      icon: <BookmarksIcon />,
      hasExpand: true,
      expand: [
        {
          id: "leftbar-listItem-2-1",
          listName: "View Users",
          link: "/user",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
        {
          id: "leftbar-listItem-2-2",
          listName: "Create User",
          link: "/create-user",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
        {
          id: "leftbar-listItem-2-3",
          listName: "Update User",
          link: "/update-user",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
      ],
    },
    {
      id: "leftbar-listItem-3",
      listName: "Manage Events",
      icon: <BookmarksIcon />,
      hasExpand: true,
      expand: [
        {
          id: "leftbar-listItem-3-1",
          listName: "View Events",
          link: "/event",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
        {
          id: "leftbar-listItem-3-2",
          listName: "Create Event",
          link: "/create-event",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
        {
          id: "leftbar-listItem-3-3",
          listName: "Update Event",
          link: "/update-event",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
      ],
    },
    {
      id: "leftbar-listItem-4",
      listName: "Manage Advertisements",
      icon: <BookmarksIcon />,
      hasExpand: true,
      expand: [
        {
          id: "leftbar-listItem-4-1",
          listName: "View Advertisements",
          link: "/advertisement",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
        {
          id: "leftbar-listItem-4-2",
          listName: "Create Advertisement",
          link: "/create-advertisement",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
        {
          id: "leftbar-listItem-4-3",
          listName: "Update Advertisement",
          link: "/update-advertisement",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
      ],
    },
    {
      id: "leftbar-listItem-5",
      listName: "Manage Posts",
      icon: <BookmarksIcon />,
      hasExpand: true,
      expand: [
        {
          id: "leftbar-listItem-5-1",
          listName: "View Posts",
          link: "/post",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
        {
          id: "leftbar-listItem-5-2",
          listName: "Create Post",
          link: "/create-post",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
        {
          id: "leftbar-listItem-5-3",
          listName: "Update Post",
          link: "/update-post",
          icon: <BookmarksIcon />,
          hasExpand: false,
        },
      ],
    },
  ];

  return listItems;
};
