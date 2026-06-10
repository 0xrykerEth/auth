import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import AuthContext from '../Store/auth-store';
import { useContext } from 'react';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);

  const LoggedIn = authCtx.isLoggedIn;

  return (
    <section className={classes.profile}>
      {LoggedIn && <><h1>Your User Profile</h1><ProfileForm /></>}
    </section>
  );
};

export default UserProfile;
