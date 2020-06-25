import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { isUserSignedIn } from './services/UserService';

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
import Test from './routes/Test';


const isAuthenticated = () => {
  return isUserSignedIn();
}

function PrivateRoute({ component: Component, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    );
}

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/all-cards" component={AllCards} />
            <Route exact path="/categories" component={Categories} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
            <PrivateRoute exact path="/my-deck" component={MyDeck} />
            <PrivateRoute exact path="/orders" component={Orders} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route exact path="/read-more" component={ReadMore} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/card/:id" component={SimpleProductPage} />
            <Route exact path="/test" component={Test} />
            <Route component={PageNotFound} />
        </Switch>
    </Router>
);