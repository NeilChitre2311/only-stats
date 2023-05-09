import { useNavigate } from 'react-router-dom'
import { Container, Header, Grid, Segment, Divider } from 'semantic-ui-react'

const ComingSoon = () => {
    return (
        <Container style={{marginBottom:'10%'}}>
            {/* <Header as='h1'
                    content='Alpha-Sports'
                    inverted
                    style={{
                        fontSize: '4em',
                        fontWeight: 'bold',
                        marginTop: '10%',
                        color:'black'
                    }}
            /> */}
            <Header as='h1'
                    content='Coming Soon!!!'
                    inverted
                    style={{
                        fontSize: '3em',
                        fontWeight: 'bold',
                        marginTop: '20%',
                        color:'black'
                    }}
            />
            <Header as='h3'
                inverted
                style={{
                    fontSize: '1em',
                    align:'center',
                    justify:'center',
                    marginTop: '10%',
                    color:'black',
                    marginBottom:'10%'
                }}
            >
                We are working hard to launch this tool.
                Please check back in few days.<br/>
                Sorry to disappoint you know.
                But,we promise! we'll be back with a banger of a tool for you to use.
            </Header>
        </Container>
    )
}
export default ComingSoon