import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';
import image1 from './image1.jpg';

it('renders Card component without crashing', () => {
    render(<Card />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<Card
        caption="Photo by Richard Pasquarella on Unsplash"
        src={image1}
        currNum={1}
        totalNum={3} />
    );
    expect(asFragment()).toMatchSnapshot();
})