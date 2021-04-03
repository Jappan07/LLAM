import Lottie from "react-lottie";
import * as animationData from "./animations/earth.json"
import classes from "./earth.module.scss"

const LottieEarth = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <div className={classes.Lottie}>
            <Lottie
                options={defaultOptions}
            // height={800}
            // width={800}
            />
        </div>
    );
}

export default LottieEarth