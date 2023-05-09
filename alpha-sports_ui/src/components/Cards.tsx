import { Card, Icon, Image, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import './Cards.css';

const assets = require('../assets/assets.js')

const Cards = (props: {title: string, image: string, route: string, text: string, disabled: boolean}) => {
    const navigate = useNavigate();

    const loadAnalytics = () => {
        navigate(props.route);
    }

    return (
        <Card style={{marginTop: '2.5em', background: 'white'}}>
           <Image src={assets[props.image]} wrapped ui={true} className="card-image" />
            <Card.Content>
            <Card.Header>{props.title}</Card.Header>
            {/* <Card.Meta>Joined in 2016</Card.Meta> */}
            <Card.Description>
                {props.text}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
                <Button onClick={loadAnalytics} primary size='large' disabled={props.disabled}>
                    Try it out
                    <Icon name='arrow right' />
                </Button>
            </a>
            </Card.Content>
        </Card>
    )
}

export default Cards