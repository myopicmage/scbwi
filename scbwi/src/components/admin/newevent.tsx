import * as React from 'react';
import { connect } from 'react-redux';

export class NewEvent extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="slide-in">
                <h3>New Event</h3>
                <form className="pure-form pure-form-aligned">
                    <fieldset>
                        <legend>Basics</legend>

                        <div className="pure-control-group">
                            <label htmlFor="name">Event Name</label>
                            <input id="name" type="text" placeholder="Enter a name..." name="name" />
                            <span className="pure-form-message-inline">This is required.</span>
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="start">Start Date</label>
                            <input id="start" type="date" placeholder="Enter a start date..." name="start" />
                            <span className="pure-form-message-inline">This is required.</span>
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="end">End Date</label>
                            <input id="end" type="date" placeholder="Enter a start date..." name="end" />
                            <span className="pure-form-message-inline">This is required.</span>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}