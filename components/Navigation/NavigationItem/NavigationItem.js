import Link from "next/link"
import { useRouter } from "next/router"
import classes from "./NavigationItem.module.scss"
import { motion } from "framer-motion";

const refreshPage = (router) => {

    if (router.pathname === "/tracking") {
        // the app will refresh after navigating away from this link
        window.location.reload(false)
        window.location.href = "/";
    }
}

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const NavigationItem = (props) => {
    const router = useRouter()
    const attachedClasses = [classes.NavigationItem]
    let linkTag = <Link href={props.link}><a onClick={() => refreshPage(router)} className={router.pathname === props.link ? classes.active : ""}>{props.children}</a></Link>

    if (props.special) {
        attachedClasses.push(classes.SpecialText)
        if (router.pathname === props.link) {
            attachedClasses.push(classes.active)
        }
        linkTag = <Link as={props.link} href={props.link}><a onClick={() => refreshPage(router)} className={attachedClasses.join(" ")}>{props.children}</a></Link>
    }

    return (
        <motion.li
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={attachedClasses.join(" ")}>
            {linkTag}
        </motion.li>
    )
}

export default NavigationItem