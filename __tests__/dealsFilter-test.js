import React from 'react';
import {shallow} from 'enzyme';
import axios from 'axios';
import {act} from 'react-dom/test-utils';
import {render, waitFor} from '@testing-library/react-native';

import AllDeals from '../src/routes/deals/all';

jest.mock('axios');

// mock data
const response = {
  data: {
    test: 'name',
  },
};

describe('AllDeals component', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render Loading.... while fetch data fro API', () => {
    wrapper = shallow(<AllDeals />);
    expect(wrapper.prop('children')).toBe('Loading...');
  });

  test('should fetch data from API', async () => {
    await act(async () => {
      await axios.get.mockImplementationOnce(() => Promise.resolve(response));
      await waitFor(() => {
        render(<AllDeals />);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
          'https://www.cheapshark.com/api/1.0/deals',
        );
      });
    });
  });
  test('should update state with fetched data', async () => {
    await act(async () => {
      await axios.get.mockImplementationOnce(() => Promise.resolve(response));
      await waitFor(() => {
        render(<AllDeals />);
        expect(setState).toHaveBeenCalledWith(response.data);
      });
    });
  });
});
