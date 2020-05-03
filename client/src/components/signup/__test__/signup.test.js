import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Signup from '../signup';

describe('Signup', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Signup />);
    });

    it('success', () => {
        expect(wrapper.find('Form')).toHaveLength(0);
    });

});