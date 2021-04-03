import Link from "next/link"
import classes from "./Logo.module.css"

const Logo = () => {
    return (
        <Link href="/">
            <div className={classes.Logo}>
                <img src="/assetss/logo.png" alt="logo" />
                <p><span><b>L.L.A.M</b></span></p>
            </div>
        </Link>
    )
}

export default Logo