import Image from "next/image"
import { NextSeo } from "next-seo"
import SecurityIcon from '@material-ui/icons/Security';
import classes from "./about.module.scss"

const About = () => {

    const SEO = {
        title: "About",
        description: "about page of LLAM",

        openGraph: {
            title: "About",
            description: "about page of LLAM",
        },
    }

    return (
        <>
            <NextSeo {...SEO} />
            <div className={classes.Container}>
                <h1>Our mission:<br />
                    Safeguard crops from locust attacks
                </h1>

                <div className={classes.AboutSection1}>
                    <Image src="/assetss/animat-lightbulb-color.gif" width="200" height="200" />
                    <h2 style={{ marginBottom: "18px" }}>L.L.A.M - Locust Location & Apprehension Module</h2>
                    <p><span>We made L.L.A.M because locusts are increasingly becoming a great threat to the vegetation</span> and this threat is reportedly going to increase each year. To safeguard our crops from this plague we needed some solution that could tackle the problem well. </p>
                </div>
                <div className={classes.AboutSection2}>
                    <SecurityIcon className={classes.Icon} style={{ fontSize: "10rem" }} />
                    <div className={classes.Content}>
                        <h2>Safeguarding the farmers is our priority</h2>
                        <p>During 2019-20, locust attack was reported in some districts of Rajasthan and Gujarat in India. Rajasthan Government has reported that a total area of 1,79,584 hectares of 8 districts of the state was affected by locust attack during 2019-20. The State Government of Gujarat has reported that crop loss due to locust attack was observed in a total area of 19,313 hectares of 2 districts of the State during the year 2019-20.<br />This has led to more number of suicides in the region.</p>
                    </div>
                </div>
                <div className={classes.AboutSection2}>
                    <img className={classes.Image} src="/assetss/noLocust.png" height="200" width="200" />
                    <div className={classes.Content}>
                        <h2>Tracking Locusts = Eliminating Locusts Invasions</h2>
                        <p>Monitoring the attack beforehand would let farmers and government to take immediate actions to safeguard crops from the locust swarms. Immediate control means the use of pesticide sprays, especially biopesticides, which is the most feasible and practical option. </p>
                    </div>
                </div>
                <div className={classes.TeamSection}>
                    <div className={classes.Team}>
                        <h1>Who are we?</h1>
                        <h3>We are team Hacker House</h3>
                        {/* <ul>
                        <li>Anush Krishna</li>
                        <li>Ayesha Malik</li>
                        <li>Akshita Sharma</li>
                        <li>Jeevanshi</li>
                        <li>Jappanjeet Singh</li>
                        <li>Vedant Kharnair</li>
                    </ul> */}
                    </div>
                </div>
            </div >
        </>
    )
}

export default About