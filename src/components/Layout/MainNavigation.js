import { Link } from 'react-router-dom';
import AuthContext from '../Store/auth-store';
import { useHistory } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import { useContext } from 'react';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const LoggedIn = authCtx.isLoggedIn;

  const logOutHandler = () => {
    authCtx.logOut();
    history.replace('/auth');
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!LoggedIn && 
          (<li>
            <Link to='/auth'>Login</Link>
          </li>)}
          {LoggedIn && 
            <li>
            <Link to='/profile'>Profile</Link>
          </li>
          }
          {LoggedIn && (<li>
            <button onClick={logOutHandler}>Logout</button>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
