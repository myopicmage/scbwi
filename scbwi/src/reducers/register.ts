import { 
    SET_USER_INFO,
    SET_REGISTRATION_INFO,
    REGISTER_BOOTCAMPS_FETCH,
    REGISTER_BOOTCAMPS_FETCH_FULFILLED,
    SUBMIT_COUPON,
    SUBMIT_COUPON_FULFILLED,
    GET_TOKEN,
    GET_TOKEN_FULFILLED
} from 'constants/register';

import { IRegisterStore } from 'types/redux';

const RegisterInitial: IRegisterStore = {
    user: {
        first: '',
        last: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: 'us',
        phone: '',
        email: '',
        member: false,
    },
    registration: {
        subtotal: -1,
        total: -1
    },
    bootcamps: [],
    bootcampsloading: false,
    coupon: '',
    couponloading: false,
    couponmessage: '',
    paypaltoken: ''
};

export const register = (state = RegisterInitial, action): IRegisterStore => {
    switch (action.type) {
        case REGISTER_BOOTCAMPS_FETCH:
            return {
                ...state,
                bootcampsloading: true
            };
        case REGISTER_BOOTCAMPS_FETCH_FULFILLED:
            return {
                ...state,
                bootcampsloading: false,
                bootcamps: action.bootcamps
            };
        case SET_USER_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.key]: action.value
                }
            };
        case SET_REGISTRATION_INFO:
            return {
                ...state,
                registration: {
                    ...state.registration,
                    [action.key]: action.value
                }
            };
        case SUBMIT_COUPON:
            return {
                ...state,
                couponloading: true,
                coupon: action.coupon
            };
        case SUBMIT_COUPON_FULFILLED:
            return {
                ...state,
                couponloading: false,
                couponsuccess: action.success,
                couponmessage: action.message,
                registration: {
                    ...state.registration,
                    subtotal: action.subtotal,
                    total: action.total
                }
            };
        case GET_TOKEN_FULFILLED:
            return {
                ...state,
                paypaltoken: action.token.token
            };
        default:
            return state;
    }
}