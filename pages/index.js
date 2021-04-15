import React, { useEffect } from 'react';
import { useRouter } from "next/router"
import Button from "../components/UI/Button/Button"
import classes from "./homePage.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SmallCard from "../components/UI/Cards/SmallCard/SmallCard"
import LottieEarth from "../components/LottieAnimations/earth/earth"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NextSeo } from "next-seo"

const HomePage = () => {
    const SEO = {
        title: "Locust Location & Apprehension Module",
        description: "Locate and track locusts around the world!",

        openGraph: {
            title: "Locust Location & Apprehension Module",
            description: "Locate and track locusts around the world!",
        },
    }

    useEffect(() => {
        AOS.init({
            // offset: 400,
            duration: 700,
            delay: 50,
            once: true,
        })
    })
    useEffect(() => {
        AOS.refresh()
    }, [AOS])

    const router = useRouter()

    const handleClick = e => {
        const element = document.getElementById("features-section")
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    const variants = {
        hidden: {
            scale: .8,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: .4
            }
        }
    }

    return (
        <>
            <NextSeo {...SEO} />
            <div>
                <section id="home" className={classes.heroSection}>
                    <div className={classes.Image}>
                        <video preload="true" poster="/assetss/wheat-crop.jpg" autoPlay muted loop>
                            <source src="/assetss/wheat.mp4" type="video/mp4" />
                        </video>
                    </div>

                    <div className={classes.heroContent}>
                        <h1>
                            <div className={classes.animation}>
                                <span className={classes.first}>Save Crops from</span>
                                <span className={classes.oh}>
                                    <span className={classes.second}>Locust Attacks</span>
                                </span>
                            </div>
                        </h1>
                        <motion.div initial="hidden" animate="visible" variants={variants}>
                            <Button className={classes.Button} clicked={() => router.push("/tracking")}>Track Locusts <FontAwesomeIcon icon={faSearchLocation} /></Button>
                        </motion.div>
                        <span onClick={handleClick} className={classes.scrollDown}><ExpandMoreIcon className={classes.Icon} fontSize="small" /></span>
                    </div>
                </section>
                <section id="features-section" className={classes.FeaturesSection}>
                    <h1>Why Locust Location & Apprehension Module?</h1>
                    <div className={classes.Features}>
                        <ul>
                            <li data-aos="fade-right">
                                <SmallCard component="protection" Heading="Protection" Text="Protect crops from getting destroyed by locusts" />
                            </li>
                            <li data-aos="fade-right" data-aos-delay="300">
                                <SmallCard component="map" Heading="Tracking" Text="Track the trajectory of locusts easily" />
                            </li>
                            <li data-aos="fade-right">
                                <SmallCard component="satellite" Heading="Accuracy" Text="Satellite imagery gives accurate results" />
                            </li>
                            <li data-aos="fade-right" data-aos-delay="200">
                                <SmallCard component="calm" special Heading="No Stress" Text="Taking precautions beforehand for stress free harvesting" />
                            </li>
                        </ul>
                    </div>
                </section>
                <section id="how-it-works-section" className={classes.HowItWorksSection}>
                    <h1 data-aos="zoom-in">
                        How it Works?
                    </h1>
                    <div className={classes.Working}>
                        <p data-aos="zoom-in-right">Collecting Real time data from various source</p>
                        <p data-aos="zoom-in-left">Processing these data on our bi layer ML models to find out the Risk and future attack possibilities</p>
                        <p data-aos="zoom-in-right">Visualise through Plotting or Quering the data</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default HomePage
