import { faCheck, faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Center, Loader, RingProgress, ThemeIcon } from "@mantine/core"
import Layout from "../../components/Layout"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PDFDownloadLink } from "@react-pdf/renderer"
import BuildMeNew from "../../templates/build-me-new"
import { getResume, getTemplate } from "../../lib/createHandler"
import JamesMiller from "../../templates/james-miller"
 
const Finish = () => {

    const resume = getResume()

    const [templateName, setTemplateName] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            let temp_name = getTemplate()
            setTemplateName(temp_name)
        }, [3000])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

        <Layout title="Finish">
            <div className="finish_page">

                <AnimatePresence>
                    {
                        !templateName &&
                        <motion.div 
                            className="loader_contain"
                            initial={{
                                opacity: 0,
                                scale: .5
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0
                            }}
                        >
                            <Loader size="xl" className="loader" />
                            <p className="text">Creating your resume...</p>
                        </motion.div>
                    }
                </AnimatePresence>

                <AnimatePresence>
                    
                    {
                        templateName &&
                        <motion.div 
                            className="success_contain"
                            initial={{
                                opacity: 0,
                                scale: .5
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    delay: .5
                                }
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0
                            }}
                        >
                            <RingProgress
                                sections={[{ value: 100, color: 'teal' }]}
                                label={
                                    <Center>
                                        <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                                        <FontAwesomeIcon icon={faCheck} />
                                        </ThemeIcon>
                                    </Center>
                                }
                                className="loader"
                            />
                            <p className="text">Your Resume is ready, Proceed to download</p>
                            <PDFDownloadLink 
                                document={
                                    <>
                                        { templateName === "build_me_new_resume" && <BuildMeNew resume={resume} /> }
                                        { templateName === "james_miller" && <JamesMiller resume={resume} /> }
                                    </>
                                } 
                                fileName="resume.pdf"
                            >
                                {({ blob, url, loading, error }) =>
                                    <motion.button 
                                        className="download_btn"
                                        whileHover="onHover"
                                        whileTap="onTap"
                                        variants={btnAnimate}
                                        disabled={loading}
                                    >
                                        <FontAwesomeIcon icon={faDownload} />
                                        <span>{ loading ? 'Loading document...' : 'Download Now' }</span>
                                    </motion.button>
                                }
                            </PDFDownloadLink>
                            
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </Layout>
    
    </>
}

export default Finish