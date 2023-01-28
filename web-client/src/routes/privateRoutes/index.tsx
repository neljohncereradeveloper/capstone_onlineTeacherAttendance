import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

interface Props {
  path: string | undefined;
  children: any;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute: React.FC<Props> = ({ path, children, ...rest }) => {
  const isLoggedIn = useAppSelector((state) => state.loggedin.isLoggedIn);

  return (
    <Route
      {...rest}
      exact
      path={path}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
