import classes from './ProfileForm.module.css';
import AuthContext from '../Store/auth-store';
import { useHistory  } from 'react-router-dom';
import { useContext, useRef } from 'react';

const ProfileForm = () => {
  const authCtrx = useContext(AuthContext)
  const history = useHistory ();
  const enteredPassword = useRef();

  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDf8O5Y9eAbpxmlVyYzrANFJODw3EfHSwA`,{
        method : 'POST',
        body : JSON.stringify({
          idToken : authCtrx.token,
          password : enteredPassword.current.value,
          returnSecureToken : true,
        }),
        headers : {
          'Content-Type' : 'application/json'
        }

      })

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.error.message)
      }

      authCtrx.login(data.idToken)

      if(response.ok){
        authCtrx.logout();
        history.replace('/')
      }
    }catch(err){
      console.log(err)
    }finally{

    }
  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={enteredPassword}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
