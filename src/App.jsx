import { Countries } from './pages/Countries/Countries';
import { Photos } from './pages/Photos/Photos';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styles from './app.module.css';

function App() {
    return (
        <Router>
            <nav className={styles.nav}>
                <Link to="/countries">Countries</Link>
                <Link to="/photos">Photos</Link>
            </nav>
            <Routes>
                <Route path="/countries" element={<Countries />} />
                <Route path="/photos" element={<Photos />} />
            </Routes>
        </Router>
    );
}
export default App;
