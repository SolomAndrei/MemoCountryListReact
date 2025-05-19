import { Countries } from './pages/Countries/Countries';
import { Photos } from './pages/Photos/Photos';
import { General } from './pages/General/General';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styles from './app.module.css';

function App() {
    return (
        <Router>
            <nav className={styles.nav}>
                <Link to="/countries">Countries</Link>
                <Link to="/photos">Photos</Link>
                <Link to="/">General</Link>
            </nav>
            <Routes>
                <Route path="/countries" element={<Countries />} />
                <Route path="/photos" element={<Photos />} />
                <Route path="/" element={<General />} />
            </Routes>
        </Router>
    );
}
export default App;
