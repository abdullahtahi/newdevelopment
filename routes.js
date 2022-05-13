import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
  Mapview,
} from "./view";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import PrivateRoute from "./routing/PrivateRoute";
import { useSelector } from "react-redux";
import Customer from "./view/User/Customer";
import ViewUser from "./view/User/ViewUser";
import BookingHistory from "./view/User/BookingHistory";

import Owners from "./view/User/Owner";
import Support from "./view/Support/Support";
import SupportForm from "./view/Support/SupportForm";
import Admin from "./view/Admin/Admin";
import AdminForm from "./view/Admin/AdminForm";
import Car from "./view/Car/Car";
import CarView from "./view/Car/CarView";
import AddCar from "./view/CarForm/AddCar";
import EditCar from "./view/CarForm/EditCar";
import Brand from "./view/Brand/Brand";
import BrandForm from "./view/Brand/BrandForm";
import CarCategory from "./view/VehicleType/CarCategoryTable";
import CarCategoryForm from "./view/VehicleType/CarCategoryForm";
import CarCategoryEdit from "./view/VehicleType/CarCategoryEdit";
import CarName from "./view/Car_Name/CarName";
import CarNameForm from "./view/Car_Name/CarNameFrom";
import Booking from "./view/Booking/Booking";
import BookingView from "./view/Booking/BookingView.js";
import CompanyEarnings from "./view/CompanyEarnings/CompanyEarnings.js";
import Dispute from "./view/Dispute/Dispute";
import DisputeForm from "./view/Dispute/DisputeForm";
import UserWallet from "./view/UserSummary/UserWallet";
import { MapRegions } from "./view/MapView";

function Routes() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const authenticated = useSelector((state) => state.auth.authenticated);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Router>
      <Switch>
        <Route path="/resetpassword" exact component={ResetPassword} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/register" exact component={Register} />
        <Route path="/" exact component={Login} />
      </Switch>

      <div style={{ display: "flex" }}>
        {authenticated && (
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        )}
        <div style={{ width: "100%" }}>
          {authenticated && (
            <>
              <Navbar handleDrawerToggle={handleDrawerToggle} />
              <div style={{ marginTop: "80px" }}></div>
            </>
          )}

          <Switch>
            {/* <PrivateRoute path="/dashboard" exact component={Dashboard} /> */}
            <PrivateRoute
              path="/changepassword"
              exact
              component={ChangePassword}
            />
            <PrivateRoute path="/customers" exact component={Customer} />
            <PrivateRoute path="/captains" exact component={Owners} />
            <PrivateRoute path="/customers/:id" exact component={ViewUser} />
            <PrivateRoute path="/captains/:id" exact component={ViewUser} />
            <PrivateRoute
              path="/captain/bookinghistory/:id"
              exact
              component={BookingHistory}
            />
            <PrivateRoute path="/support" exact component={Support} />
            <PrivateRoute path="/support/add" exact component={SupportForm} />
            <PrivateRoute path="/cars" exact component={Car} />
            <PrivateRoute path="/cars/:id" exact component={CarView} />
            <PrivateRoute path="/admins" exact component={Admin} />
            <PrivateRoute path="/admins/add" exact component={AdminForm} />
            <PrivateRoute path="/addcar" exact component={AddCar} />
            <PrivateRoute path="/editcar/:id" exact component={EditCar} />
            <PrivateRoute path="/disputes" exact component={Dispute} />
            <PrivateRoute
              path="/dispute/edit/:id"
              exact
              component={DisputeForm}
            />

            <PrivateRoute path="/company/add" exact component={BrandForm} />
            <PrivateRoute path="/company" exact component={Brand} />
            <PrivateRoute
              path="/company/edit/:id"
              exact
              component={BrandForm}
            />

            <PrivateRoute path="/types" exact component={CarCategory} />
            <PrivateRoute
              path="/category/add"
              exact
              component={CarCategoryForm}
            />
            <PrivateRoute
              path="/category/edit/:id"
              exact
              component={CarCategoryEdit}
            />
            <PrivateRoute path="/carname/add" exact component={CarNameForm} />
            <PrivateRoute path="/carname" exact component={CarName} />
            <PrivateRoute
              path="/carname/edit/:id"
              exact
              component={CarNameForm}
            />
            <PrivateRoute path="/bookings" exact component={Booking} />
            <PrivateRoute path="/bookings/:id" exact component={BookingView} />
            <PrivateRoute
              path="/companyearnings"
              exact
              component={CompanyEarnings}
            />
            <PrivateRoute path="/mapbounds" exact component={Mapview} />
            <PrivateRoute path="/regions" exact component={MapRegions} />

            <PrivateRoute path="/usersummary" component={UserWallet} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Routes;
