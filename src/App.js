import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';

import Login from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { AdvertisementList } from "./pages/advertisement/AdvertisementList";
import { EventList } from "./pages/event/EventList";
import { PostList } from "./pages/post/PostList";
import { UserList } from "./pages/user/UserList";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#007A31",
      },
      secondary: {
        main: "#52b202"
      }
    },
    typography: {
      // fontFamily: "Poppins",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,
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
          {/* Advertisement */}
          <Route path="/advertisement" element={<AdvertisementList />} />
          {/* event */}
          <Route path="/event" element={<EventList />} />
          {/* post */}
          <Route path="/post" element={<PostList />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
