import { Navigate } from "react-router";

const HomePage = () => {
    // change the title of the page
    document.title = "Home | Marvel App";

    return (
        <>
            { /* Redirect to /characters page */ }
            <Navigate to="/characters" replace={true} />
        </>
    );
};

export default HomePage;