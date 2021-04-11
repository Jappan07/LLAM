import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Toolbar from "../Toolbar/Toolbar"
import SideDrawer from "../SideDrawer/SideDrawer"
import FavoriteIcon from '@material-ui/icons/Favorite';
import GitHubIcon from '@material-ui/icons/GitHub';
import classes from "./Layout.module.scss"

const Layout = (props) => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false)
    }

    return (
        <>
            <Toolbar open={sideDrawerIsVisible} drawerToggler={sideDrawerToggleHandler} />
            <SideDrawer open={sideDrawerIsVisible} close={sideDrawerClosedHandler} />
            <main>{props.children}</main>
            <div id="footer">
                <div className={classes.Footer}>
                    <span className={classes.HHLogo}><img src={"/assetss/HackerHouse.png"} alt="Hacker House logo" /></span>
                    <a href="https://github.com/Jappan07/LLAM" target="_blank"><GitHubIcon style={{ fontSize: "1rem", color: "lightgray", marginTop: "8px" }} /></a>
                    <Link href="/about"><a style={{ fontSize: ".6rem", color: "lightgray", textDecoration: "none", marginBottom: "8px" }}>About us</a></Link>
                    <h1 style={{ marginBottom: "10px" }}>Created with <FavoriteIcon style={{ fontSize: "18px", position: "relative", top: "5px" }} className={classes.Heart} /> by team HACKER HOUSE</h1>
                    <p>Copyright © 2021-3010</p>
                </div>
            </div>
        </>
    )
}

export default Layout