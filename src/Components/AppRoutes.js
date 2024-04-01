import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustCRUD from './CustCRUD';
import OrderCRUD from './OrderCRUD';
import NavBar from './MenuBar';
import ProdCRUD from './ProdCRUD';
import RoleCRUD from './RoleCRUD';
import Login from './Login';
import MenuBar from './MenuBar';
import Admin from './Admin';
import Manager from './Manager';
import Professional from './Professional';
import Home from './Home';
const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <>
                    <MenuBar /> 
                </>
                <div className='container'>
                    <Routes >
                        <Route exact path='customers' element={<CustCRUD />} />
                        <Route exact path='orders' element={<OrderCRUD/>}/>
                        <Route exact path='products' element={<ProdCRUD />} />
                        <Route exact path='roles' element={<RoleCRUD />} />
                        <Route exact path='login' element={<Login />} />
                        <Route exact path='admin' element={<Admin />} />
                        <Route exact path='Manager' element={<Manager />} />
                        <Route exact path='Professional' element={<Professional/>} />
                        <Route exact path='Home' element={<Home/>} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
};

export default AppRoutes;