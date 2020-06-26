import React, { Component } from 'react';
import loadableVisibility from "react-loadable-visibility/loadable-components";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { isUserSignedIn } from './services/UserService';

function LoadingComponent(props: any) {
    return (
        <div>
            Loading ...
        </div>
    )
}

const Home = loadableVisibility(() => import('./routes/Home'), {
    fallback: <LoadingComponent />
});

const ReadMore = loadableVisibility(() => import('./routes/ReadMore'), {
    fallback: <LoadingComponent />
});

const AllCards = loadableVisibility(() => import('./routes/AllCards'), {
    fallback: <LoadingComponent />
});

const Categories = loadableVisibility(() => import('./routes/Categories'), {
    fallback: <LoadingComponent />
});

/**
 * Private Routes BEGIN
 */
const MyDeck = loadableVisibility(() => import('./routes/MyDeck'), {
    fallback: <LoadingComponent />
});

const Checkout = loadableVisibility(() => import('./routes/Checkout'), {
    fallback: <LoadingComponent />
});

const Profile = loadableVisibility(() => import('./routes/Profile'), {
    fallback: <LoadingComponent />
});

const Orders = loadableVisibility(() => import('./routes/Orders'), {
    fallback: <LoadingComponent />
});
/**
 * Private Routes BEGIN
 */

const SimpleProductPage = loadableVisibility(() => import('./routes/SimpleProductPage'), {
    fallback: <LoadingComponent />
});

const SignIn = loadableVisibility(() => import('./routes/SignIn'), {
    fallback: <LoadingComponent />
});

const Test = loadableVisibility(() => import('./routes/Test'), {
    fallback: <LoadingComponent />
});

const PageNotFound = loadableVisibility(() => import('./routes/PageNotFound'), {
    fallback: <LoadingComponent />
});

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
            <Route exact path="/read-more" component={ReadMore} />
            <Route exact path="/all-cards" component={AllCards} />
            <Route exact path="/card/:id" component={SimpleProductPage} />
            <Route exact path="/categories" component={Categories} />
            <PrivateRoute exact path="/checkout" component={Checkout} />
            <PrivateRoute exact path="/my-deck" component={MyDeck} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/orders" component={Orders} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/test" component={Test} />
            <Route component={PageNotFound} />
        </Switch>
    </Router>
);