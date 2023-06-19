import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ResponseContainer from '../components/ResponseContainer';


describe('ResponseContainer', () => {
 
   
  it('displays the address, coordinates and distances when currentSearch is provided', () => {
    const currentSearch = { 
      address: 'Test address', 
      distanceKm: 123, 
      distanceMiles: 76.5, 
      longitude: 12.3456, 
      latitude: 78.9012 
    };

    render(<ResponseContainer data={null} currentSearch={currentSearch} />);
    expect(screen.getByText(/Test address/)).toBeInTheDocument();
    expect(screen.getByText(/Latitude: 78.9012, Longitude: 12.3456/)).toBeInTheDocument();
    expect(screen.getByText(/123.00 kilometers/)).toBeInTheDocument();
    expect(screen.getByText(/76.50 miles/)).toBeInTheDocument();
  });

  it('displays default text when no data or currentSearch is provided', () => {
    render(<ResponseContainer data={null} currentSearch={null} />);
    expect(screen.getByText(/Distance in a straight line from _____ to Heathrow Airport:/)).toBeInTheDocument();
  });
});
