import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components/common';

export class Nav extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pure-u-1-4 slide-in-container">
                <h3>Menu</h3>
                <ul className="no-indent slide-in">
                    <li>
                        <Icon icon="home" />
                        <Link to="/dashboard">
                            Admin Home
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Icon icon="people" />
                        <Link to="/dashboard/users">
                            Users
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Icon icon="event" />
                        <Link to="/dashboard/bootcamps">
                            Bootcamps
                        </Link>
                    </li>
                    {/*<li>
                        <Icon icon="event" />
                        <Link to="/dashboard/events">
                            Events
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Icon icon="add" />
                        <Link to="/dashboard/events/new">
                            New Event
                        </Link>
                    </li>*/}
                </ul>
            </div>
        );
    }
}