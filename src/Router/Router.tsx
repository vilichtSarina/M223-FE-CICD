import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import LandingPage from "../components/pages/LandingPage/LandingPage";
import authorities from "../config/Authorities";
import Unauthorized from "../components/pages/ErrorPages/Unauthorized";
import DetailPage from "../components/pages/DetailPage/DetailPage";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />

      <Route
        path={"/home"}
        element={
          <PrivateRoute
            authorities={[{ id: "", name: authorities.DEFAULT }]}
            element={<LandingPage />}
          />
        }
      />
      <Route
        path={"/users/:id"}
        element={
          <PrivateRoute
            authorities={[{ id: "", name: authorities.DEFAULT }]}
            element={<DetailPage />}
          />
        }
      />

      <Route
        path={"/users/all"}
        element={
          <PrivateRoute
            authorities={[
              { id: "", name: authorities.USER_DELETE },
              { id: "", name: authorities.USER_MODIFY },
              { id: "", name: authorities.DELETE_FOREIGN_POST },
              { id: "", name: authorities.MODIFY_FOREIGN_POST },
            ]}
            element={<UserTable />}
          />
        }
      />
      <Route
        path="/useredit"
        element={
          <PrivateRoute
            authorities={[
              { id: "", name: authorities.USER_DELETE },
              { id: "", name: authorities.USER_MODIFY },
              { id: "", name: authorities.DELETE_FOREIGN_POST },
              { id: "", name: authorities.MODIFY_FOREIGN_POST },
            ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path="/useredit/:userId"
        element={
          <PrivateRoute
            authorities={[
              { id: "", name: authorities.USER_DELETE },
              { id: "", name: authorities.USER_MODIFY },
              { id: "", name: authorities.DELETE_FOREIGN_POST },
              { id: "", name: authorities.MODIFY_FOREIGN_POST },
            ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />

      <Route path={"/unauthorized"} element={<Unauthorized />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
