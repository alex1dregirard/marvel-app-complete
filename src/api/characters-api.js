import characters from '../data/characters.json'

// Default order by and order
export const DEFAULT_ORDERBY = 'name';
export const DEFAULT_ORDER = 'asc';

/**
 * returns the list of characters
 * @returns 
 */
export const getCharacters = (orderBy = DEFAULT_ORDERBY, order = DEFAULT_ORDER) => {
    const sortedCharacters = [...characters];
    sortedCharacters.sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy].localeCompare(b[orderBy]);
        } else {
            return b[orderBy].localeCompare(a[orderBy]);
        }
    });

    return sortedCharacters;
}

/**
 * returns a character by id
 * @param {*} id 
 * @returns 
 */
export const getCharacterById = (id) => {
  const character = characters.find(character => character.id === id);
    if (!character) {
        throw new Error(`Character with id ${id} not found`);
    }
    return character;
}