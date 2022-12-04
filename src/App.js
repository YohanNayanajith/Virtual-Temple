import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';

import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { AdvertisementList } from "./pages/advertisement/AdvertisementList";
import { EventList } from "./pages/event/EventList";
import { PostList } from "./pages/post/PostList";
import { UserList } from "./pages/user/UserList";
import { UserCreate } from "./pages/user/UserCreate";
import { UserUpdate } from "./pages/user/UserUpdate";
import { Profile } from "./pages/user/Profile";
import { UserAdminList } from "./pages/user/UserAdminList";
import { UserAdminUpdate } from "./pages/user/UserAdminUpdate";
import { PostUpdate } from "./pages/post/PostUpdate";
import { NotFoundPage } from "./pages/NotFoundPage";
import { EventUpdate } from "./pages/event/EventUpdate";
import { EventCreate } from "./pages/event/EventCreate";
import { PostCreate } from "./pages/post/PostCreate";
import { AdvertisementUpdate } from "./pages/advertisement/AdvertisementUpdate";
import { AdvertisementCreate } from "./pages/advertisement/AdvertisementCreate";
import { UserManagement } from "./pages/userManagement/UserManagement";
import { ProfileUpdate } from "./pages/user/ProfileUpdate";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#007A31",
      },
      secondary: {
        main: "#52b202"
      },
      danger: {
        main: "#c62828"
      },
      blue: {
        main: "#1e88e5"
      }
    },
    typography: {
      // fontFamily: "Poppins",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
      h3 : {
        fontSize: '1.3rem',
        fontWeight: "bold",
        '@media (min-width:600px)': {
          fontSize: '1.7rem',
          fontWeight: "bold",
        },
      }
    },
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* user */}
          <Route path="/user" element={<UserList />} />
          <Route path="/createUser" element={<UserCreate />} />
          <Route path="/updateUser/:id" element={<UserUpdate />} />
          <Route path="/updateAdminUser/:id" element={<UserAdminUpdate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileUpdate" element={<ProfileUpdate />} />
          <Route path="/userAdmin" element={<UserAdminList />} />
          {/* Advertisement */}
          <Route path="/advertisement" element={<AdvertisementList />} />
          <Route path="/updateAdvertisement/:id" element={<AdvertisementUpdate />} />
          <Route path="/createAdvertisement" element={<AdvertisementCreate />} />
          {/* event */}
          <Route path="/event" element={<EventList />} />
          <Route path="/updateEvent/:id" element={<EventUpdate />} />
          <Route path="/createEvent" element={<EventCreate />} />
          {/* post */}
          <Route path="/post" element={<PostList />} />
          <Route path="/createPost" element={<PostCreate />} />
          <Route path="/updatePost/:id" element={<PostUpdate />} />

          {/* user management */}
          <Route path="/userManagement/:id" element={<UserManagement />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
