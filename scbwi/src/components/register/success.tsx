import * as React from 'react';

export class Success extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pure-u-1">
                <h3>Success!</h3>
                <div>Your registration has been received. We look forward to seeing you!</div>
            </div>
        );
    }
}