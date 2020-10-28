import React, { Component } from 'react';
import { View, Platform, SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { DrawerActions, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
});


const headerOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"            
    }
};

const StackNavigatorIcon = ({ navigation }) => {
    return(
        <Icon
            iconStyle={{padding: 15}}
            name='menu'
            size={24}
            color='white'
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
    );
}

const DrawerNavigatorIcon = ({ name, size }) => {
    return(
        <Icon
            name={name}
            type='font-awesome'
            size={size ? size : 24}
        />
    );
}

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./images/logo.png')}
                    style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </SafeAreaView>
    </DrawerContentScrollView>
)


const HomeNavigator = createStackNavigator();
const AboutNavigator = createStackNavigator();
const MenuNavigator = createStackNavigator()
const ContactNavigator = createStackNavigator();
const ReservationNavigator = createStackNavigator();
const FavoritesNavigator = createStackNavigator();
const LoginNavigator = createStackNavigator(); 

const MainNavigator = createDrawerNavigator();


function HomeNavigatorScreen({ navigation }) {
    return(
        <HomeNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={headerOptions}
        >
            <HomeNavigator.Screen 
                name='Home'
                component={Home}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </HomeNavigator.Navigator>
    );
} 

function AboutNavigatorScreen({ navigation }) {
    return(
        <AboutNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={headerOptions}
        >
            <AboutNavigator.Screen
                name='About Us'
                component={About}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </AboutNavigator.Navigator>
    );
}

function MenuNavigatorScreen({ navigation }) {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={headerOptions}
        >
            <MenuNavigator.Screen
                name='Menu'
                component={Menu}
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
            <MenuNavigator.Screen
                name='Dishdetail'
                component={Dishdetail}
                options={{ headerTitle: 'Dish Detail'}}
            />            
        </MenuNavigator.Navigator>
    );
}


function ContactNavigatorScreen({ navigation }) {
    return(
        <ContactNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={headerOptions}
        >
            <ContactNavigator.Screen
                name='Contact Us'
                component={Contact} 
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </ContactNavigator.Navigator>
    );
}

function ReservationNavigatorScreen({ navigation }) {
    return(
        <ReservationNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={headerOptions}
        >
            <ReservationNavigator.Screen
                name='Reserve Table'
                component={Reservation} 
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </ReservationNavigator.Navigator>
    );
}

function FavoritesNavigatorScreen({ navigation }) {
    return(
        <FavoritesNavigator.Navigator
            screenOptions={headerOptions}
        >
            <FavoritesNavigator.Screen
                name='My Favorites'
                component={Favorites} 
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
            <FavoritesNavigator.Screen
                name='Dishdetail'
                component={Dishdetail}
                options={{ headerTitle: 'Dish Detail'}}
            /> 
        </FavoritesNavigator.Navigator>
    );
}

function LoginNavigatorScreen({ navigation }) {
    return(
        <LoginNavigator.Navigator
            screenOptions={headerOptions}
        >
            <FavoritesNavigator.Screen
                name='Login'
                component={Login} 
                options={{
                    headerLeft: () => <StackNavigatorIcon navigation={navigation} />
                }}
            />
        </LoginNavigator.Navigator>
    );
}


function MainNavigatorDrawer(){
    return(
        <MainNavigator.Navigator
            initialRouteName='Home'
            drawerStyle={{
                backgroundColor: '#D1C4E9'
            }}
            drawerContent={props => <CustomDrawerContentComponent {...props} />}
        >
            <MainNavigator.Screen 
                name='Login'
                component={LoginNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='sign-in' />
                }}
            />
            <MainNavigator.Screen 
                name='Home'
                component={HomeNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='home' />
                }}
            />
            <MainNavigator.Screen 
                name='About Us'
                component={AboutNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='info' />
                }}
            />
            <MainNavigator.Screen 
                name='Menu'
                component={MenuNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='list' />
                }}
            />
            <MainNavigator.Screen 
                name='Contact Us'
                component={ContactNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='address-card' size={22} />
                }}
            />
            <MainNavigator.Screen 
                name='My Favorites'
                component={FavoritesNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='heart' size={24} />
                }}
            />
            <MainNavigator.Screen 
                name='Reserve Table'
                component={ReservationNavigatorScreen}
                options={{
                    drawerIcon: () => <DrawerNavigatorIcon name='cutlery' size={24} />
                }}
            />
        </MainNavigator.Navigator>
    );
}


class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <NavigationContainer>
                    <MainNavigatorDrawer />
                </NavigationContainer>            
            </View>

        );
    }
}
  

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);