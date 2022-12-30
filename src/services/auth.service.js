const httpStatus = require('http-status');
const { userRepo } = require('../dbservices');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenManagement');
const { abortIf } = require('../utils/responder');
const { userDTO } = require('../DTOs/user.dto');
const { hash } = require('../utils/passwordHash');
const moment = require('moment');

const moments = require('moment-timezone');
const dateNigeria = moments.tz(Date.now(), 'Africa/Lagos');

class AuthService {
  // providerSignUp = async (data) => {};

  customerLogin = async (data) => {
    // try {
    let { email, password } = data;
    email = email.trim().toLowerCase();
    password = password.trim();
    const user = await userRepo.findCustomer({ email });
    abortIf(!user, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    const password_check = await bcrypt.compare(password, user.password);
    abortIf(!password_check, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    delete user.password;
    const token = await generateToken(user);
    /**
     *  ==> Call Notification Service <==
     */
    return { message: 'success', user, ...token };
    // } catch (e) {
    //   console.error(e);
    // }
  };

  customerSignUp = async (data) => {
    // try {
    let { email, password, confirmPassword, firstname, lastname } = data;
    abortIf(
      password !== confirmPassword,
      httpStatus.BAD_REQUEST,
      'Passwords do not match'
    );
    password = password.trim();
    const hashed_password = await hash(password);

    const user = await userRepo.findCustomer({ email });
    console.log(user);
    abortIf(
      user,
      httpStatus.BAD_REQUEST,
      'Email or Phonenumber already exists'
    );
    //create provider
    const _data = {
      email: email.toLowerCase().trim(),
      password: hashed_password,
      firstname,
      lastname,
    };
    const create_customer = await userRepo.customerCreate(_data);
    console.log(create_customer);
    /**
     *  ==> Call the Notification Service <==
     */
    const token = await generateToken(create_customer);
    delete create_customer.password;
    //send Email here
    return {
      message: 'Account created',
      user: create_customer,
      ...token,
    };
    // } catch (er) {
    //   console.error(er);
    // }
  };
}

module.exports = {
  AuthService,
};
