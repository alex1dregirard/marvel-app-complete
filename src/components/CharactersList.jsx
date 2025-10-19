import { Link } from "react-router";

/**
 * Component that displays a list of characters
 * @param {*} characters - List of characters 
 */
export default function CharactersList({ characters = [] }) {
  return (
    <ul id="characters" data-testid="characters-list">
      { characters.map((character) => (
          <Link to={`/characters/${character.id}`} key={character.id}>
            <li>{ character.name }</li>
          </Link>
      ))} 
    </ul>
  );
}