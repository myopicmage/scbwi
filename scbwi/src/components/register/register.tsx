import * as React from 'react';
import { connect } from 'react-redux';
import { IProps, IRegisterStore } from 'types/redux';
import { fetchBootcamps, setUserInfo, setRegistrationInfo, submitCoupon, getToken, register } from 'actions/register';
import { ControlGroup } from './controlgroup';
import { MDown } from 'components/common';
import * as braintree from 'braintree-web';

interface RegisterProps {
    register: IRegisterStore
}

@connect(state => ({ register: state.register }))
export class Register extends React.Component<RegisterProps & IProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(getToken());
        dispatch(fetchBootcamps());
    }

    handleChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
        const { dispatch } = this.props;

        dispatch(setUserInfo(event.currentTarget.name, event.currentTarget.value));
    }

    handleCoupon = (event: React.FormEvent<HTMLInputElement>): void => {
        const { dispatch } = this.props;

        dispatch(setRegistrationInfo('coupon', event.currentTarget.value));
    }

    calcTotal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const { dispatch } = this.props;
        const toSubmit = {
            ...this.props.register.registration,
            user: this.props.register.user,
            coupon: this.props.register.registration.coupon
        };

        dispatch(submitCoupon(toSubmit));
    }

    selectBootcamp = (event: React.MouseEvent<HTMLDivElement>): void => {
        const { dispatch } = this.props;

        const camp = this.props.register.bootcamps.find(item => item.id === Number(event.currentTarget.id));

        if (!camp) return;

        if (this.props.register.registration.bootcampid === camp.id) {
            dispatch(setRegistrationInfo('bootcampid', -1));

            return;
        }

        dispatch(setRegistrationInfo('bootcampid', Number(event.currentTarget.id)));

        const price = this.props.register.user.member === true ? camp.memberprice : camp.nonmemberprice;

        dispatch(setRegistrationInfo('subtotal', price));
        dispatch(setRegistrationInfo('total', price));
    }


    setupButton = () => {
        const ppbutton = document.getElementById('paypal-button');

        if (!ppbutton) {
            return;
        }

        const { dispatch } = this.props;
        const { registration } = this.props.register;

        braintree.client.create({ authorization: this.props.register.paypaltoken }, (clientErr, clientInstance) => {
            braintree.paypal.create({ client: clientInstance }, (err, paypalInstance) => {
                ppbutton.addEventListener('click', () => {
                    if (registration.total === 0) {

                        dispatch(register({
                            ...registration,
                            user: this.props.register.user,
                            coupon: registration.coupon,
                        }));

                        return;
                    }

                    paypalInstance.tokenize({
                        flow: 'checkout',
                        amount: registration.total,
                        currency: 'USD',
                        locale: 'en_US',
                    }, (err, tokenizationPayload) => {
                        dispatch(register({
                            ...registration,
                            user: this.props.register.user,
                            coupon: registration.coupon,
                            nonce: tokenizationPayload.nonce
                        }));
                    });

                });

                this.setState({ disabled: false });
            });
        });
    }

    renderBootcamps = (day: number) => {
        const { register } = this.props;

        if (register.bootcampsloading) {
            return (
                <div>
                    Loading...
                </div>
            );
        } else if (register.bootcamps.length > 0) {
            return register.bootcamps.filter(item => new Date(item.date).getDate() === day).map((item, index) =>
                <div
                    className={`pure-u-1 inline-flex camp-box ${register.registration.bootcampid === item.id ? 'selected' : ''}`} id={item.id ? item.id.toString() : index.toString()}
                    onClick={this.selectBootcamp}
                    key={index}>
                    <div className="pure-u-1-12 item">
                        <label htmlFor={`box-${item.id}`}>
                            <input type="radio" checked={register.registration.bootcampid === item.id} />
                        </label>
                    </div>
                    <div className="pure-u-11-12 item">
                        <div className="pure-u-1 header">
                            {item.location} - {item.topic}
                        </div>
                        <div className="pure-u-1">
                            <b>{item.presenters}</b>
                        </div>
                        <div className="pure-u-1">
                            <b>{item.address}</b>
                        </div>
                        <div className="pure-u-1">
                            <MDown text={item.description} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    Error loading bootcamps
                </div>
            );
        }
    }

    render() {
        const { user } = this.props.register;

        return (
            <div className="pure-u-1">
                <div className="pure-u-1 register-banner">
                    <img src="/images/bootcamps.jpg" />
                    <h1>SCBWI Florida Annual Boot Camps</h1>
                    <h2>Saturday, September 23 and Sunday, September 24<br />10:00 a.m.-4:00 p.m.</h2>
                    <h3>Cost: $75 for members, $115 for non-members</h3>
                </div>
                <div className="pure-u-1">
                    <form className="pure-form pure-form-aligned">
                        <fieldset>
                            <legend>Basic Information</legend>
                            <ControlGroup handleChange={this.handleChange} name="member" label="Are you a member?" type="radio" required={true} value={user.member.toString()}
                                options={[{ key: 'yes', value: 'true', label: 'Yes' }, { key: 'no', value: 'false', label: 'No' }]} />
                            <ControlGroup handleChange={this.handleChange} name="first" label="First Name" type="text" required={true} value={user.first} />
                            <ControlGroup handleChange={this.handleChange} name="last" label="Last Name" type="text" required={true} value={user.last} />
                            <ControlGroup handleChange={this.handleChange} name="address1" label="Address 1" type="text" required={true} value={user.address1} />
                            <ControlGroup handleChange={this.handleChange} name="address2" label="Address 2" type="text" required={true} value={user.address2} />
                            <ControlGroup handleChange={this.handleChange} name="city" label="City" type="text" required={true} value={user.city} />
                            <ControlGroup handleChange={this.handleChange} name="state" label="State/Province" type="text" required={true} value={user.state} />
                            <ControlGroup handleChange={this.handleChange} name="zip" label="Zip/Postal Code" type="text" required={true} value={user.zip} />
                            <ControlGroup handleChange={this.handleChange} name="country" label="Country" type="select" required={true} value={user.country}
                                options={[{ key: 'us', value: 'us', label: 'USA' }, { key: 'canada', value: 'canada', label: 'Canada' }]} />
                            <ControlGroup handleChange={this.handleChange} name="email" label="Email" type="text" required={true} value={user.email} />
                            <ControlGroup handleChange={this.handleChange} name="phone" label="Phone Number" type="text" required={true} value={user.phone} />
                        </fieldset>
                        <fieldset>
                            <legend>Select a Saturday boot camp</legend>
                            {this.renderBootcamps(23)}
                        </fieldset>
                        <fieldset>
                            <legend>Select a Sunday boot camp</legend>
                            {this.renderBootcamps(24)}
                        </fieldset>
                        <fieldset>
                            <legend>Do you have a coupon?</legend>
                            <div className="pure-control-group">
                                <label htmlFor="coupon">Coupon code (optional)</label>
                                <input type="text" name="coupon" value={this.props.register.registration.coupon} onChange={this.handleCoupon} placeholder="Enter code..." />
                                <span className="pure-form-message-inline">{this.props.register.couponmessage}</span>
                            </div>
                            <div className="pure-controls">
                                <button type="button" className="pure-button pure-button-primary" onClick={this.calcTotal}>Submit coupon</button>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Totals</legend>

                            <div className="pure-controls">
                                <b>Subtotal</b>: ${this.props.register.registration.subtotal}<br />
                                <b>Total</b>: ${this.props.register.registration.total}<br />
                            </div>

                            <div className="pure-controls">
                                <label htmlFor="paypal-go" className="pure-checkbox">
                                    <input type="checkbox" name="paypal-go" onClick={this.setupButton} /> All of my information is correct
                                </label>

                                <button type="button" className="pure-button pure-button-primary" id="paypal-button" disabled={this.state.disabled}>Submit</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}