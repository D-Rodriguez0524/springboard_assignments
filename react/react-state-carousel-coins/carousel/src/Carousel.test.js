import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import React from "react";

it('renders with out crashing', () => {
  render(<Carousel />);
})

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it('displays carousel html', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it('goes forward on right arrow click', () => {
  const { getByTestId, getByText } = render(<Carousel />);
  const rightArrow = getByTestId('right-arrow');
  const imageCount = getByText('Image 1 of 3.');
  fireEvent.click(rightArrow);
  expect(imageCount).toHaveTextContent('Image 2 of 3.');
});

it('goes backward on right arrow click', () => {
  const { getByTestId, getByText } = render(<Carousel />);
  const rightArrow = getByTestId('right-arrow');
  fireEvent.click(rightArrow);
  const imageCount = getByText('Image 2 of 3.');
  const leftArrow = getByTestId('left-arrow');
  fireEvent.click(leftArrow);
  expect(imageCount).toHaveTextContent('Image 1 of 3.');
});

it('hides the left arrow on first image', () => {
  const { queryByTestId, getByTestId, getByText } = render(<Carousel />);
  const leftArrow = queryByTestId('left-arrow');
  const rightArrow = getByTestId('right-arrow');
  expect(leftArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument();
});

it('hides the right arrow on last image', () => {
  const { queryByTestId, getByTestId, getByText } = render(<Carousel />);
  const rightArrow = getByTestId('right-arrow');
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  const leftArrow = queryByTestId('left-arrow');
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
});