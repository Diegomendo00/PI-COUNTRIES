import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import landingPage from "./components/landingPage/landingPage";
import Home from "./components/home/home";
import ActivityCreate from "./components/newActivity/newActivity";
import Details from "./components/details/details"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Countries</h1>
        <Switch>
          <Route exact path="/" component={landingPage} />
          <Route path="/home" component={Home} />
          <Route path="/activities" component={ActivityCreate} />
			 <Route path= "/countries/:id" component={Details}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
