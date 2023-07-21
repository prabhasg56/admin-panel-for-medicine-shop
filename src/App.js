import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Home from './pases/Home';
import Cart from './pases/Cart';

function App() {
  return (
    <div className="App">
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='cart' element = {<Cart/>}/>
      <Route path='/*' element={<Navigate to="/" />}/>
    </Routes>
    </div>
  );
}

export default App;
