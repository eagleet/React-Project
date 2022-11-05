import { Route, Switch } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
//import User from './pages/Supplier';
import Notifications from './pages/Notifications';
import ProductDetail from './pages/ProductDetail';
import SideBar from './componentes/SideBar';
import MainHeader from './componentes/MainHeader';
import Supplier from './pages/SupplierDetail';

function App() {
  return (
    <div className="main_container">
      <header>
        <MainHeader />
      </header>
      <div className="container">
        <SideBar />
        <main>
          <Switch>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
            <Route path="/supplier">
              <Supplier />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/products/:productId">
              <ProductDetail />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
