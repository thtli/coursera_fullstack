import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

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
                <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite.') : props.onPress()}
                />
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
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
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
            favorites: []
        };
    }

    // static navigationOptions = {
    //     title: 'Dish Details'
    // };

    markFavorite(dishId) {
        this.setState({
            favorites: this.state.favorites.concat(dishId)
        })
    }

    render() {
        const { dishId } = this.props.route.params;
        
        // + turns dishId string into a number to act as index
        // .some() return true if some item in array matches function
        // favorite will be true if it already exists in array
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                /> 
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />      
            </ScrollView>
            
        );       
    }

}

export default connect(mapStateToProps)(Dishdetail);