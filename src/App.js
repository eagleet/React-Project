import { Route, Switch } from "react-router-dom";
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
            <Route path="/" exact component={Home}></Route>
            <Route path="/welcome" component={Welcome}></Route>
            <Route path="/products" exact component={Products}></Route>
            <Route path="/supplier" exact component={Supplier}></Route>
            <Route path="/supplier/:id" component={SupplierInfo}></Route>
            <Route path="/supplier/new" component={AddSupplier}></Route>
            <Route path="/notifications" component={Notifications}></Route>
            <Route path="/products/:productId" component={ProductDetail}></Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
