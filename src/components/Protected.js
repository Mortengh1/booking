import { Navigate } from "react-router-dom";

//If the user is not logged in, it navigates the the login page when trying to acces other pages
const Protected = ({ isLoggedIn, children }) => {
if (!isLoggedIn) {
return <Navigate to="/login" replace />;
}
return children;
};
export default Protected;