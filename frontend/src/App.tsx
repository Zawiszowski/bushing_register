

import Home from './pages/Home/home';
import Navbar from './components/Navbar/navbar';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Footer from './components/Footer/footer';
import  { AuthProvider,  } from './context/AuthContext';
import { GlobalStyle } from './styles/global.styles';
import AuthComponent from './pages/Login/login2';
import BushingRegister from './pages/Register/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import StiffnesCalculator from './pages/StiffnessCalculator/stiffnesCalculator';
import { ToastContainer } from 'react-toastify';

function App(){


    return (  
      <>
      <GlobalStyle/>
      
       
        <Router>
          <AuthProvider>
            <Navbar/>
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark">
                </ToastContainer>
          
            <Routes>
              
              <Route path='/' element={<Home></Home>}></Route>
              <Route path='/register' element={<BushingRegister></BushingRegister>}></Route>
              <Route path='/calculator' element={<StiffnesCalculator></StiffnesCalculator>}></Route>
              <Route path='/login' element={<AuthComponent></AuthComponent>}></Route>

            </Routes>
          </AuthProvider>
          <Footer></Footer>
        </Router>

      </>
        
    )
  }
export default App;
