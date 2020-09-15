import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem , Button, Modal, ModalHeader, ModalBody, Label, FormGroup} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({ dish }) {
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

function RenderComments({ comments, addComment, dishId }) {
    const commentsList = comments.map((comment) => {
        return(
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
        )
    });

    return (
        <div>
            <h4>Comments</h4>
            <ul className="list-unstyled lh-2">
                {commentsList}
            </ul>
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
    )
    
}

const minLength = (len) => (val) => val && val.length && val.length >= len;
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleComment(values) {
        this.toggleModal();
        // the new comment is added to list of comments 
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);    
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label> 
                                <Control.select model=".rating" name="rating"
                                    className="form-control"
                                    defaultValue="1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>        
                                </Control.select>                                 
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor=".author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15),
                                    }}>                   
                                </Control.text>
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less',
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea 
                                    model=".comment"
                                    id="comment"
                                    name="comment"
                                    rows="6"
                                    className="form-control"
                                />
                            </FormGroup>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );        
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return ( 
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }

}


export default DishDetail;