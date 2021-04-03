import Image from "next/image"
import classes from "./SmallCard.module.scss"
import LottieMap from "../../../LottieAnimations/map/map"
import LottieSatellite from "../../../LottieAnimations/satellite/satellite"
import LottieProtection from "../../../LottieAnimations/protection/protection"
import LottieCalm from "../../../LottieAnimations/calm/calm"

const SmallCard = (props) => {
    let imageComponent = null

    switch (props.component) {
        case "map":
            imageComponent = <LottieMap />
            break;
        case "satellite":
            imageComponent = <LottieSatellite />
            break;
        case "protection":
            imageComponent = <LottieProtection />
            break;
        case "calm":
            imageComponent = <LottieCalm />
            break;
        default:
            imageComponent = <Image className={classes.CardImage} src={props.ImageSrc} alt="card-image" height="200" width="200" />
            break;
    }

    return (
        <div className={classes.Card}>
            <div className={classes.CardImageContainer}>
                {imageComponent}
            </div>
            <div className={classes.CardContent}>
                <div className={classes.Heading}>
                    <h3>{props.Heading}</h3>
                </div>
                <div className={classes.CardText}>
                    <p>{props.Text}</p>
                </div>
            </div>

        </div>
    )
}

export default SmallCard