import Lottie from "react-lottie";
import * as animationData from "./animations/satellite.json"

const LottieSatellite = () => {
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
                height={220}
                width={220}
            />
        </div>
    );
}

export default LottieSatellite