import Image from "next/image"
import classes from "./NeumorphismCard.module.scss"

const NeumorphismCard = ({ number, Heading, Text }) => {
    return (
        <div className={classes.container}>
            <div className={classes.card}>
                {/* <div className={classes.imgBx}> */}
                {/* <Image src={ImageSrc} height="500px" width="400px" alt="image" layout={"responsive"} /> */}
                {/* </div> */}
                <h1 style={{ color: "grey", fontSize: "10rem" }}>{number}</h1>
                <div className={classes.contentBx}>
                    <h2>{Text}</h2>
                </div>
            </div>
        </div>
    )
}

export default NeumorphismCard