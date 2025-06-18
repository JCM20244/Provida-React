import React from 'react';
import { Navigate , Route} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export default function PrivateRoute({component: Component, ...rest}) {
    const {isLoggedIn} = useAuth();
    
  return (
    <Route {...rest} render ={(props)=> isLoggedIn?(<Component {...props}/>):(<Navigate to={'/'} replace/>)}/>
  );
}
