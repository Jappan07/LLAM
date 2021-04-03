import { motion } from "framer-motion"
import classes from "./Button.module.scss"

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

const Button = (props) => {
    return (
        <motion.button
            style={{ height: props.height, width: props.width }}
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={props.clicked}
            className={classes.BtnShine}>
            <span>{props.children}</span>
        </motion.button>
    )
}

export default Button