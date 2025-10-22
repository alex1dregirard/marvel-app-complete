import AboutPage from './pages/AboutPage';
import CharactersPage from './pages/CharactersPage';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';
import NotFoundPage from './pages/NotFoundPage';
import { DEFAULT_ORDER, DEFAULT_ORDERBY, getCharacterById, getCharacters } from './api/characters-api';
import CharacterDetailPage from './pages/CharacterDetailPage';
import HomePage from './pages/HomePage';
import Loading from './components/Loading';

// routes of the application
const routes = [
  {
    path: "/",
    Component: Layout,
    HydrateFallback: Loading,
    children: [
      {
        path: "/",
        index: true,
        Component: HomePage
      },
      {
        // characters page
        path: "/characters",
        loader: async ({ request }) => {
          // Get the sort and order query parameters from the URL
          const url = new URL(request.url);
          const searchParams = url.searchParams;

          const orderBy = searchParams.get("orderBy") || DEFAULT_ORDERBY
          const order = searchParams.get("order") || DEFAULT_ORDER

          const characters = await getCharacters(orderBy, order);
          
          return { characters };
        },
        Component: CharactersPage
      },
      {
          path: "/characters/:id",
          Component: CharacterDetailPage,
          loader: async ({ params }) => {
            return { character: await getCharacterById(params.id) };
          }
      },
      {
        // about page
        path: "/about",
        Component: AboutPage
      },
      {
        // contact page
        path: "/contact",
        Component: ContactPage
      },
      {
        // 404 page
        path: "*",
        Component: NotFoundPage
      }
    ],
  },
]

export default routes;