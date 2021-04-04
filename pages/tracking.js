import dynamic from 'next/dynamic'
import { NextSeo } from "next-seo"

const Tracking = dynamic(() => import('../components/Tracking/Tracking'), {
    ssr: false,
});

const Tracker = () => {
    const SEO = {
        title: "Locust Tracking Page",
        description: "track locusts here",

        openGraph: {
            title: "Locust Tracking Page",
            description: "track locusts here",
        },
    }

    return (
        <>
            <NextSeo {...SEO} />
            <div>
                <Tracking />
            </div>
        </>
    )
}

export default Tracker