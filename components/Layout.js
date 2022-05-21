import Head from "next/head"
import { motion } from "framer-motion"

const Layout = ({ children ,title, description }) => {

    const variants = {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
    }

    return <>
    
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
    
        <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{type: 'tween'}}
            variants={variants}
        >
            {children}
        </motion.main>
    </>
}

export default Layout