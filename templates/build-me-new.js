import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

const BuildMeNew = ({ resume }) => {

    Font.register({
        family: 'Oswald',
        src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
    });

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
            paddingBottom: 65,
            fontFamily: "Oswald",
            fontSize: "15px",
            borderTop: "10px solid #34a1ec",
            borderBottom: "5px solid #34a1ec",
            margin: 0
        },
        header: {
            backgroundColor: "#34a1ec",
            padding: "30px",
            fontSize: "40px",
            textAlign: "center",
            textOverflow: "ellipsis",
            color: "white",
            textTransform: "uppercase"
        },
        info: {
            transform: "translateY(30px)",
            padding: "30px"
        },
        section: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        sectionName: {
            width: "20%"
        },
        sectionNameText: {
            color: "#34a1ec",
        },
        sectionValue: {
            width: "75%"
        },
        sectionValueText : {
            marginBottom: "5px"
        },
        divider: {
            marginTop: "40px",
            marginBottom: "15px",
            borderBottom: "3px solid #34a1ec"
        },
        layout: {
            row:{
                display: 'flex',
                flexDirection: 'row',
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

    return (
        <Document>
        <Page size="A4" style={styles.page}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text>{resume.personal.firstName} {resume.personal.lastname}</Text>
            </View>
            {/* HEADER END */}

            <View style={styles.info}>

                {
                    resume?.summary && 
                    <>
                        {/* PROFESSIONAL SUMMARY */}
                        <View style={styles.section}>

                            <View style={styles.sectionName}>
                                <Text style={styles.sectionNameText}>Professional Summary</Text>
                            </View>

                            <View style={styles.sectionValue}>
                                <Text style={styles.sectionValueText}> 
                                    {resume.summary}
                                </Text>
                            </View>

                        </View>
                        
                        <View style={styles.divider}></View>
                        {/* PROFESSIONAL SUMMARY END */}
                    </>
                }

                {/* CONTACT */}
                <View style={styles.section}>

                    <View style={styles.sectionName}>
                        <Text style={styles.sectionNameText}>Contact</Text>
                    </View>

                    <View style={styles.sectionValue}>
                        <Text style={styles.sectionValueText}>{resume.personal.phone}</Text>
                        <Text style={styles.sectionValueText}>{resume.personal.email}</Text>
                        <Text style={styles.sectionValueText}>{resume.personal.address}</Text>
                        <Text style={styles.sectionValueText}>{resume.personal.city}, {resume.personal.state} {resume.personal.country}</Text>
                    </View>

                </View>
                {/* CONTACT END */}

                <View style={styles.divider}></View>

                {/* EXPERIENCE */}
                {
                    resume?.experience &&
                    <>
                    <View style={styles.section}>
    
                        <View style={styles.sectionName}>
                            <Text style={styles.sectionNameText}>Experience</Text>
                        </View>
    
                        <View style={styles.sectionValue}>
                            {
                                resume.experience.map(({ jobTitle, employer, city, country, startDate, endDate, currentWork }, index) => (
                                    <View style={{marginBottom: "20px"}} key={index}>
                                        <Text style={styles.sectionValueText}>
                                            <p style={{textTransform: "uppercase"}}>{jobTitle}</p>,
                                            &nbsp;
                                            <p>{ formatDate(startDate) } - { (endDate !== null && !currentWork) ? formatDate(endDate) : "Current" }</p>
                                        </Text>
                                        <Text style={styles.sectionValueText}>{ employer }</Text>
                                        <Text style={styles.sectionValueText}>{ city }, { country }</Text>
                                    </View>
                                ))
                            }
                        </View>
    
                    </View>

                    <View style={styles.divider}></View>
                    </>
                }
                {/* EXPERIENCE END */}

                {
                    resume?.education &&
                    <>
                        {/* EDUCATION */}
                        <View style={styles.section}>

                            <View style={styles.sectionName}>
                                <Text style={styles.sectionNameText}>Education</Text>
                            </View>

                            <View style={styles.sectionValue}>

                            {
                                resume.education.map(({ schoolName, degree, startDate, gradDate, city, state }, index) => (
                                    <View style={{ marginBottom: "20px" }}  key={index}>
                                        <Text style={styles.sectionValueText}>
                                            <p>{degree}</p>,
                                            &nbsp;
                                            <p>{formatDate(startDate)} - { formatDate(gradDate) }</p>
                                        </Text>
                                        <Text style={styles.sectionValueText}>{schoolName}</Text>
                                        <Text style={styles.sectionValueText}>{city}, {state}</Text>
                                    </View>
                                ))
                            }
                            
                            </View>
                            

                        </View>

                        <View style={styles.divider}></View>
                        {/* EDUCATION END */}
                    </>
                }
                

                {
                    resume?.skills &&
                    <>
                        {/* SKILLS */}
                            <View style={styles.section}>

                                <View style={styles.sectionName}>
                                    <Text style={styles.sectionNameText}>Skills</Text>
                                </View>

                                <View style={styles.sectionValue}>
                                    <View style={{marginBottom: "20px"}}>
                                        <View>
                                            {
                                                resume.skills.map(({skillName}, index) => (
                                                    <ListItem key={index}>{skillName}</ListItem>
                                                ))
                                            }
                                        </View>
                                    </View>
                                </View>

                            </View>
                        {/* SKILLS END */}
                    </>
                }
                

            </View>
        </Page>
    </Document>
    )
}

export default BuildMeNew