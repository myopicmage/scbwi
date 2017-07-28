import * as React from 'react';
import { connect } from 'react-redux';
import { IProps, IAdminStore } from 'types/redux';
import { fetchBootcamps } from 'actions/admin';
import { MDown } from 'components/common';

interface BootcampProps {
    admin: IAdminStore
}

@connect(state => ({ admin: state.admin }))
export class Bootcamps extends React.Component<BootcampProps & IProps, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchBootcamps());
    }

    renderBootcamps = () => {
        if (this.props.admin.bootcampsloading) {
            return (
                <tr>
                    <td colSpan={7}>Loading...</td>
                </tr>
            );
        } else if (this.props.admin.bootcamps.length > 0) {
            return this.props.admin.bootcamps.map((item, index) =>
                <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.topic}</td>
                    <td>{item.location}</td>
                    <td>{item.address}</td>
                    <td>{item.presenters}</td>
                    <td>
                        <MDown text={item.description} />
                    </td>
                    <td>
                        <b>Member</b>: {item.memberprice}<br />
                        <b>Non Member</b>: {item.nonmemberprice}<br />
                    </td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td colSpan={7}>No bootcamps found</td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div className="slide-in">
                <h3>Bootcamps</h3>

                <table className="pure-table pure-table-horizontal">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Address</th>
                            <th>Presenters</th>
                            <th>Description</th>
                            <th>Prices</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBootcamps()}
                    </tbody>
                </table>
            </div>
        );
    }
}