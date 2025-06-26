import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import AppHeader from "./components/app-header/app-header";
import AppFooter from "./components/app-footer/app-footer";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Homepage from "./components/homepage/homepage";
import ComicIssuePage from "./components/comic-issue/comic-issue-page";
import Search from "./components/search/search";
import SignPage from "./components/sign/sign-page";
import ProfilePage from "./components/profile/profile-page";
import EditProfilePage from "./components/edit-profile/edit-profile-page";
import Library from "./components/library/library";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ComicReviewCreationPage from "./components/comic-review-creation/comic-review-creation-page";
import SignoutPage from "./components/signout/signout-page";
// import SignDependentRoute from "./components/router/sign-dependent-route";
import ComicReviewPage from "./components/comic-review/comic-review-page";
import ComicReviewUpdatePage from "./components/comic-review-creation/comic-review-update-page";
import ErrorPage from "./components/error-page/error-page";
import CustomizedSnackbar from "./components/customized-snackbar/customized-snackbar";
import ProtectedRoute from "./components/router/protected-route";
// import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#202020",
      },
      secondary: {
        main: "#e23636",
      },
    },
  });

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <AppHeader></AppHeader>
        <CustomizedSnackbar />
        {/* <ErrorBoundary FallbackComponent={ErrorPage}> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/comic/:comicId" element={<ComicIssuePage />} />
          <Route path="/error-page" element={<ErrorPage />} />

          <Route element={<ProtectedRoute forSigned={false} />}>
            <Route path="/sign/:form" element={<SignPage />} />
          </Route>

          <Route element={<ProtectedRoute forSigned={true} />}>
            <Route
              path="/comic/:comicId/reviews/create"
              element={<ComicReviewCreationPage />}
            />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route
              path="/reviews/:reviewId/update"
              element={<ComicReviewUpdatePage />}
            />
          </Route>

          <Route path="/signout" element={<SignoutPage />} />

          <Route path="/profile/:nickname" element={<ProfilePage />} />

          <Route path="/profile/:nickname/library" element={<Library />} />
          <Route path="/reviews/:reviewId" element={<ComicReviewPage />} />
        </Routes>
        {/* </ErrorBoundary> */}
        <AppFooter></AppFooter>
      </ThemeProvider>
    </div>
  );
}

export default App;
