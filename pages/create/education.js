import { ActionIcon, Checkbox, Grid, Group, Select, TextInput } from "@mantine/core"
import Create from "../../components/Create"
import Layout from "../../components/Layout"
import { useState, useEffect, useRef } from "react"
import { DatePicker } from "@mantine/dates"
import { randomId } from "@mantine/hooks"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { checkProp, getProp, getResume, updateResume } from "../../lib/createHandler"

const Experience = () => {

    const resume = getResume()

    const router = useRouter()

    const initial = {
        schoolName: '',
        city: '',
        state: '',
        degree: '',
        gradDate: null,
        key: randomId()
    }

    const [formValue, setFormValue] = useState([initial])
    const [formError, setFormError] = useState([])

    const addToForm = () => {
        let newFields = {
            schoolName: '',
            city: '',
            state: '',
            degree: '',
            gradDate: null,
            key: randomId()
        }

        setFormValue([...formValue, newFields])
    }

    const removeFormItem = (key) => {
        setFormValue(temp_form => temp_form.filter(item => item.key !== key))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let temp_values = Object.assign({},formValue)
        let temp_initial = Object.assign({},initial)

        delete temp_values[0].key
        delete temp_initial.key

        if (JSON.stringify([temp_initial]) == JSON.stringify(formValue)) {
            console.log("dumb move")
            return
        }

        let temp_error = [] 

        formValue.forEach((form, index) => {
            form.schoolName.trim().length < 1 ? temp_error[index] = { ...temp_error[index] ,schoolName : "School name is required" }: null
            form.city.trim().length < 1 ? temp_error[index] = { ...temp_error[index] ,city : "City is required" }: null
            form.state.trim().length < 1 ? temp_error[index] = { ...temp_error[index] ,state : "State is required" }: null
            form.degree.trim().length < 1 ? temp_error[index] = { ...temp_error[index] ,degree : "Degree is required" }: null
            form.gradDate === null ? temp_error[index] = { ...temp_error[index] ,gradDate : "Graduation Date is required" }: null
        })

        setFormError([...temp_error])

        if (temp_error.length > 0){
            return;
        }

        resume = {...resume, education: formValue}
        updateResume(resume)

        router.push('/create/skills')
    }

    const changeFormValue = (index, prop, value) => {
        let temp_form = formValue

        temp_form[index][prop] = value
        setFormValue([...temp_form])
    }

    useEffect(() => {
        if (checkProp('education')) {
            setFormValue(getProp('education'))
        }
    }, [])
    
    return <>
    
        <Layout title="Education">
            <Create name="Education" progress={40} description="Where did you go to school">
                <div className="education_page">
                    <form onSubmit={handleSubmit}>

                        { 
                            formValue.map((item, index) => (

                                <div key={item.key}>
                                    {
                                        index > 0 && 
                                        <Group position="right">
                                            <ActionIcon color="red" size="md" onClick={() => removeFormItem(item.key)}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </ActionIcon>
                                        </Group>
                                    }

                                    <Grid gutter="lg" mb={25}>

                                        <Grid.Col span={12}>
                                            <TextInput
                                                
                                                label="School Name"
                                                placeholder="Middlesex University"
                                                value={formValue[index].schoolName}
                                                onChange={(e) => changeFormValue(index, 'schoolName', e.target.value)}
                                                error={formError[index]?.schoolName}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={12} md={6}>
                                            <TextInput
                                                
                                                label="State"
                                                placeholder="New York"
                                                value={formValue[index].state}
                                                onChange={(e) => changeFormValue(index, 'state', e.target.value)}
                                                error={formError[index]?.state}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={12} md={6}>
                                            <TextInput
                                                
                                                label="City"
                                                placeholder="London"
                                                value={formValue[index].city}
                                                onChange={(e) => changeFormValue(index, 'city', e.target.value)}
                                                error={formError[index]?.city}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={12} md={6}>
                                            <TextInput
                                                
                                                label="Degree"
                                                placeholder="BA Mathematics"
                                                value={formValue[index].degree}
                                                onChange={(e) => changeFormValue(index, 'degree', e.target.value)}
                                                error={formError[index]?.degree}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={12} md={6}>
                                            <DatePicker
                                                placeholder="Pick date"
                                                label="Graduation Date"
                                                
                                                value={formValue[index].gradDate === null ? '' : new Date(formValue[index].gradDate)}
                                                onChange={(value) => changeFormValue(index, 'gradDate', value)}
                                                error={formError[index]?.gradDate}
                                            />
                                        </Grid.Col>

                                    </Grid>
                                </div>
                            )) 
                        }

                        <button 
                            type="button" 
                            className="add_more_btn" 
                            onClick={() => addToForm()}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span style={{marginLeft: "10px"}}>add additional education</span>
                        </button>

                        <div className="btn_contain">
                            <button className="back_btn" type="button" onClick={() => router.push('/create/experience')}>
                                <FontAwesomeIcon icon={faAngleLeft} color="inherit" />
                                <span style={{marginLeft: '10px'}}>back</span>
                            </button>
                            <button className="main_btn" type="submit">
                                <span style={{marginRight: '10px'}}>continue</span>
                                <FontAwesomeIcon icon={faAngleRight} color="inherit" />
                            </button>
                        </div>
                    </form>
                </div>
            </Create>
        </Layout>
    
    </>
}

export default Experience