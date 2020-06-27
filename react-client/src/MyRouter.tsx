import React, { Component } from 'react';
import loadableVisibility from "react-loadable-visibility/loadable-components";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import RouterLoadingComponent from './components/external/loading/RouterLoadingComponent';
import { isUserSignedIn } from './services/UserService';

const Home = loadableVisibility(() => import('./routes/public/Home'), {
    fallback: <RouterLoadingComponent />
});

const ReadMore = loadableVisibility(() => import('./routes/public/ReadMore'), {
    fallback: <RouterLoadingComponent />
});

const AllCards = loadableVisibility(() => import('./routes/public/AllCards'), {
    fallback: <RouterLoadingComponent />
});

const Categories = loadableVisibility(() => import('./routes/public/Categories'), {
    fallback: <RouterLoadingComponent />
});

/**
 * Private Routes BEGIN
 */
const MyDeck = loadableVisibility(() => import('./routes/private/MyDeck'), {
    fallback: <RouterLoadingComponent />
});

const Checkout = loadableVisibility(() => import('./routes/private/Checkout'), {
    fallback: <RouterLoadingComponent />
});

const Profile = loadableVisibility(() => import('./routes/private/Profile'), {
    fallback: <RouterLoadingComponent />
});

const Orders = loadableVisibility(() => import('./routes/private/Orders'), {
    fallback: <RouterLoadingComponent />
});
/**
 * Private Routes BEGIN
 */

const SimpleProductPage = loadableVisibility(() => import('./routes/public/SimpleProductPage'), {
    fallback: <RouterLoadingComponent />
});

const SignIn = loadableVisibility(() => import('./routes/public/SignIn'), {
    fallback: <RouterLoadingComponent />
});

const Test = loadableVisibility(() => import('./routes/public/Test'), {
    fallback: <RouterLoadingComponent />
});

const PageNotFound = loadableVisibility(() => import('./routes/public/PageNotFound'), {
    fallback: <RouterLoadingComponent />
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