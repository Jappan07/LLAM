import classes from "./DrawerToggle.module.scss"
import { useState } from "react"

const DrawerToggle = (props) => {
    const [togglerOpen, setTogglerOpen] = useState(false)
    let attachedClasses = [classes.center]

    if (props.open) {
        attachedClasses = [classes.center, classes.active]
    }

    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div className={attachedClasses.join(" ")}>
                <div></div>
            </div>
        </div >
    )
}

export default DrawerToggle