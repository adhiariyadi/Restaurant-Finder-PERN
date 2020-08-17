import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Edit from "./routes/Edit";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="container mt-2">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/restaurant/:id" component={Detail} />
            <Route exact path="/restaurant/:id/edit" component={Edit} />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
