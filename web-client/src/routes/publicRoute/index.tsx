import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

interface Props {
  path: string | undefined;
  children: any;
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PublicRoute: React.FC<Props> = ({ path, children, ...rest }) => {
  const isLoggedIn = useAppSelector((state) => state.loggedin.isLoggedIn);

  return (
    <Route
      {...rest}
      path={path}
      render={({ location }) =>
        isLoggedIn ? (
          <Redirect
            to={{
              pathname: '/home',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PublicRoute;
