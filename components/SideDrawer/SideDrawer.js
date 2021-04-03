import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems"
import Logo from "../../components/UI/Logo/Logo"
import classes from "./SideDrawer.module.css"

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]

    if (props.open) {
        console.log(attachedClasses)
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <>
            {/* <Backdrop show={props.open} clicked={props.close} /> */}
            <div className={attachedClasses.join(" ")} onClick={props.close}>
                <div className={classes.LogoContainer}><Logo /></div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    )

}

export default SideDrawer
