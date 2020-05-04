import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Login from '../login';

describe('Login', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Login />);
    });

    it('successful component render', () => {
        expect(wrapper).not.toBeNull();
    });
    it('testing h2, form description for login page', () => {
        expect(wrapper.find('.login-alert').text()).toEqual('Login to your account!');
    });
    it('testing email-label', () => {
        expect(wrapper.find('.email-label').text()).toEqual('Email');
    });
    it('testing password-label', () => {
        expect(wrapper.find('.password-label').text()).toEqual('Password');
    });
    it('testing create-button', () => {
        expect(wrapper.find('.create-button').text()).toEqual('Login');
    });
});