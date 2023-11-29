import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dishdetail from './DishdetailComponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        };
    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }



    renderDish(dish) {
        if (dish !== null)
            return (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="col-6  m-1">
                        <Dishdetail props={dish} />
                    </div>
                    <div className="col-6 m-1">

                        <CardBody>
                            <h2>Comments</h2>
                            <table>
                                {
                                    dish.comments.map((comment) => {
                                        return (<tr>
                                            <td>
                                                <p>{comment.comment}</p>
                                                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>

                                            </td>

                                        </tr>)
                                    })
                                }
                            </table>

                        </CardBody>
                    </div>
                </div>
            );
        else
            return (
                <div> </div >
            );
    }
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id}
                        onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className='row'>
                    {menu}
                </div>
                <div className="row">
                    <div className="col-12 col-md-10 m-1">
                        {this.renderDish(this.state.selectedDish)}

                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;