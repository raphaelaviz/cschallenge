import { fireEvent, render } from '@testing-library/react';
import AutocompleteList from '../components/AutocompleteList';
import '@testing-library/jest-dom'

describe('AUtocompleteList', () => {
  const mockSelectSuggestion = jest.fn();

  it('blurs the AutocompleteList when clicking outside of it', () => {
    const suggestions = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'];

    const { getByText, container } = render(
      <div>
        <AutocompleteList suggestions={suggestions} selectSuggestion={mockSelectSuggestion} />
        <button>Outside Element</button>
      </div>,
    );

    const outsideElement = getByText('Outside Element');
    fireEvent.click(outsideElement);
    suggestions.forEach((suggestion) => {
      expect(container.querySelector(`div[key="${suggestion}"]`)).not.toBeInTheDocument();
    });
  });
});
