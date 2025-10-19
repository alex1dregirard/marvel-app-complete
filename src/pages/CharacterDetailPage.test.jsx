// src/pages/CharacterDetailPage.test.jsx

import { expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import CharacterDetailPage from './CharacterDetailPage'

// Mock data for a character
const character = {
    id: "1",
    name: "Thor",
    description: "God of Thunder",
    thumbnail: {
        path: "http://example.com/thor",
        extension: "jpg"
    }
};
test('render CharacterDetailPage component', async () => {
    // Create a stub for the routes to include CharacterDetailPage
    const Stub = createRoutesStub([
        { 
            path: '/characters/:id', 
            Component: CharacterDetailPage,
            HydrateFallback: () => null, // No fallback needed for this test
            loader: () => ({ character: character }),
        },
    ])

    // Render the CharacterDetailPage component within the routing context
    render(<Stub initialEntries={['/characters/1']} />)

    // Wait for the heading to appear to ensure routing/render updates are settled
    const heading = await screen.findByRole('heading', { level: 2, name: character.name })
    expect(heading).toBeInTheDocument()

    // expect the document title to be "Thor | Marvel App"
    expect(document.title).toBe(`${character.name} | Marvel App`)

    // expect the character description to be in the document
    const descriptionElement = screen.getByText(character.description);
    expect(descriptionElement).toBeInTheDocument();

    // expect the character image to be in the document with correct src and alt attributes
    const imageElement = screen.getByAltText(character.name);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', `${character.thumbnail.path}/standard_large.${character.thumbnail.extension}`);

    // expect to have a heading with the text "Using D3"
    const h3D3Element = screen.getByRole('heading', { level: 3, name: 'Using D3' });
    expect(h3D3Element).toBeInTheDocument();

    // expect to have a div with the id "pie-container"
    expect(document.getElementById('pie-container')).toBeInTheDocument();
    
    // uncomment to see the full DOM output
    // screen.debug()
});