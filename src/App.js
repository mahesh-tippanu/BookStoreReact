import React,{Component} from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Forget from './pages/Forget';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

class App extends Component {
  render(){ 
    return(
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
           <Route path="/Signup" element={<Signup/>} />
            <Route path="/Home" element={<Home/>} /> 
            <Route path="/cart" element={<Cart/>} />
            <Route path="/order" element={<Order />} />
            <Route path="/Forget" element={<Forget/>} />
            

        </Routes>
      </Router>
    );
  } 
}
export default App;
