import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
    <Route>
      {
        () => (props.isLoggedIn
          ? <Component {...props} />
          : <Redirect to='./' />
        )
      }
    </Route>
);

export default ProtectedRoute;
