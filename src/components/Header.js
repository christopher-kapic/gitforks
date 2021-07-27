import { Link } from 'react-router-dom';
import logo from '../logo192.png'
const styles = {
    header: {
        width: "calc(100vw-48px)",
        padding: "0px 24px 0px 24px",
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