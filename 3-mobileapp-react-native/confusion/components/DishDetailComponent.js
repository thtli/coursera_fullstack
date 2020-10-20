import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment, postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});


function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return(
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl + dish.image }}
            >  
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Icon
                        raised
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite.') : props.onPress()}
                    />
                    <Icon
                        raised
                        reverse
                        name={'pencil'}
                        type='font-awesome'
                        color='#512DA8'
                        onPress={() => props.showCommentModal()}
                    />
                </View>  
            </Card>
        );
    } else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        var dateStrArr = (new Date(item.date)).toDateString().split(" ");
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text> 
                <Text style={{fontSize: 12}}><Rating imageSize={14} readonly startingValue={item.rating} /></Text>
                <Text style={{fontSize: 12}}>{'--' + item.author + ', ' + dateStrArr[1] + ' ' + dateStrArr[2] + ' ' + dateStrArr[3] }</Text>
            </View>
        );
    }

    return(
        <Card title='Comments'>
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            author: '',
            comment: '',
            rating: 5,
            showModal: false 
        };
    }

    // static navigationOptions = {
    //     title: 'Dish Details'
    // };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleComment(dishId) {
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
        this.resetForm();
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            rating: 5
        });
    }

    render() {
        const { dishId } = this.props.route.params;
        
        // + turns dishId string into a number to act as index
        // .some() return true if some item in array matches function
        // favorite will be true if it already exists in array
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    showCommentModal={() => this.toggleModal()}
                /> 
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />      
                
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalItem}>
                            <Rating 
                                showRating
                                startingValue={5}
                                onFinishRating={ rating => this.setState({rating: rating}) }
                            />    
                        </View>
                        <View style={styles.modalItem}>
                            <Input 
                                placeholder='Author'
                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                onChangeText={text => this.setState({ author: text })}
                            />
                            <Input 
                                placeholder='Comment'
                                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                onChangeText={text => this.setState({ comment: text })}
                            />    
                        </View>
                        
                        <View style={styles.modalItem}>
                            <Button
                                title='Submit'
                                color='#512DA8'
                                onPress={() => {this.handleComment(dishId)}}
                            />    
                        </View>
                        <View style={styles.modalItem}>
                            <Button 
                                title='Cancel'
                                color='#a9a9a9'
                                onPress={() => this.toggleModal()}
                            />    
                        </View>
                        
                    </View>
                </Modal>
            </ScrollView>
            
        );       
    }

}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalItem: {
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);