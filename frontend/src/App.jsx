import {Routes, Route} from 'react-router';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signup';

function App(){
 
  return(
    <>
    <Routes>
      <Route path="/" element={<Homepage></Homepage>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/signup" element={<Signup></Signup>} />
    </Routes>
    </>
  )
}
export default App;