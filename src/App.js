import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'


import "./App.css"

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login}/>
    <ProtectedRoute exact path="/" component={Home}/>
    <Route exact path="/register" component={Register}/>
  </Switch>
)

export default App
