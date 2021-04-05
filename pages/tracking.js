import dynamic from 'next/dynamic'
import { NextSeo } from "next-seo"

const Tracking = dynamic(() => import('../components/Tracking/Tracking'), {
    ssr: false,
});

const Tracker = () => {
    const SEO = {
        title: "Locust Locator",
        description: "track locusts here",

        openGraph: {
            title: "Locust Locator",
            description: "track locusts here",
        },
    }

    return (
        <>
            <NextSeo {...SEO} />
            <div style={{ backgroundColor: "#000" }}>
                <Tracking />
                <h1 style={{ color: "white", textAlign: "center", padding: "200px" }}>For best viewing experience use the desktop app.</h1>
            </div>
        </>
    )
}

export default Tracker