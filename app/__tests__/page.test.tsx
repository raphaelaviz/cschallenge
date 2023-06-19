import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import Home from '../page';
import axios from 'axios';

jest.mock('axios');

describe('Home', () => {

it('renders the SearchForm, ResponseContainer, and SearchHistory components', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/Enter postcode here/i)).toBeInTheDocument(); // (SearchForm)
    expect(screen.getByText(/Distance from _____ to Heathrow Airport:/i)).toBeInTheDocument(); // (ResponseContainer)
    expect(screen.getByText(/Your recent searches/i)).toBeInTheDocument(); // (SearchHistory)
  });
  

it('displays an error message when the API call returns a 404 error', async () => {

  (axios.get as jest.Mock).mockRejectedValueOnce({
      response: {
        status: 404,
      },
    });
    render(<Home />);
    const submitButton = screen.getByText('Calculate distance');
    fireEvent.click(submitButton);
    const airportText = screen.queryByText('Airport:');
    expect(airportText).not.toBeInTheDocument();
  });
     
});
