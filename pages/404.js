import Image from "next/image"

const NotFoundPage = () => {
    return (
        <div className="errorPage">
            <Image width="400" height="400" src="/assetss/404Illustration.gif" alt="404-image" />
        </div>
    )
}

export default NotFoundPage