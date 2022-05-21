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

    const [warnModal, setWarnModal] = useState()

    const initial = {
        jobTitle: '',
        employer: '',
        city: '',
        country: '',
        startDate: null,
        endDate: null,
        currentWork: false,
        key: randomId()
    }

    const [formValue, setFormValue] = useState([initial])
    const [formError, setFormError] = useState([])

    const addToForm = () => {
        let newFields = {
            jobTitle: '',
            employer: '',
            city: '',
            country: '',
            startDate: null,
            endDate: null,
            currentWork: false,
            key: randomId()
        }

        setFormValue([...formValue, newFields])
    }

    const removeFormItem = (key) => {
        setFormValue(temp_form => temp_form.filter(item => item.key !== key))
    }

    const compareDates = (startDate, endDate) => {
        let d1 = new Date(startDate)
        let d2 = new Date(endDate)

        return d1.getTime() > d2.getTime()
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
            form.jobTitle.trim().length < 1 ? temp_error[index] = { ...temp_error[index] ,jobTitle : "Job Title is required" }: null
            form.employer.trim().length < 1 ? temp_error[index] = { ...temp_error[index] ,employer : "Employer is required" }: null
            form.city.trim().length < 1 ? temp_error[index] = { ...temp_error[index] ,city : "City is required" }: null
            form.country.trim().length < 1 ? temp_error[index] = { ...temp_error[index] ,country : "Country is required" }: null
            form.startDate === null ? temp_error[index] = { ...temp_error[index] ,startDate : "Start Date is required" }: null
            form.currentWork === false && compareDates(form.startDate, form.endDate) ? temp_error[index] = { ...temp_error[index] ,endDate : "End date can't be earlier" }: null
            form.endDate === null && form.currentWork === false ? temp_error[index] = { ...temp_error[index] ,endDate : "End date is required if you no longer work here" }: null
        })

        setFormError([...temp_error])

        if (temp_error.length > 0){
            return
        }

        resume = {...resume, experience: formValue}
        updateResume(resume)

        router.push('/create/education')
    }

    const changeFormValue = (index, prop, value) => {
        let temp_form = formValue

        temp_form[index][prop] = value
        setFormValue([...temp_form])
    }

    const [countries, setCountries] = useState([])

    useEffect(() => {
        fetch('https://restcountries.com/v2/all')
        .then(res => res.json())
        .then(data => setCountries(data.map(country => country.name)))
        .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (checkProp('experience')) {
            setFormValue(getProp('experience'))
        }
    }, [])
    
    return <>
    
        <Layout title="Experience">
            <Create name="Experience" progress={20} description="Start with your most recent work experience">
                <div className="experience_page">
                    <form onSubmit={handleSubmit} onChange={() => setFormError({})}>

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

                                        <Grid.Col span={12} md={6}>
                                            <TextInput
                                                label="Job Title"
                                                placeholder="Software Engineer"
                                                value={formValue[index].jobTitle}
                                                onChange={(e) => changeFormValue(index, 'jobTitle', e.target.value)}
                                                error={formError[index]?.jobTitle}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={12} md={6}>
                                            <TextInput
                                                label="Employer"
                                                placeholder="Microsoft"
                                                value={formValue[index].employer}
                                                onChange={(e) => changeFormValue(index, 'employer', e.target.value)}
                                                error={formError[index]?.employer}
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
                                            <Select
                                                label="Country"
                                                placeholder="Nigeria"
                                                searchable
                                                nothingFound="No options"
                                                data={countries}
                                                value={formValue[index].country}
                                                onChange={(value) => changeFormValue(index, 'country', value)}
                                                error={formError[index]?.country}
                                            />
                                        </Grid.Col>

                                        <Grid.Col span={12} md={6}>
                                            <DatePicker
                                                placeholder="Pick date"
                                                label="Start date"
                                                value={formValue[index].startDate === null ? '' : new Date(formValue[index].startDate)}
                                                onChange={(value) => changeFormValue(index, 'startDate', value)}
                                                error={formError[index]?.startDate}
                                            />
                                        </Grid.Col>

                                        {
                                            !formValue[index].currentWork &&
                                            <Grid.Col span={12} md={6}>
                                                <DatePicker
                                                    placeholder="Pick date"
                                                    label="End date"
                                                    value={formValue[index].endDate === null ? '' : new Date(formValue[index].endDate)}
                                                    onChange={(value) => changeFormValue(index, 'endDate', value)}
                                                    error={formError[index]?.endDate}
                                                />
                                            </Grid.Col>
                                        }

                                        <Grid.Col span={12}>
                                            <Checkbox
                                                label="I currently work here"
                                                checked={formValue[index].currentWork}
                                                onChange={(e) => changeFormValue(index, 'currentWork', e.currentTarget.checked)}
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
                            <span style={{marginLeft: "10px"}}>add additional experience</span>
                        </button>

                        <div className="btn_contain">
                            <button className="back_btn" type="button" onClick={() => router.push('/create/personal')}>
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