import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AllCards from './routes/AllCards';
import Categories from './routes/Categories';
import Checkout from './routes/Checkout';
import Home from './routes/Home';
import MyDeck from './routes/MyDeck';
import Orders from './routes/Orders';
import PageNotFound from './routes/PageNotFound';
import Profile from './routes/Profile';
import ReadMore from './routes/ReadMore';
import SignIn from './routes/SignIn';
import SimpleProductPage from './routes/SimpleProductPage';

class MyRouter extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/all-cards" component={AllCards} />
                    <Route exact path="/categories" component={Categories} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route exact path="/my-deck" component={MyDeck} />
                    <Route exact path="/orders" component={Orders} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/read-more" component={ReadMore} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/card/:id" component={SimpleProductPage} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        );
    }
}

export default MyRouter;