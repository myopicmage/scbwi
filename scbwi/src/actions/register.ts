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

import { Bootcamp } from 'types/common';

export const setUserInfo = (key: string, value: string | boolean) => {
  let newVal = value;

  if (key === 'member') {
    newVal = value === 'true';
  }

  return {
    type: SET_USER_INFO, 
    key, 
    value: newVal
  };
}
export const setRegistrationInfo = (key: string, value: string | number | boolean) => ({ type: SET_REGISTRATION_INFO, key, value });

export const fetchBootcamps = () => ({ type: REGISTER_BOOTCAMPS_FETCH });
export const fetchBootcampsFulfilled = (bootcamps: Bootcamp[]) => ({ type: REGISTER_BOOTCAMPS_FETCH_FULFILLED, bootcamps });

export const submitCoupon = (coupon: string) => ({ type: SUBMIT_COUPON, coupon });
export const submitCouponFulfilled = (success: boolean, message: string, subtotal: number, total: number) => 
  ({ type: SUBMIT_COUPON_FULFILLED, success, message, subtotal, total });

export const getToken = () => ({ type: GET_TOKEN });
export const getTokenFulfilled = (token: string) => ({ type: GET_TOKEN_FULFILLED, token });