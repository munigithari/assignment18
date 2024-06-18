import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import AllJobs from './components/AllJobs'
import AboutJob from './components/AboutJob'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'

import './App.css'

const App = () => {
  ;<Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={AllJobs} />
    <ProtectedRoute exact path="/jobs/:id" component={AboutJob} />
    <Route exact path="/not-found" compoent={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
}

export default App
