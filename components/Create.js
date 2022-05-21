
import { Grid, RingProgress, Text } from "@mantine/core"

const Create = ({children, progress, name, description}) => {

    return <>
    
            <div className="create_comp">
                <div className="forms_body">
                    <Grid gutter="none" style={{height: "100%"}}>

                        <Grid.Col span={12} md={8}>
                            <div className="form_container">
                                <p className="page_name">{name}</p>
                                <p className="page_desc">{description}</p>
                                {children}
                            </div>
                        </Grid.Col>

                        <Grid.Col span={12} md={4}>
                            <div className="progess_container">
                                <p className="header">My Progress</p>
                                <RingProgress
                                    size={150}
                                    sections={[{ value: progress, color: 'dodgerblue' }]}
                                    label={
                                    <Text color="dodgerblue" weight={700} align="center" size="xl">
                                        {progress}%
                                    </Text>
                                    }
                                    my={30}
                                />
                                <p className="page_name">{name}</p>
                                <p className="get_more">Complete and get <span>+20%</span></p>
                            </div>
                        </Grid.Col>

                    </Grid>
                </div>
            </div>

    </>
}

export default Create