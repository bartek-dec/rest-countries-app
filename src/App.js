import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home, SingleCountry, Error} from './pages';
import {Navbar} from './components';

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='country/:id' element={<SingleCountry/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
