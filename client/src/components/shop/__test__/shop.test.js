import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Shop from '../shop';

describe('Shop page', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Shop />);
    });

    it('successful component render', () => {
        expect(wrapper).not.toBeNull();
    });
    it('testing title-styling"', () => {
        expect(wrapper.find('.filter-label-category').text()).toEqual('Filter by categories');
    });
    it('testing title-styling"', () => {
        expect(wrapper.find('.filter-label-price').text()).toEqual('Filter by price range');
    });
    it('testing product-title-styling"', () => {
        expect(wrapper.find('.product-title-styling').text()).toEqual('Product List');
    });
});