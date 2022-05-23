import { ActionIcon, Container, Grid } from "@mantine/core"
import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import buildmenewImg from "../../images/build-me-new.png"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowCircleLeft, faCheck, faEye } from "@fortawesome/free-solid-svg-icons"
import { motion, AnimatePresence } from "framer-motion"
import { randomId } from "@mantine/hooks"
import { setTemplate } from "../../lib/createHandler"
import { useRouter } from 'next/router'

const Template = () => {

    const router = useRouter()
    const [selectedTemplate, setSelecetedTemplate] = useState(null)

    const templates = [
        {
            img: buildmenewImg,
            name: "build_me_new_resume",
            key: randomId()
        }
    ]

    const selected = (temp) => {
        setTemplate(temp.name)
        router.push('/create/finish')
    }

    return <>
        <Layout title="Select Template">
            <div className="templates_page">
                <Container size="lg">
                    <div className="page_header">
                        <p>Templates</p>
                    </div>

                    <Grid gutter="xl">
                        {
                            templates.map((temp) => (
                                <Grid.Col span={6} md={3} key={temp.key}>
                                    <div className="template_card">
                                        <div className="template_img_contain">
                                            <div className="img">
                                                <Image 
                                                    src={temp.img} 
                                                    alt="" 
                                                    layout='responsive'
                                                    objectFit='contain'
                                                />
                                            </div>

                                            <div className="template_card_overlay">
                                                <ActionIcon 
                                                    variant="transparent" 
                                                    mr={30} 
                                                    style={{fontSize: "1.3em"}} 
                                                    title="Preview template"
                                                    size="1.3em"
                                                    onClick={() => setSelecetedTemplate(temp)}
                                                >
                                                    <FontAwesomeIcon icon={faEye} color="white" />
                                                </ActionIcon>
                                                <ActionIcon 
                                                    variant="transparent"  
                                                    title="Use template"
                                                    style={{fontSize: "1.3em"}}
                                                    size="1.3em"
                                                    onClick={() => selected(temp)}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} color="white" />
                                                </ActionIcon>
                                            </div>

                                        </div>

                                        <div className="mobile_btn_contain">
                                            <button 
                                                className="transparent"
                                                onClick={() => setSelecetedTemplate(temp)}
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                                <span>Preview</span>
                                            </button>
                                            <button 
                                                className="filled"
                                                onClick={() => selected(temp)}
                                            >
                                                <FontAwesomeIcon icon={faCheck} />
                                                <span>Use</span>
                                            </button>
                                        </div>
                                    </div>
                                </Grid.Col>
                            ))
                        }
                        
                    </Grid>


                    <AnimatePresence>
                        {
                            selectedTemplate &&
                            <>
                                <motion.div
                                    className="template_preview_overlay"
                                    onClick={() => setSelecetedTemplate(null)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                ></motion.div>

                                <motion.div
                                    className="template_previewer"
                                    animate={{ x: 0 }}
                                    initial={{ x: "100%" }}
                                    transition={{ type: "tween", stiffness: 50, duration: 0.4 }}
                                    exit={{ x: "100%" }}
                                >
                                    <div className="contain">
                                        <ActionIcon
                                            style={{ fontSize: "1.3em" }}
                                            size="1.3em"
                                            onClick={() => setSelecetedTemplate(null)}
                                        >
                                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                                        </ActionIcon>

                                        <div className="template_preview_img">
                                            <Image
                                                src={selectedTemplate.img}
                                                alt=""
                                                layout='responsive'
                                                objectFit='contain'
                                            />
                                        </div>
                                    </div>

                                    <div 
                                        className="select_btn"
                                        onClick={() => selected(selectedTemplate)}
                                    >
                                        Use Template
                                    </div>
                                </motion.div>
                            </>
                        }
                    </AnimatePresence>
                </Container>
            </div>
        </Layout>
    </>
}

export default Template