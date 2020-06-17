import React from 'react';
import { shallow } from 'enzyme';
import Index from '.';
import Loader from './Loader/loader';
import DropDown from './Dropdown/dropdown';

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
  const wrapper = shallow(<Index {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

describe('Component Rendering', () => {
  it('If Component startter div exist', () => {
    const wrapper = setup();
    const componentWrapper = findByTestAttr(wrapper, 'index-container');
    expect(componentWrapper.length).toBe(1);
  });

  it('If Loader Component works', () => {
    const wrapper = setup({}, { isLoading: true });
    const componentWrapper = wrapper.find(Loader);

    expect(componentWrapper.length).toBe(1);
  });
  it('If DropDown Component loads perfectly', () => {
    const langList = [{ langname: 'test', lang: 'ts' }];
    const wrapper = setup({}, { langList });
    const componentWrapper = wrapper.find(DropDown);

    expect(componentWrapper.length).toBe(1);
  });

  it('If resultBox loads perfectly', () => {
    const wikiData = '<div>Some Data</div>';
    const wrapper = setup({}, { wikiData, isLoading: false });
    // find inc btn by its attr and simulate click event
    const resultBox = findByTestAttr(wrapper, 'resultBox');
    expect(resultBox.prop('dangerouslySetInnerHTML')['__html']).toContain(
      wikiData
    );
  });
  it('If Error Handling works', () => {
    const errorMessage = '<div>Some Error</div>';
    const wrapper = setup({}, { errorMessage, isLoading: false });
    // find inc btn by its attr and simulate click event
    const resultBox = findByTestAttr(wrapper, 'resultBox');
    expect(resultBox.prop('dangerouslySetInnerHTML')['__html']).toContain(
      errorMessage
    );
  });
});
