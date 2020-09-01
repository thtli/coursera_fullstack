import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    
    renderDish(dish) {
        if (dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    renderComments(comments) {
        if (comments != null) {
            const commentsList = comments.map((comment) => {
                var d = new Date(comment.date);
                var dStr = d.toDateString();
                var dateStrArr = dStr.split(" ");
                return(
                    <li>{comment.comment}<br/>
                    -- {comment.author} , {dateStrArr[1]} {dateStrArr[2]}, {dateStrArr[3]}
                    </li>
                )
                
            });

            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled lh-2">
                        {commentsList}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    render() {

        return ( 
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.selectedDish == null? null : this.props.selectedDish.comments)}
                </div>
            </div>
        );
    }
}

export default DishDetail;