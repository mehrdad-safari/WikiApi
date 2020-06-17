import React from 'react';
import { shallow } from 'enzyme';

import Dropdown from './dropdown';

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

/**
 * Factory function to create a ShallowWrapper for App Component.
 * @function setup
 * @param {obj} props - Component props to this setup func.
 * @param {obj} state - Initial state for setup func.
 * @return {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<Dropdown {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe('Component Rendering', () => {
  it('If Component startter div exist', () => {
    const wrapper = setup();
    const componentWrapper = findByTestAttr(wrapper, 'dropdown-component');
    expect(componentWrapper.length).toBe(1);
  });
  it('If dropdown opens on clicking its button', () => {
    const wrapper = setup();
    const Btn = findByTestAttr(wrapper, 'dropdown-button');
    Btn.simulate('click');
    const componentWrapper = findByTestAttr(wrapper, 'dropdown-list');
    expect(componentWrapper.length).toBe(1);
  });
  it('If Languages List load correctly', () => {
    const testLang = [
      {
        lang: 'ts',
        '*': 'test',
        autonym: 'Test-Lang',
        url: '#',
        langname: 'TestLng',
      },
    ];

    const wrapper = setup({ langList: testLang }, null);
    const Btn = findByTestAttr(wrapper, 'dropdown-button');
    Btn.simulate('click');

    const componentList = findByTestAttr(wrapper, 'dropdown-list');
    expect(componentList.children()).toHaveLength(2);
  });
  it('Dropdown list items on clicking', () => {
    const testLang = [
      {
        lang: 'ts',
        '*': 'test',
        autonym: 'Test-Lang',
        url: '#',
        langname: 'TestLng',
      },
    ];
    const mockCallBack = jest.fn();
    const wrapper = setup(
      { langList: testLang, onChanged: mockCallBack },
      null
    );
    const Btn = findByTestAttr(wrapper, 'dropdown-button');
    Btn.simulate('click');

    const List = findByTestAttr(wrapper, 'dropdown-list');

    List.simulate('click', {
      preventDefault: () => {},
      target: {
        'data-title': 'Albert_Einstein',
        getAttribute: (href) => {
          return '#';
        },
      },
    });
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
