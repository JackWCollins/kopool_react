import LoginForm from '../components/LoginForm';
import React from 'react';
import { shallow, mount } from 'enzyme';

describe('LoginForm', () => {
  it('renders two inputs', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper.find('input').length).toEqual(2)
  })
});