import { describe, expect, test, jest, beforeEach } from '@jest/globals'

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import RechartsPieChart from './RechartsPieChart';
import { prepareData } from './chart-utils';

// Mock the prepareData function
jest.mock('./chart-utils', () => ({
    prepareData: jest.fn(),
}));

describe('RechartsPieChart', () => {
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

    test('renders RechartsPieChart', () => {
        render(<RechartsPieChart data={data} />);

        // expect to have a div with the class "recharts-wrapper"
        expect(document.querySelector('.recharts-wrapper')).toBeInTheDocument();
    });
});