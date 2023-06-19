import { render, screen } from '@testing-library/react';
import SearchHistory from '../components/SearchHistory';
import '@testing-library/jest-dom'

describe('SearchHistory', () => {
    
  it('renders no entries when search history is empty', () => {
    render(<SearchHistory searchHistory={[]} />);
    const entries = screen.queryByText(/Postcode:/i);
    expect(entries).not.toBeInTheDocument();
  });

  it('renders entries when search history is provided', () => {
    const historyEntries = [
      {
        postcode: 'AB1 2CD',
        address: 'Test Street, Test City',
        distanceKm: 50.123456,
        distanceMiles: 31.25
      },
      {
        postcode: 'EF3 4GH',
        address: 'Another Street, Another City',
        distanceKm: 120.987654,
        distanceMiles: 75.20
      }
    ];

    render(<SearchHistory searchHistory={historyEntries} />);

    historyEntries.forEach(entry => {
      expect(screen.getByText(`Postcode: ${entry.postcode}`)).toBeInTheDocument();
      expect(screen.getByText(`Address: ${entry.address}`)).toBeInTheDocument();
      expect(screen.getByText(`Distance (km): ${entry.distanceKm.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(`Distance (miles): ${entry.distanceMiles.toFixed(2)}`)).toBeInTheDocument();
    });
  });
});
