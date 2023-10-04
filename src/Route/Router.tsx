import {
    createBrowserRouter,
    Route,
    createRoutesFromElements
} from 'react-router-dom';
import RootLayout from '../Layout/RootLayout';
import AdsClubs from '../Features/AdsClubs/AdsClubs';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<AdsClubs />}></Route>
        </Route>
    ));

export default Router;