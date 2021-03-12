import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Autocomplete from "../components/Autocomplete";

jest.mock("../utils/api");

describe("Autocomplete", () => {
  let clickFunc;

  // abstract in order to avoid repetition
  function renderAutocomplete() {
    clickFunc = jest.fn();

    const component = render(<Autocomplete getProductId={clickFunc} />);

    const input = screen.getByRole('textbox', { placeholder: /search for a product/i });

    return { component, input }
  }

  it("renders correctly", async () => {
    const { input } = renderAutocomplete();

    expect(input).toBeInTheDocument();
    screen.getByPlaceholderText('Search for a product');
  });

  it("displays search queries in input correctly", async () => {
    const { input } = renderAutocomplete();

    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'shirt' } });

    expect(input.value).toBe('shirt');
  });
});
