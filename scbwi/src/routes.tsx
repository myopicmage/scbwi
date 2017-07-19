import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link, Route } from 'react-router-dom';
import 'scss/app.scss';

import { Home } from 'components/common';
import { Admin } from 'components/admin';
import { Register } from 'components/register';

export const Routes =
    <div className="main pure-g">
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Admin} />
        <Route path="/register" component={Register} />

        <footer className="pure-u-1">
            <div className="footer">
                &copy; 2017 - <a href="https://florida.scbwi.org/" target="_blank">SCBWI Florida</a>
            </div>
        </footer>
    </div>;