import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './login/Login.jsx';
import SignUp from './login/SignUp.jsx';
import MapContainer from './map/MapContainer.jsx';
import TimeLine from './timeline/Timeline.jsx';
import SplashPage from './login/SplashPage.jsx';
import CommentPage from './timeline/Comment.jsx';
import NotFound from './NotFound.jsx';
import Profile from './profile/Profile.jsx';
import Search from './search/BirdCall.jsx'
import './App.scss';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SplashPage} />
      <Route path="/map" component={MapContainer} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/timeline" component={TimeLine} />
      <Route path="/logout" component={SplashPage} />
      <Route path="/comment" component={CommentPage} />
      <Route path="/search" component={Search} />
      <Route path="/profile" component={Profile} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>  
);

export default App;