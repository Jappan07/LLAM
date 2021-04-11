import Lottie from "react-lottie";
import * as animationData from "./animations/protection.json"

const LottieProtection = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={230}
                width={230}
            />
        </div>
    );
}

export default LottieProtection