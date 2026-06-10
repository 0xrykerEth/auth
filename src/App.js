import { Switch, Route } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './components/Store/auth-store';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const authCtrx = useContext(AuthContext)
  const login = authCtrx.isLoggedIn;
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
      </Switch>
    </Layout>
  );
}

export default App;
