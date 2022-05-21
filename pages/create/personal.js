import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Grid, Select, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { z } from "zod"
import Create from "../../components/Create"
import Layout from "../../components/Layout"
import { checkProp, getProp, getResume, updateResume } from "../../lib/createHandler"

const Personal = () => {

    const router = useRouter()

    const initial = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        city: '',
        state: '',
    };

    const resume = getResume()

    const schema = z.object({
        firstName: z.string().min(2, { message: 'First name should have at least 2 letters' }),
        lastName: z.string().min(2, { message: 'Last name should have at least 2 letters' }),
        email: z.string().email({ message: 'Invalid email' }),
        phone: z.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, {message: 'Invalid Phone'}),
        address: z.string().min(2, {message: 'Address is expected to have at least 2 letters'}),
        country: z.string().min(1, {message: 'Field is required'}),
        city: z.string().min(1, {message: 'Field is required'}),
        state: z.string().min(1, {message: 'Field is required'})
    })

    // const countriesFromApi = useRef([])
    const [countries, setCountries] = useState([])

    useEffect(() => {
        fetch('https://restcountries.com/v2/all')
        .then(res => res.json())
        .then(data => setCountries(data.map(country => country.name)))
        .catch(err => console.log(err))

        if (checkProp('personal')) {
            form.setValues(getProp('personal'))
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: initial,
    })

    const handleSubmit = (personal) => {
        
        resume = {...resume, personal}
        updateResume(resume)

        router.push('/create/experience')
        
    }

    return <>
    
        <Layout title="Personal Information">
            <Create progress={0} name="Personal Information" description="The best way for employers to contact you" >
                <div className="personal_page">
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                        <Grid gutter="lg">

                            {/* first name grid */}
                            <Grid.Col span={12} md={6}>
                                <TextInput
                                    required
                                    label="First name"
                                    placeholder="John"
                                    { ...form.getInputProps('firstName') }
                                />
                            </Grid.Col>

                            {/* last name grid */}
                            <Grid.Col span={12} md={6}>
                                <TextInput
                                    required
                                    label="Last name"
                                    placeholder="Doe"
                                    { ...form.getInputProps('lastName') }
                                />
                            </Grid.Col>

                            {/* email grid */}
                            <Grid.Col span={12} md={6}>
                                <TextInput
                                    required
                                    label="Email"
                                    placeholder="johndoe@gmail.com"
                                    { ...form.getInputProps('email') }
                                />
                            </Grid.Col>

                            {/* phone grid */}
                            <Grid.Col span={12} md={6}>
                                <TextInput
                                    required
                                    label="Phone"
                                    placeholder="+234 7047482101"
                                    { ...form.getInputProps('phone') }
                                />
                            </Grid.Col>

                            {/* address grid */}
                            <Grid.Col span={12} md={6}>
                                <TextInput
                                    required
                                    label="Address"
                                    placeholder="City view estate"
                                    { ...form.getInputProps('address') }
                                />
                            </Grid.Col>

                            {/* country grid */}
                            <Grid.Col span={12} md={6}>
                                <Select
                                    required
                                    label="Country"
                                    placeholder="Nigeria"
                                    searchable
                                    nothingFound="No options"
                                    data={countries}
                                    { ...form.getInputProps('country') }
                                />
                            </Grid.Col>

                            {/* city grid */}
                            <Grid.Col span={12} md={6}>
                                <TextInput
                                    required
                                    label="City"
                                    placeholder="PH"
                                    { ...form.getInputProps('city') }
                                />
                            </Grid.Col>

                            {/* state grid */}
                            <Grid.Col span={12} md={6}>
                                <TextInput
                                    required
                                    label="State"
                                    placeholder="Rivers"
                                    { ...form.getInputProps('state') }
                                />
                            </Grid.Col>

                        </Grid>

                        <div className="btn_contain">
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

export default Personal