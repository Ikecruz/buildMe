import Link from "next/link"
import Layout from "../components/Layout"
import { motion, useTransform, useViewportScroll } from "framer-motion"
import { Button, Container, Grid } from "@mantine/core"
import macImg from "../images/mac.png"
import cvImg from "../images/resumewebp.png"
import { useRef, useEffect } from "react"
import Image from "next/image"

const IndexPage = () => {

    const heroTextAnimate = {
        hidden: {
            scale: .8,
            opacity: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                delay: .8
            }
        }
    }

    const features = [
        {
            title: "Add your Info",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, quasi? Distinctio optio totam voluptatibus sed.",
        },
        {
            title: "select template",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, quasi? Distinctio optio totam voluptatibus sed.",
        },
        {
            title: "save pdf",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, quasi? Distinctio optio totam voluptatibus sed.",
        }
    ]

    const deviceAnimate = {
        hidden: {
            opacity: 0,
            scale: .5
        },
        visible: {
            opacity: 1,
            scale: 1
        }
    }

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

    return <>

        <Layout
            title="buildMe"
        >

            <div className="home_page">
                <div className="hero_section">
                    <div className="text_contain">
                        <motion.p 
                            className="hero_text"
                            initial="hidden"
                            animate="visible"
                            variants={heroTextAnimate}
                        >
                            Build <span className="special_text">professional resume</span> fast and stress free
                        </motion.p>
                    </div>
                    <Link href='/how-it-works' passHref>
                        <motion.a 
                            className="main_btn"
                            whileHover="onHover"
                            whileTap="onTap"
                            variants={btnAnimate}
                        >
                            Get Started For Free
                        </motion.a>
                    </Link>
                </div>

                <section>
                    <Container size="lg">
                        <div className="features_section">
                            <p className="features_header">It&apos;s so easy, you don&apos;t even need to think </p>

                            <Grid gutter="xl">
                                {
                                    features.map(({title, desc}, index) => (
                                        <Grid.Col span={12} md={4} key={index}>
                                            <div className="feature">
                                                <p className="number">0{index + 1}</p>
                                                <p className="title">
                                                    {title}
                                                </p>
                                                <p className="desc">
                                                    {desc}
                                                </p>
                                            </div>
                                        </Grid.Col>
                                    ))
                                }
                            </Grid>
                        </div>
                    </Container>
                </section>

                <section>
                    <Container size="lg">
                        <motion.div 
                            className="device_image_contain"
                            initial="hidden"
                            whileInView="visible"
                            variants={deviceAnimate}
                            viewport={{ once: true, amount: 0.8 }}
                        >
                            <p className="device_desc">The faster way to create professional-looking resumes</p>
                            <Image
                                src={macImg}
                                alt="Device Image"
                            />
                        </motion.div>
                    </Container>
                </section>


                <section>
                    <Container size="lg">
                        <Grid gutter="xl">

                            <Grid.Col 
                                span={12} 
                                md={6} 
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <div className="cv_text_contain">
                                    <p className="title">There&apos;s a resume for every profession</p>
                                    <p className="desc">Our resume creator comes with 18 fully customizable templates. You’ll get advice on which one to pick depending on your industry, seniority level, and the kind of company you’re applying to.</p>
                                    <Link href='/how-it-works' passHref>
                                        <motion.a 
                                            className="main_btn"
                                            whileHover="onHover"
                                            whileTap="onTap"
                                            variants={btnAnimate}
                                        >
                                            create resume
                                        </motion.a>
                                    </Link>
                                </div>
                            </Grid.Col>

                            <Grid.Col span={12} md={6}>
                                <Image
                                    src={cvImg}
                                    alt="Resume Image"
                                />
                            </Grid.Col>
                        </Grid>
                    </Container>
                </section>


                <section>
                    <Container size="lg">

                        <p className="users_comment_header">What people say</p>

                        <Grid gutter="xl">
                            <Grid.Col span={12} md={4}>
                                <div className="users_comments">
                                    <p className="name">Jadon Rashford</p>
                                    <p className="role">CEO Stringcode LTD</p>
                                    <p className="comment">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio magnam vitae voluptas distinctio numquam in hic error sint consequuntur maxime?</p>
                                </div>
                            </Grid.Col>
                            <Grid.Col span={12} md={4}>
                                <div className="users_comments">
                                    <p className="name">Cruz Ikedinobi</p>
                                    <p className="role">CEO Void INC</p>
                                    <p className="comment">If you don’t know how to build your own resume from scratch, don’t worry—the website walks you through the process step by step and tells you what information you need to input for each section</p>
                                </div>
                            </Grid.Col>
                            <Grid.Col span={12} md={4}>
                                <div className="users_comments">
                                    <p className="name">John Doe</p>
                                    <p className="role">Still Unemployed</p>
                                    <p className="comment">I went from fired to hired in less than 3 weeks. I was let go from my old job due to downsizing. With buildMe, I was able to build custom resumes tailored to the jobs I was applying to quickly and easily.</p>
                                </div>
                            </Grid.Col>
                        </Grid>
                    </Container>
                </section>

                <section>
                    <Container size="lg">
                        <div className="before_footer_section">
                            <p className="text">Create professional resumes with buildMe</p>
                            <p className="sub_text">Get started now. It&apos;s free</p>
                            <Link href="/how-it-works" passHref>
                                <motion.a 
                                    className="main_btn"
                                    whileHover="onHover"
                                    whileTap="onTap"
                                    variants={btnAnimate}
                                >
                                    create resume
                                </motion.a>
                            </Link>
                        </div>
                    </Container>
                </section>

            </div>

        </Layout>
    
    </>
}

export default IndexPage
