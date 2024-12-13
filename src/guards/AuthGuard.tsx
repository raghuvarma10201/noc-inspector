import React, { useEffect } from 'react';
import { Route, Redirect, RouteProps, useHistory } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';
interface AuthGuardProps extends RouteProps {
  component: React.ComponentType<any>;
  roles: any
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component: Component, roles, ...rest }) => {
  const { isLoggedIn, userData } = useAuth();
  console.log(userData.user_type);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      // Redirect to reset password if the user needs a password reset
      if (userData.password_reset == 1) {
        history.replace('/reset-password');
        return;
      }
    } else {
      // Redirect to login if the user is not authenticated
      history.replace('/home');
    }
  }, [isLoggedIn, history]);
  return (
    <Route {...rest} render={(props) => {
      if (!isLoggedIn) {
        return <Redirect to='/home' />;
      } else if (roles && !roles.includes(parseInt(userData.user_type))) {
        return <Redirect to='/' />;
      }

      return <Component {...props} />;
    }} />

  )
}

export default AuthGuard;
