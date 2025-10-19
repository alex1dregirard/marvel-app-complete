import { describe, expect, test, jest, beforeEach } from '@jest/globals'

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import D3PieChart from './D3PieChart';
import { prepareData } from './chart-utils';

// Mock the prepareData function
jest.mock('./chart-utils', () => ({
    prepareData: jest.fn(),
}));

describe('D3PieChart', () => {
    const data = [
        { name: 'Force', value: 10 },
        { name: 'Intelligence', value: 8 },
        { name: 'Energy', value: 7 },
        { name: 'Speed', value: 9 },
        { name: 'Durability', value: 6 },
        { name: 'Fighting', value: 5 },
    ];

    beforeEach(() => {
        prepareData.mockReturnValue(data);
    });

    test('renders D3PieChart with label and value', () => {
        render(<D3PieChart data={data} />);

        // screen.debug();

        expect(document.getElementById('pie-container')).toBeInTheDocument();

        // Check if the data is displayed
        data.forEach((item) => {
            const nameLabel = screen.getByText(item.name);
            expect(nameLabel).toBeInTheDocument();
            const valueLabel = screen.getByText(item.value);
            expect(valueLabel).toBeInTheDocument();
        });

        // expect to have a svg element
        const svgElement = document.querySelector('svg');
        expect(svgElement).toBeInTheDocument();

        // expect to have a path element for each data
        const pathElements = document.querySelectorAll('path');
        expect(pathElements).toHaveLength(Object.keys(data).length);
        
        // Check if the data is displayed
        data.forEach((item) => {
            // check if the label is displayed
            const tspan = document.getElementById(`pie-labels-name-${item.name}`);
            expect(tspan).toBeInTheDocument();
            expect(tspan.textContent).toBe(item.name);

            // check if the value is displayed
            const tspanValue = document.getElementById(`pie-labels-value-${item.name}`);
            expect(tspanValue).toBeInTheDocument();
            expect(tspanValue.textContent).toBe(item.value.toString());
        });
    });
});