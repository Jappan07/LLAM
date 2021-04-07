import Image from "next/image"

const NotFoundPage = () => {
    return (
        <div className="errorPage">
            <div id="errorPageContainer">
                <div className="fof">
                    <h1>Error 404</h1>
                </div>
            </div>
            <a href="/">Navigate Back To <u>Home</u></a>
        </div>
    )
}

export default NotFoundPage