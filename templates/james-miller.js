import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

const JamesMiller = ({ resume }) => {

    Font.register({ family: 'Inter', fonts: [
        { src: "https://fonts.gstatic.com/s/titilliumweb/v15/NaPecZTIAOhVxoMyOr9n_E7fRMTsDIRSfr0.ttf" },
        { src: "https://fonts.gstatic.com/s/titilliumweb/v15/NaPDcZTIAOhVxoMyOr9n_E7ffGjEKIx5YrSYqWM.ttf", fontWeight: 300},
        { src: "https://fonts.gstatic.com/s/titilliumweb/v15/NaPDcZTIAOhVxoMyOr9n_E7ffHjDKIx5YrSYqWM.ttf", fontWeight: 700 },
        { src: "https://fonts.gstatic.com/s/titilliumweb/v15/NaPDcZTIAOhVxoMyOr9n_E7ffEDBKIx5YrSYqWM.ttf", fontWeight: 900 },
    ]});

    const formatDate = (date) => {
        let d = new Date(date)
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const day = d.getDate()
        const year = d.getFullYear()

        return `${month[d.getMonth()]} ${day}, ${year}`
    }

    const styles = StyleSheet.create({
        page: {
            backgroundColor: "white",
            fontFamily: "Inter",
            fontSize: "15px",
            padding: "60px",
            paddingBottom: 45,
            margin: 0
        },
        header: {
            display: "flex",
            flexDirection: "row",
            marginBottom: "50px"
        },
        nameView:{
            width: "60%",
            alignSelf: "center",
            marginRight: "5%",
        },
        detailsView: {
            width: "35%",
        },
        name: {
            fontSize: "45px",
            fontFamily: "Inter",
            fontWeight: 700
        },
        detailsub: {
            fontSize: "17px",
            marginBottom: "10px"
        },
        detailmain: {
            fontSize: "17px",
            fontWeight: 700,
            marginBottom: "10px",
        },
        body: {
            display: "flex",
            flexDirection: "row"
        },
        fullHalf: {
            width: "60%",
            alignSelf: "center",
            marginRight: "5%",
        },
        smallHalf: {
            width: "35%",
        },
        section: {
            marginBottom: "15px",
        },
        sectionHeader: {
            textTransform: "uppercase",
            color: "#228be6",
            marginBottom: "10px",
            fontSize: "17px",
            fontWeight: 700
        },
        sectionValueText: {
            marginBottom: "7px",
        },
        layout: {
            row:{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: "5px",
            },
            bullet:{
                height: '100%',
            }
        }
    })

    const ListItem = ({ children }) => {
        return (
            <View style={styles.layout.row}>
                <View style={styles.layout.bullet}>
                    <Text>{'\u2022' + " "}</Text>
                </View>
                <Text>{children}</Text>
            </View>
        )
    }

    return <>
        <Document>
            <Page size="A3" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.nameView}>
                        <Text style={styles.name}>{resume.personal.firstName} {resume.personal.lastName}</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={styles.detailsub}>{resume.personal.address} {resume.personal.city}, {resume.personal.state} {resume.personal.country}</Text>
                        <Text style={styles.detailmain}>{resume.personal.phone}</Text>
                        <Text style={styles.detailmain}>{resume.personal.email}</Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <View style={styles.fullHalf}>

                        {/* EXPERIENCE */}
                        {
                            resume?.experience !== null &&
                            <>
                                <View style={styles.section}>
                                    <Text style={styles.sectionHeader}>Experience</Text>

                                    {
                                        resume.experience.map(({ jobTitle, employer, city, country, startDate, endDate, currentWork, duties }, index) => (
                                            <View style={{ marginBottom: "20px" }} key={index}>
                                                <Text style={styles.sectionValueText}>
                                                    <Text style={{ fontWeight: 700 }}>{employer}</Text>,
                                                    &nbsp;
                                                    <Text style={styles.sectionValueText}>{city}, {country}</Text>
                                                    &nbsp;&#8212;&nbsp;
                                                    <Text style={styles.sectionValueText}>{jobTitle}</Text>
                                                </Text>
                                                <Text style={styles.sectionValueText}>{ formatDate(startDate) } - { (endDate !== null && !currentWork) ? formatDate(endDate) : "Current" }</Text>
                                                <Text style={styles.sectionValueText}>
                                                    {duties}
                                                </Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </>
                        }

                        {/* EDUCATION */}
                        {
                            resume.education !== null &&
                            <>
                                <View style={styles.section}>
                                    <Text style={styles.sectionHeader}>Education</Text>

                                    {
                                        resume.education.map(({ schoolName, degree, startDate, gradDate, city, state }, index) => (
                                            <View style={{marginBottom: "20px"}} key={index}>
                                                <Text style={styles.sectionValueText}>
                                                    <Text style={{fontWeight: 700}}>{schoolName}</Text>,
                                                    &nbsp;
                                                    <Text style={styles.sectionValueText}>{city}, {state}</Text>
                                                    &nbsp;&#8212;&nbsp;
                                                    <Text style={styles.sectionValueText}>{degree}</Text>
                                                </Text>
                                                <Text style={styles.sectionValueText}>{formatDate(startDate)} - { formatDate(gradDate) }</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </>
                        
                        }
                        
                    </View>
                    <View style={styles.smallHalf}>

                        {/* SUMMARY */}
                        {
                            resume?.summary !== null &&
                            <View style={styles.section}>
    
                                <View style={styles.sectionName}>
                                    <Text style={styles.sectionHeader}>Professional Summary</Text>
                                </View>
    
                                <Text style={styles.sectionValueText}>
                                    {resume.summary}
                                </Text>
    
                            </View>
                        }
                        
                        {/* SKILLS */}
                        {
                            resume?.skills !== null &&
                            <View style={styles.section}>
    
                                <View style={styles.sectionName}>
                                    <Text style={styles.sectionHeader}>Skills</Text>
                                </View>
    
                                <View style={{marginBottom: "20px"}}>
                                    <View>
                                        {
                                            resume.skills.map(({ skillName }, index) => (
                                                <ListItem key={index}>{skillName}</ListItem>
                                            ))
                                        }
                                    </View>
                                </View>
    
                            </View>
                        }

                    </View>
                </View>
            </Page>
        </Document>
    </>
}

export default JamesMiller