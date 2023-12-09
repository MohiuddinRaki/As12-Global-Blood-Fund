import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import UseVolunteer from "../hooks/UseVolunteer";
import UseAuth from "../hooks/UseAuth";
import useAdmin from "../hooks/useAdmin";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const [isVolunteer, isVolunteerLoading] = UseVolunteer();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isVolunteerLoading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && (isVolunteer || isAdmin)) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default VolunteerRoute;

VolunteerRoute.propTypes = {
  children: PropTypes.node,
};
