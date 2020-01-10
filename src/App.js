import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Header from './Components/header';
import CV from './Components/cv';
import Cards from './Components/Cards';
import Footer from './Components/Footer';
import About from './Components/About';
import Slider from './Components/Slider';
import Skills from './Components/Skills';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fab)

class App extends Component {
  constructor(props, { location }) {
    super(props);
    this.state = {};
  }
  componentDidUpdate() {
    const contactform = document.getElementById('contact_form');

    if (contactform !== "undefined" && window.location.hash === "#contact") {
      contactform.classList.add('show');
      contactform.scrollIntoView();
    }
  }

  render(props) {
    const { location } = this.props;


    return (
      <div>
        <Route path="*" render={(props) => <Header />} />
   
          <Route path="*" render={(props) => <Slider />} />
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={{ enter: 300, exit: 30 }}
              classNames={'fade'}
            >
              <Switch location={location}>
                <Route path="/" exact={true} render={(props) => <Cards {...props} />} />
                <Route exact path="/cv" exact={true} render={(props) => <CV {...props} />} />
                <Route exact path="/about" exact={true} render={(props) => <About {...props} />} />
                <Route exact path="/skills" exact={true} render={(props) => <Skills {...props} />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>

        <Route path="*" render={(props) => <Footer />} />
      </div>
    );
  }
}

export default App;
