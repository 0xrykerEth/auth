import { Switch, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from './components/Store/auth-store';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const authCtrx = useContext(AuthContext)
  const login = authCtrx.isLoggedIn;

  useEffect(() =>{
    const checkToken =async()=>{
      if(!authCtrx.token){
        return
      }

      try{
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDf8O5Y9eAbpxmlVyYzrANFJODw3EfHSwA`,{
          method : 'POST',
          body : JSON.stringify({
            idToken : authCtrx.token
          }),
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        if(!response.ok){
          authCtrx.logOut();
        }
      }catch(err){
        authCtrx.logOut()
      }


    }
    checkToken();
  },[authCtrx])



  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!login && 
        (<Route path='/auth'>
          <AuthPage />
        </Route>)
        }
        <Route path='/profile'>
          {login && <UserProfile />}
          {!login && <Redirect to="/auth"/>}
        </Route>
        <Route path="*">
          <Redirect to="/auth"/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
