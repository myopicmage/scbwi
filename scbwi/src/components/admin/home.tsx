import * as React from 'react';

export class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="slide-in">
                <h3>Home</h3>
                <table className="pure-table pure-table-horizontal pure-table-striped">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Contact</th>
                            <th>Presenter</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bootcamp</td>
                            <td>
                                St. Leo's, Gainesville Educational Center<br />
                                Gainesville, FL
                            </td>
                            <td>
                                Nancy Ryan<br />
                                <a href="mailto:storydrum1@gmail.com">storydrum1@gmail.com</a>
                            </td>
                            <td>
                                ALL GENRES<br />
                                Joyce Sweeney<br />
                                Stacie Ramey
                            </td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td>Bootcamp</td>
                            <td>
                                St. Leo's, Gainesville Educational Center<br />
                                Gainesville, FL
                            </td>
                            <td>
                                Nancy Ryan<br />
                                <a href="mailto:storydrum1@gmail.com">storydrum1@gmail.com</a>
                            </td>
                            <td>
                                ALL GENRES<br />
                                Joyce Sweeney<br />
                                Stacie Ramey
                            </td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td>Bootcamp</td>
                            <td>
                                St. Leo's, Gainesville Educational Center<br />
                                Gainesville, FL
                            </td>
                            <td>
                                Nancy Ryan<br />
                                <a href="mailto:storydrum1@gmail.com">storydrum1@gmail.com</a>
                            </td>
                            <td>
                                ALL GENRES<br />
                                Joyce Sweeney<br />
                                Stacie Ramey
                            </td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td>Bootcamp</td>
                            <td>
                                St. Leo's, Gainesville Educational Center<br />
                                Gainesville, FL
                            </td>
                            <td>
                                Nancy Ryan<br />
                                <a href="mailto:storydrum1@gmail.com">storydrum1@gmail.com</a>
                            </td>
                            <td>
                                ALL GENRES<br />
                                Joyce Sweeney<br />
                                Stacie Ramey
                            </td>
                            <td>$100</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}