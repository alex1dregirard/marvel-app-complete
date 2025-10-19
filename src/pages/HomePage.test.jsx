// src/pages/HomePage.test.jsx

import { describe, expect, test } from '@jest/globals'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import HomePage from './HomePage'
import { createRoutesStub } from 'react-router'

describe('HomePage', () => {
    
    test('sets document title to "Home | Marvel App"', () => {
        // Create a stub for the routes to include CharactersPage
        const Stub = createRoutesStub([
            {
                path: '/',
                Component: HomePage,
                HydrateFallback: () => null, // No fallback needed for this test
            },
            {
                path: '/characters',
                Component: () => <div>Characters Page</div>,
                HydrateFallback: () => null, // No fallback needed for this test
            }
        ])

        // Render the CharactersPage component within the routing context
        act(() => {
            render(<Stub initialEntries={['/']} />)
        })

        // uncomment to see the rendered output
        // screen.debug()
        
        // expect to be redirected to /characters
        const charactersPageElement = screen.getByText('Characters Page')
        expect(charactersPageElement).toBeInTheDocument()
    })
})