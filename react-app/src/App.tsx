import { BrowserRouter as Router } from 'react-router-dom'
import styles from './App.module.css';
import Main from './common'

function App() {
    return (
        <div className={styles.App}>
            <Router>
                <Main />
            </Router>
        </div>
    );
}

export default App;