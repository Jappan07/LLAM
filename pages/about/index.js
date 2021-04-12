import Image from "next/image"
import { useEffect, useState, useRef } from 'react';
import { NextSeo } from "next-seo"
import SecurityIcon from '@material-ui/icons/Security';
import classes from "./about.module.scss"

const About = () => {

    const SEO = {
        title: "About",
        description: "This page includes What was the inspiration behind this project?",

        openGraph: {
            title: "About",
            description: "track locusts here",
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
                    <p><span>We have built L.L.A.M because locusts are increasingly becoming a great threat to the vegetation</span> and this threat is reportedly going to increase with each comin year. To safeguard our crops from this plague we needed some solution that could tackle this problem well. </p>
                </div>
                <div className={classes.AboutSection2}>
                    <SecurityIcon className={classes.Icon} style={{ fontSize: "10rem" }} />
                    <div className={classes.Content}>
                        <h2>Safeguarding the farmers is our priority</h2>
                        <p> Swarm locust has invaded many parts of African and Asian regions and destroyed crops and plantation during their first wave in 2019. They emerged in many billions causing severe food security threats. That was supposed to be the worst invasion that happened in the last 25 years in some of the African Countries. This has led to more number of suicides in the region.<br /> 1.3 million hectares of locust invasion were treated across 10 countries since January last year to stave off an economic and agricultural catastrophe.</p>
                    </div>
                </div>
                <div className={classes.AboutSection2}>
                    <img className={classes.Image} src="/assetss/noLocust.png" height="180" width="180" />
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
            </div>
        </>
    )
}

export default About
