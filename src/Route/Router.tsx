import {
    createBrowserRouter,
    Route,
    createRoutesFromElements
} from 'react-router-dom';
import RootLayout from '../Layout/RootLayout';
import AdsClubs from '../Features/AdsClubs/AdsClubs';
import AdsChains from '../Features/AdsChains/AdsChains';
import { AdsChainProvider } from '../Context/AdsChainContext'

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RootLayout />}>
            <Route index element={
                //add context provider
                <AdsClubs />
            }></Route>
            <Route path='/chain' element={
                <AdsChainProvider >
                    <AdsChains />
                </AdsChainProvider>
            }></Route>
        </Route>
    ));

export default Router;