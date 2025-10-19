import { describe, expect, jest, test } from '@jest/globals'

import { getCharacters, getCharacterById } from './characters-api';
import characters from '../data/characters.json';

const characterOne = {
  id: 1,
  name: "Character One",
  modified: "2014-01-13T14:48:32-0500",
};
const characterTwo = {
  id: 2,
  name: "Character Two",
  modified: "2014-01-12T14:48:32-0500",
};
const characterThree = {
  id: 3,
  name: "Character Three",
  modified: "2014-01-11T14:48:32-0500",
};
const characterFour = {
  id: 4,
  name: "Character Four",
  modified: "2014-01-14T14:48:32-0500",
};

// Mock the characters data for testing purposes
jest.mock('../data/characters.json', () => [
    characterOne,
    characterTwo,
    characterThree,
    characterFour,
]);

// Test suite for characters-api.js
describe('characters-api', () => {

    // Test for getCharacters function
    describe('getCharacters', () => {
        // Test to check if the function returns the full list of characters sorted by name in ascending order by default
        test('should return the list of characters sorted by name in ascending order by default', () => {
            const result = getCharacters();
            expect(result).toEqual([characterFour, characterOne, characterThree, characterTwo]);
        });

        // Test to check if the function returns the list of characters sorted by name in descending order
        test('should return the list of characters sorted by name in descending order', () => {
            const result = getCharacters('name', 'desc');
            expect(result).toEqual([characterTwo, characterThree, characterOne, characterFour]);
        });

        // Test to check if the function returns the list of characters sorted by modified date in ascending order
        test('should return the list of characters sorted by modified date in ascending order', () => {
            const result = getCharacters('modified', 'asc');
            expect(result).toEqual([characterThree, characterTwo, characterOne, characterFour]);
        });
    });

    // Test for getCharacterById function
    describe('getCharacterById', () => {
        // Test to check if the function returns the correct character for a valid ID
        test('should return the correct character when a valid ID is provided', () => {
            const result = getCharacterById(1);
            expect(result).toEqual(characterOne);
        });

        // Test to check if the function throws an error for an invalid ID
        test('should throw an error when an invalid ID is provided', () => {
            expect(() => getCharacterById(999)).toThrow('Character with id 999 not found');
        });
    });

});