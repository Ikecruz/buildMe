import { Container, Grid } from "@mantine/core"
import Layout from "../components/Layout"
import Image from "next/image"
import Link from "next/link"
import step from "../images/step.svg"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { createResume } from "../lib/createHandler"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const HowItWorks = () => {

    const btnAnimate = {
        onHover: {
            scale: 1.1,
            opacity: 0.8
        },
        onTap: {
            scale: .7,
            opacity: 1
        }
    }

    useEffect(() => {
        createResume()
    }, [])

    return <>

        <Layout title="How it works">
            <div className="how_it_works_page">
                <Container size="lg">
                    <div className="how_it_works_contain">
                        <Grid gutter="lg">

                            <Grid.Col span={12} md={7}>
                                <p className="how_it_works_header">
                                    The easiest way to create a professional resume.
                                </p>
                                <ul className="step_list">
                                    <li>
                                        <span style={{marginRight: "15px"}}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span>Fill In Important Informations</span>
                                    </li>
                                    <li>
                                        <span style={{marginRight: "15px"}}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span>Select Preferred Template</span>
                                    </li>
                                    <li>
                                        <span style={{marginRight: "15px"}}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span>Save as pdf and print</span>
                                    </li>
                                </ul>
                                <Link href="/create/personal" passHref>
                                    <motion.a 
                                        className="main_btn"
                                        whileHover="onHover"
                                        whileTap="onTap"
                                        variants={btnAnimate}
                                    >
                                        create resume
                                    </motion.a>
                                </Link>
                            </Grid.Col>

                            <Grid.Col span={12} md={5}>
                                <div className="image_contain">
                                    <Image
                                        src={step}
                                        alt="Resume pic"
                                    />
                                </div>
                            </Grid.Col>

                        </Grid>
                    </div>
                </Container>
            </div>
        </Layout>
    
    </>
}

export default HowItWorks