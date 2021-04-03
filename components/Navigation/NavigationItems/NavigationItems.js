import NavigationItem from "../NavigationItem/NavigationItem"
import classes from "./NavigationItems.module.css"

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Home</NavigationItem>
            <NavigationItem special link="/tracking">Track Now</NavigationItem>
            <NavigationItem link="/about">About</NavigationItem>
        </ul>
    )
}

export default NavigationItems