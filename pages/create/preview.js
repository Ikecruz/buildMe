import { PDFViewer } from "@react-pdf/renderer"
import { useEffect, useState } from "react";
import JamesMiller from "../../templates/james-miller"

const Preview = () => {

    const [ssrCatch, setSsrCatch] = useState(false);

    useEffect(() => {
        setSsrCatch(true)
    }, [])

    return <>
    
        {
            ssrCatch &&
            <PDFViewer height={"700px"} width={"100%"}>
                <JamesMiller />
                {/* {console.log(sessionStorage.getItem('resume'))} */}
            </PDFViewer>
        }
    
    </>
}

export default Preview