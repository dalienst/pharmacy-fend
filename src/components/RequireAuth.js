import { Navigate } from "react-router-dom";

// const RequireAuth = () => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         auth?.user
//             ? <Outlet />
//             : <Navigate to='/login' state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;

const RequireAuth = ({children, user}) => {
    if(!user) {
        return <Navigate to='/login' />;
    }
    return children;
    
}
export default RequireAuth;
