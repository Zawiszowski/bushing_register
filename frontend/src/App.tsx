

import Home from './pages/Home/home';
import Navbar from './components/Navbar/navbar';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Footer from './components/Footer/footer';
import  { AuthProvider,  } from './context/AuthContext';


function App(){


    return (
       
        <Router>
          <AuthProvider>
            <Navbar/>
          
            <Routes>
              
              <Route path='/' element={<Home></Home>}></Route>

            </Routes>
          </AuthProvider>
          <Footer></Footer>
        </Router>
        
    )
  }
export default App;
