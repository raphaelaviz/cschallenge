import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchForm from '../components/SearchForm';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('SearchForm', () => {
  const onSubmitMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('displays error message when the postcode is not in the correct format', () => {
    render(<SearchForm onSubmit={onSubmitMock} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter postcode here/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Calculate distance/i));
    expect(screen.getByText(/The postcode must start with a letter and have from 5 to 7 alphanumeric characters./i)).toBeInTheDocument();
  });

  it('calls onSubmit and clears the input when the postcode is valid', () => {
    render(<SearchForm onSubmit={onSubmitMock} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter postcode here/i), { target: { value: 'AB123' } });
    fireEvent.click(screen.getByText(/Calculate distance/i));
    expect(onSubmitMock).toHaveBeenCalledWith('AB123');
    expect(screen.getByPlaceholderText(/Enter postcode here/i)).toHaveValue('');
  });

  it('displays autocomplete suggestions after API call', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { result: ['AB123', 'AB124'] } });
    render(<SearchForm onSubmit={onSubmitMock} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter postcode here/i), { target: { value: 'AB' } });
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText('AB123')).toBeInTheDocument();
    expect(screen.getByText('AB124')).toBeInTheDocument();
  });

  it('updates the input value and clears the suggestions when a suggestion is selected', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { result: ['AB123', 'AB124'] } });
    render(<SearchForm onSubmit={onSubmitMock} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter postcode here/i), { target: { value: 'AB' } });
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    act(() => {
      fireEvent.click(screen.getByText('AB123'));
    });
    expect(screen.getByPlaceholderText(/Enter postcode here/i)).toHaveValue('AB123');
    expect(screen.queryByText('AB123')).not.toBeInTheDocument();
    expect(screen.queryByText('AB124')).not.toBeInTheDocument();
  });
});
