import { useState, useRef, useContext } from 'react';
import AuthContext from '../Store/auth-store';
import { useHistory  } from 'react-router-dom';
import classes from './AuthForm.module.css';


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const inputEmail = useRef();
  const inputPassword = useRef();
  const history = useHistory();
  const [request,setRequest] = useState(false);

  const authCtrx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    
    setIsLogin((prevState) => !prevState);
  };
  const formHandler = async (e) => {
  e.preventDefault();

  let enteredEmail = inputEmail.current.value;
  let enteredPassword = inputPassword.current.value;

  if (enteredEmail === '' || enteredPassword === '') {
    alert('Please fill email and password');
    return;
  }

  setRequest(true);

  try {
    let url;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`;
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const expiryTime = Date.now() + (1 * 60 * 1000);
    localStorage.setItem('expiryTime',expiryTime);

    authCtrx.login(data.idToken);
    if (!response.ok) {
      throw new Error(data.error.message);
    }
    history.replace('/')
    console.log(data);
  } catch (err) {
    alert(err.message);
  } finally {
    inputEmail.current.value = "";
    inputPassword.current.value = "";
    setRequest(false);
  }
};

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={formHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={inputEmail}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            ref={inputPassword}
          />
        </div>
        <div className={classes.actions}>
          <button 
            type='submit'
            className={classes.toggle}>
            {request ? 'Sending Request...' : (isLogin ? 'Login' : 'Sign Up')}    
          </button>

          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
