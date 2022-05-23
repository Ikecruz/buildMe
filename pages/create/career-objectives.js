import { Modal, Textarea } from "@mantine/core"
import Create from "../../components/Create"
import Layout from "../../components/Layout"
import { useState, useEffect, useRef } from "react"
import { randomId } from "@mantine/hooks"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faTimes } from "@fortawesome/free-solid-svg-icons"
import { checkProp, getProp, getResume, updateResume } from "../../lib/createHandler"

const Summary = () => {

    const resume = getResume()

    const router = useRouter()

    const [missingInfo, setMissingInfo] = useState(false)

    const [summary, setSummary] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {

        e.preventDefault()

        if (summary.length === 0) {
            setMissingInfo(true)
            return
        }

        let temp_error = null
    
        summary.trim().length < 50 ? temp_error = 'Career summary should be at least 50 characters long' : null
        setError(temp_error)

        if (temp_error != null){
            return;
        }

        resume = {...resume, summary: summary.trim()}
        updateResume(resume)

        router.push('/create/template')
    }

    useEffect(() => {
        if (checkProp('summary')) {
            setSummary(getProp('summary'))
        }
    }, [])
    
    return <>
    
        <Layout title="Career Objectives">
            <Create name="Career Objectives" progress={80} description="Finish your resume with a short summary">
                <div className="skills_page">
                    <form onSubmit={handleSubmit} onChange={() => setError(null)}>

                        <Textarea
                            placeholder=""
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            label="Career Objectives"
                            error={error}
                            autosize
                            minRows={6}
                        />

                        <div className="btn_contain">
                            <button className="back_btn" type="button" onClick={() => router.push('/create/skills')}>
                                <FontAwesomeIcon icon={faAngleLeft} color="inherit" />
                                <span style={{marginLeft: '10px'}}>back</span>
                            </button>
                            <button className="main_btn" onClick={handleSubmit}>
                                <span style={{marginRight: '10px'}}>continue</span>
                                <FontAwesomeIcon icon={faAngleRight} color="inherit" />
                            </button>
                        </div>
                    </form>

                    <Modal
                        opened={missingInfo}
                        centered
                        withCloseButton={false}
                        onClose={() => setMissingInfo(false)}
                    >
                        <p className="missing_info_header">Missing Fields</p>
                        <p className="missing_info_msg">Looks like you haven&apos;t entered any value in the Form provided, It&apos;s recommended you fill in the Form</p>
                        <div className="missing_info_btn_contain">
                            <button
                                onClick={() => router.push('/create/template')}
                            >
                                Skip
                            </button>
                            <button
                                onClick={() => setMissingInfo(false)}
                                className="filled"
                            >
                                Fix
                            </button>
                        </div>
                    </Modal>
                </div>
            </Create>
        </Layout>
    
    </>
}

export default Summary