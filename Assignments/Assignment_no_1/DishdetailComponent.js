import React from 'react'
import { Card, CardBody, CardImg, CardText } from 'reactstrap'

function Dishdetail({ props }) {
    console.log(props)
    return (
        <div>

            <Card >
                <CardImg top src={props.image} alt={props.name} />
                <CardBody>
                    <h4>{props.name}</h4>
                    <CardText>{props.description}</CardText>
                </CardBody>

            </Card>
        </div>
    )
}




export default Dishdetail

