import { createBrowserRouter } from "react-router-dom";
import Main from "../layOut/Main";
import Home from "../pages/home/Home/Home";
import Register from "../pages/shared/register/Register";
import Login from "../pages/shared/login/Login";
import DonationRequest from "../pages/shared/donationRequest/DonationRequest";
import DonationBlog from "../pages/shared/donationBlog/DonationBlog";
import PrivateRoute from "./PrivateRout";
import Dashboard from "../layOut/Dashboard";
import Funding from "../pages/shared/funding/Funding";
import PrivacyPolicy from "../pages/shared/privacyPolicy/PrivacyPolicy";
import ContactUsF from "../pages/shared/contactUsF/ContactUsF";
import CreateRequest from "../pages/dashboard/donor/createRequest/CreateRequest";
import MyRequest from "../pages/dashboard/donor/myRequest/MyRequest";
import DonorRequestUpdate from "../pages/dashboard/donor/donorRequestUpdate/DonorRequestUpdate";
import AllUsers from "../pages/dashboard/admin/allUsers/AllUsers";
import DonorSearchPage from "../pages/shared/donorSearchPage/DonorSearchPage";
import DonationDetails from "../pages/shared/donationDetails/DonationDetails";
import AllDonationRequest from "../pages/dashboard/commonDashboard/admin_volunteer/allDonationRequest/AllDonationRequset";
import ContentManagement from "../pages/dashboard/commonDashboard/admin_volunteer/contentManagement/ContentManagement";
import AddBlog from "../pages/dashboard/commonDashboard/admin_volunteer/addBlog/AddBlog";
import UpdateBlog from "../pages/dashboard/commonDashboard/admin_volunteer/updateBlog/UpdateBlog";
import DashboardProfile from "../pages/dashboard/commonDashboard/dashboardProfile/DashboardProfile";
import DashboardWelCome from "../pages/dashboard/commonDashboard/dashboardWelcome/DashboardWelcome";
import ProfileUpdate from "../pages/dashboard/commonDashboard/profileUpdate/ProfileUpdate";
import VolunteerRoute from "./VolunteerRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "donationRequest",
        element: <DonationRequest></DonationRequest>,
      },
      {
        path: "donationBlogs",
        element: <DonationBlog></DonationBlog>,
      },
      {
        path: "funding",
        element: (
          <PrivateRoute>
            <Funding></Funding>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "contactUsF",
        element: <ContactUsF></ContactUsF>,
      },
      {
        path: "donorSearch",
        element: <DonorSearchPage></DonorSearchPage>,
      },
      {
        path: "donationDetails/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  // For Dashboard Route:
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // all Common Route:
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardWelCome></DashboardWelCome>,
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <DashboardProfile></DashboardProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "donationUsers/:id",
        element: (
          <PrivateRoute>
            <ProfileUpdate></ProfileUpdate>
          </PrivateRoute>
        ),
      },

      // For Donor Route:
      {
        path: "create-donation-request",
        element: (
          <PrivateRoute>
            <CreateRequest></CreateRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "myRequest",
        element: (
          <PrivateRoute>
            <MyRequest></MyRequest>
          </PrivateRoute>
        ),
      },

      {
        path: "donatorCreateRequest/:id",
        element: (
          <PrivateRoute>
            <DonorRequestUpdate></DonorRequestUpdate>
          </PrivateRoute>
        ),
      },

      // For admin and Volunteer route:
      {
        path: "all-blood-donation-request",
        element: (
          <PrivateRoute>
            <VolunteerRoute>
              <AllDonationRequest></AllDonationRequest>
            </VolunteerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <PrivateRoute>
            <VolunteerRoute>
              <ContentManagement></ContentManagement>
            </VolunteerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <PrivateRoute>
            <VolunteerRoute>
              <AddBlog></AddBlog>
            </VolunteerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "content-management/add-blog/:id",
        element: (
          <PrivateRoute>
            <VolunteerRoute>
              <UpdateBlog></UpdateBlog>
            </VolunteerRoute>
          </PrivateRoute>
        ),
      },

      // for admin Route:
      {
        path: "allUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers></AllUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
