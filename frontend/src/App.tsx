

import Home from './pages/Home/home';
import Navbar from './components/Navbar/navbar';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Footer from './components/Footer/footer';
import  { AuthProvider,  } from './context/AuthContext';
import { GlobalStyle } from './styles/global.styles';
import AuthComponent from './pages/Login/login2';


function App(){


    return (  
      <>
      <GlobalStyle/>
      
       
        <Router>
          <AuthProvider>
            <Navbar/>
          
            <Routes>
              
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/login' element={<AuthComponent></AuthComponent>}></Route>

            </Routes>
          </AuthProvider>
          <Footer></Footer>
        </Router>

      </>
        
    )
  }
export default App;
