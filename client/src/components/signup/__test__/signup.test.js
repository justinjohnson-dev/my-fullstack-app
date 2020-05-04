import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import { act, renderHook } from '@testing-library/react-hooks'

import Signup from '../signup';

describe('Signup', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Signup />);
    });

    it('successful component render', () => {
        expect(wrapper).not.toBeNull();
    });
    it('testing h2, form description', () => {
        expect(wrapper.find('.login-alert').text()).toEqual('Create Your Account!');
    });
    it('testing name-label', () => {
        expect(wrapper.find('.name-label').text()).toEqual('Name');
    });
    it('testing email-label', () => {
        expect(wrapper.find('.email-label').text()).toEqual('Email');
    });
    it('testing password-label', () => {
        expect(wrapper.find('.password-label').text()).toEqual('Password');
    });
    it('testing create-button', () => {
        expect(wrapper.find('.create-button').text()).toEqual('Create Account');
    });
    it('testing show-success-signup', () => {
        expect(wrapper.find('.show-success-signup').text()).toEqual('Your new account has successfully been created! Login!');
    });
});


describe('testing custom hook', () => {
    it('successful component render', () => {
        let results;
        function HookWrapper() {
            result = Signup();
            return null;
        }
        mount(<HookWrapper />);
        expect(results.count).toEqual(0);
    });
});