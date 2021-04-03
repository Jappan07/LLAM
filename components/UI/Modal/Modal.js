import classes from "./Modal.module.css"

const Modal = (props) => {
    return (
        <div className={classes.Modal}>
            {props.children}
        </div>
    )
}

export default Modal