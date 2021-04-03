import Link from "next/link"
import NavigationItems from "../Navigation/NavigationItems/NavigationItems"
import classes from "./Toolbar.module.css"
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"
import Logo from "../UI/Logo/Logo"

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle open={props.open} clicked={props.drawerToggler} />
            {/* <h3><Link href="/"><a >Logo</a></Link></h3> */}
            <Logo />
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar