import { ActionIcon, Modal, TextInput } from "@mantine/core"
import Create from "../../components/Create"
import Layout from "../../components/Layout"
import { useState, useEffect, useRef } from "react"
import { randomId } from "@mantine/hooks"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faTimes } from "@fortawesome/free-solid-svg-icons"
import { checkProp, getProp, getResume, updateResume } from "../../lib/createHandler"

const Skills = () => {

    const resume = getResume()

    const router = useRouter()

    const [missingInfo, setMissingInfo] = useState(false)

    const [skillValue, setSkillValue] = useState([])
    const skillInput = useRef(null)
    const [skillError, setSkillError] = useState(null)

    const addToForm = (e) => {
        e.preventDefault()

        let newFields = {
            skillName: skillInput.current.value,
            key: randomId()
        }

        let temp_error = null
    
        skillInput.current.value.trim().length < 1 ? temp_error = 'Field is required' : null
        setSkillError(temp_error)

        if (temp_error != null){
            return;
        }

        skillInput.current.value = ""

        setSkillValue([...skillValue, newFields])
    }

    const removeFormItem = (key) => {
        setSkillValue(temp_skill => temp_skill.filter(item => item.key !== key))
    }

    const handleSubmit = () => {

        if (skillValue.length === 0) {
            resume = {...resume, skills: null}
            updateResume(resume)
            setMissingInfo(true)
            return
        }

        resume = {...resume, skills: skillValue}
        updateResume(resume)

        router.push('/create/career-objectives')
    }

    useEffect(() => {
        if (checkProp('skills')) {
            if (getProp('skills') !== null) setSkillValue(getProp('skills'))
        }
    }, [])
    
    return <>
    
        <Layout title="Skills">
            <Create name="Skills" progress={60} description="Add your language, technology, equipment, software, and/or other abilites">
                <div className="skills_page">
                    <form onSubmit={addToForm} onChange={() => setSkillError(null)}>

                        <TextInput
                            required
                            ref={skillInput}
                            label="Skill"
                            placeholder="Java"
                            error={skillError}
                            rightSectionWidth={50}
                        />
                    </form>

                    <div className="skill_pills_contain">
                        {
                            skillValue.map((item, index) => (
                                <div className="skill_pill" key={item.key}>
                                    <p className="skill_name">{item.skillName}</p>
                                    <ActionIcon onClick={() => removeFormItem(item.key)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </ActionIcon>
                                </div>
                            ))
                        }
                    </div>

                    <div className="btn_contain">
                        <button className="back_btn" type="button" onClick={() => router.push('/create/education')}>
                            <FontAwesomeIcon icon={faAngleLeft} color="inherit" />
                            <span style={{marginLeft: '10px'}}>back</span>
                        </button>
                        <button className="main_btn" onClick={handleSubmit}>
                            <span style={{marginRight: '10px'}}>continue</span>
                            <FontAwesomeIcon icon={faAngleRight} color="inherit" />
                        </button>
                    </div>

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
                                onClick={() => router.push('/create/career-objectives')}
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

export default Skills