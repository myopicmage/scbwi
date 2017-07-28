import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { IProps, IAdminStore } from 'types/redux';
import { Icon } from 'components/common';
import { dismissNotification } from 'actions/admin';
import { Nav } from './nav';
import { Home } from './home';
import { NewEvent } from './newevent';
import { Bootcamps } from './bootcamps';

interface IAdminProps extends IProps {
    admin: IAdminStore
}

@connect(state => ({ admin: state.admin }))
export class Admin extends React.Component<IAdminProps, any> {
    constructor(props) {
        super(props);
    }

    dismiss = (note) => {
        const { dispatch } = this.props;

        note.seen = true;

        dispatch(dismissNotification(note));
    }

    displayNotification = () => {
        const { notifications } = this.props.admin;

        if (notifications.length === 0) {
            return <div className="pure-u-2-3">&nbsp;</div>;
        }

        const note = notifications.find(item => !item.seen);

        if (!note) {
            return <div className="pure-u-2-3">&nbsp;</div>;
        }

        return (
            <div className="pure-u-15-24 item">
                <div className={`pure-u-1 notification ${note.level}`}>
                    <div className="pure-u-4-24">
                        {note.created && note.created.toDateString()}
                    </div>
                    <div className="pure-u-15-24">
                        {note.text}
                    </div>
                    <div className="pure-u-4-24">
                        {note.action ? <Link to={`${note.action.location}`}>{note.action.text}</Link> : ' '}
                    </div>
                    <div className="pure-u-1-24" onClick={event => { event.preventDefault(); this.dismiss(note); }} style={{ cursor: 'pointer' }}>
                        <Icon icon="close" />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="pure-u-1">
                <div className="pure-u-1 flex-contain">
                    <div className="pure-u-1-3">
                        <h1>Registration Admin</h1>
                    </div>
                    {this.displayNotification()}
                </div>
                <Nav />
                <div className="pure-u-3-4 slide-in-container">
                    <Route exact path="/dashboard" component={Home} />

                    <Route path="/dashboard/bootcamps" component={Bootcamps} />
                </div>
            </div>
        );
    }
}