import MainPage from "../pages/UserPages/index.jsx";
import CardPage from "../pages/UserPages/CardPage/index.jsx";

export const ROUTES = [
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                index: true,
                element: <CardPage/>,
            },
            {
                path: '*',
                element: <CardPage/>,
            }
        ]
    }
];
