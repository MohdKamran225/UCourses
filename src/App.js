import { Home } from "./Components/Home";
import { Course } from "./Components/CourseDetails";
import { Nav } from "./Shared/Nav";
import { Footer } from "./Shared/Footer";
import { Login } from "./Auth/Login";
import { Error } from "./Components/Error";
import { Registeration } from "./Auth/Registeration";
import { Cart } from "./Components/Cart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Admin } from "./Admin/Admin";
import { AddCourse } from "./Admin/AddCourse";

function App() {
  return (
    <Router>
      <div className=" h-[100%]">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/courses/:id" component={Course} />
          <Route path="/cart" component={Cart} />
          <Route path="/admin" component={Admin} />
          <Route path="/addCourse" component={AddCourse} />
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={Registeration} />
          <Route path="*" component={Error} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
