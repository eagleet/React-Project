import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from 'react';

import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import Notifications from "./pages/Notifications";
import ProductDetail from "./pages/ProductDetail";
import SideBar from "./componentes/SideBar";
import MainHeader from "./componentes/MainHeader";
import Supplier from "./pages/SuppliersDetails";
import SupplierInfo from "./pages/SupplierInfo";
import Home from "./pages/Home";
import AddSupplier from "./pages/AddSupplier";
import AuthPage from './pages/AuthPage';
import AuthContext from "./store/auth-context";


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="main_container">
      <header>
        <MainHeader />
      </header>
      <div className="container">
        <SideBar />
        <main>
          <Switch>
            {!authCtx.isLoggedIn && (
              <Route path='/auth' component={AuthPage}></Route>
            )}
            <Route path="/welcome" component={Welcome}/>
            {authCtx.isLoggedIn &&       <>
            <Route path="/" exact component={Home}></Route>
            <Route path="/welcome" component={Welcome}></Route>
            <Route path="/products" exact component={Products}></Route>
            <Route path="/supplier" exact component={Supplier}></Route>
            <Route path="/supplier/create" component={AddSupplier}></Route>
            <Route path="/supplier/:id" component={SupplierInfo}></Route>
            <Route path="/notifications" component={Notifications}></Route>
            <Route path="/products/:productId" component={ProductDetail}></Route>
            </>}
            {!authCtx.isLoggedIn && <Redirect to='/auth' />}
            <Route path='*'>
              <Redirect to='/welcome'/>
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
