import { Link } from 'react-router-dom';
import logo from '../logo192.png'
const styles = {
    header: {
        width: "100vw",
        pading: "4px 24px 4px 24px",
        height: "64px",
        backgroundColor: "#24292e",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }
}

const Header = () => {

    return(
        <div style={styles.header}>
            <Link to="/">
                <img src={logo} alt="logo" height="48px"/>
            </Link>
            <Link to="/about" style={{color: '#ffffff'}}>About</Link>
        </div>
    )
}

export default Header;