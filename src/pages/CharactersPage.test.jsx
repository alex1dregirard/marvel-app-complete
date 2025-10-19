// src/pages/CharactersPage.test.jsx

import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRoutesStub } from 'react-router'
import CharactersPage from './CharactersPage'
import { DEFAULT_ORDER, DEFAULT_ORDERBY } from '../api/characters-api'
// import { act } from 'react'

// Mock data for characters
const characters = [
    {
        id: "1",
        name: "Thor",
        modified: "2022-01-01"
    },
    {
        id: "2",
        name: "Captain America",
        modified: "2022-01-02"
    }
];

describe('CharactersPage', () => {
    test('render CharactersPage component with default sorting', async () => {

        // Create a stub for the routes to include CharactersPage
        const Stub = createRoutesStub([
            {
                path: '/characters',
                Component: CharactersPage,
                HydrateFallback: () => null, // No fallback needed for this test
                loader: () => ({ characters: characters }),
            },
        ])

        // Render the CharactersPage component within the routing context
        act(() => {
            render(<Stub initialEntries={['/characters']} />)
        })

        // Wait for the heading to appear to ensure routing/render updates are settled
        const heading = await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' })
        expect(heading).toBeInTheDocument()

        // expect the document title to be "Characters | Marvel App"
        expect(document.title).toBe('Characters | Marvel App')

        // get the character list by test id to be able to check its children order
        const characterList = screen.getByTestId('characters-list');
        
        // expect the character Thor to be the first element in the ul
        expect(characterList.children[0]).toHaveTextContent(characters[0].name);

        // expect the charater Captain America to be the second element in the ul
        expect(characterList.children[1]).toHaveTextContent(characters[1].name);

        // expect the number of characters to be in the document
        const numberOfCharactersElement = screen.getByText(`There are ${characters.length} characters`);
        expect(numberOfCharactersElement).toBeInTheDocument();

        // expect the orderBy select to have the value "modified"
        const orderBySelect = screen.getByTestId('orderBy');
        expect(orderBySelect).toHaveValue(DEFAULT_ORDERBY);

        // expect the order select to have the value "desc"
        const orderSelect = screen.getByTestId('order');
        expect(orderSelect).toHaveValue(DEFAULT_ORDER);

        // uncomment to see the full DOM output
        // screen.debug()
    })

    test('render CharactersPage component with different order and orderBy', async () => {
        // Create a stub for the routes to include CharactersPage
        const Stub = createRoutesStub([
            {
                path: '/characters',
                Component: CharactersPage,
                HydrateFallback: () => null, // No fallback needed for this test
                loader: () => ({ characters: characters }),
            },
        ])

        // Render the CharactersPage component within the routing context
        act(() => {
            render(<Stub initialEntries={['/characters?orderBy=modified&order=desc']} />)
        })

        // Wait for the heading to appear to ensure routing/render updates are settled
        const heading = await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' })
        expect(heading).toBeInTheDocument()

        // expect the document title to be "Characters | Marvel App"
        expect(document.title).toBe('Characters | Marvel App')

        // get the character list by test id to be able to check its children order
        const characterList = screen.getByTestId('characters-list');
        
        
        // expect the character Thor to be in the document
        expect(characterList.children[0]).toHaveTextContent(characters[0].name);

        // expect the charater Captain America to be in the document
        expect(characterList.children[1]).toHaveTextContent(characters[1].name);

        // expect the number of characters to be in the document
        const numberOfCharactersElement = screen.getByText(`There are ${characters.length} characters`);
        expect(numberOfCharactersElement).toBeInTheDocument();

        // expect the orderBy select to have the value "modified"
        const orderBySelect = screen.getByTestId('orderBy');
        expect(orderBySelect).toHaveValue('modified');

        // expect the order select to have the value "desc"
        const orderSelect = screen.getByTestId('order');
        expect(orderSelect).toHaveValue('desc');

        // uncomment to see the full DOM output
        // screen.debug()
    })

    // // TODO : fix this test, an error appears in console
    test('render CharactersPage component with order and orderBy when the select changes', async () => {
        // Create a stub for the routes to include CharactersPage
        const Stub = createRoutesStub([
            {
                path: '/characters',
                Component: CharactersPage,
                HydrateFallback: () => null, // No fallback needed for this test
                loader: () => ({ characters: characters }),
            },
        ])

        // Render the CharactersPage component within the routing context
        act(() => {
            render(<Stub initialEntries={['/characters']} />)
        })

        
        // Wait for the heading to appear to ensure routing/render updates are settled
        const heading = await screen.findByRole('heading', { level: 2, name: 'Marvel Characters' })
        expect(heading).toBeInTheDocument()
    
        // expect the document title to be "Characters | Marvel App"
        expect(document.title).toBe('Characters | Marvel App')

        // expect the character Thor to be in the document
        const thorElement = screen.getByText(characters[0].name);
        expect(thorElement).toBeInTheDocument();

        // expect the charater Captain America to be in the document
        const captainAmericaElement = screen.getByText(characters[1].name);
        expect(captainAmericaElement).toBeInTheDocument();

        // expect the number of characters to be in the document
        const numberOfCharactersElement = screen.getByText(`There are ${characters.length} characters`);

        expect(numberOfCharactersElement).toBeInTheDocument();

        // expect the orderBy select to have the value "name"
        let orderBySelect = screen.getByTestId('orderBy');
        expect(orderBySelect).toHaveValue('name');

        // expect the order select to have the value "asc"
        let orderSelect = screen.getByTestId('order');
        expect(orderSelect).toHaveValue('asc');

        // when order select changes to desc
        await userEvent.selectOptions(orderSelect, 'asc');
        expect(orderBySelect).toHaveValue('name');
        expect(orderSelect).toHaveValue('asc');

        // when orderBy select changes to modified
        await userEvent.selectOptions(orderBySelect, 'modified');
        expect(orderBySelect).toHaveValue('modified');
        expect(orderSelect).toHaveValue('asc');

        // get the character list by test id to be able to check its children order
        const characterList = screen.getByTestId('characters-list');
        
        // expect the character Thor to be in the document
        expect(characterList.children[0]).toHaveTextContent(characters[0].name);
        
        // expect the charater Captain America to be in the document
        expect(characterList.children[1]).toHaveTextContent(characters[1].name);
       
        // uncomment to see the full DOM output
        // screen.debug()
    })
})