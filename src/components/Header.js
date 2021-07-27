import { Link } from 'react-router-dom';
import logo from '../../public/logo192.png'
const styles = {
    header: {
        width: "calc(100vw - 24px)",
        pading: "4px 12px 4px 12px",
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
            <Link to="/about">About</Link>
        </div>
    )
}

export default Header;