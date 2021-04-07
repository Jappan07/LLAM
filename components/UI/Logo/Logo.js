import Link from "next/link"
import { useRouter } from "next/router"
import classes from "./Logo.module.css"

const refreshPage = (router) => {

    if (router.pathname === "/tracking") {
        // the app will refresh after navigating away from this link
        window.location.reload(false)
        window.location.href = "/";
    }
}

const Logo = () => {
    const router = useRouter()
    return (
        <Link href="/">
            <div onClick={() => refreshPage(router)} className={classes.Logo}>
                <img src="/assetss/logo.png" alt="logo" />
                <p><span><b>L.L.A.M</b></span></p>
            </div>
        </Link>
    )
}

export default Logo