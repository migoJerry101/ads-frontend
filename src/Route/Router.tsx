import {
    createBrowserRouter,
    Route,
    createRoutesFromElements
} from 'react-router-dom';
import RootLayout from '../Layout/RootLayout';
import AdsClubs from '../Features/AdsClubs/AdsClubs';
import AdsChains from '../Features/AdsChains/AdsChains';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={<AdsClubs />}></Route>
            <Route path='/chain' element={<AdsChains />}></Route>
        </Route>
    ));

export default Router;