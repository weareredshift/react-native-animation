import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Dimensions } from 'react-native';
import Home from './screens/Home';
import { SafeAreaView, Text, View } from 'react-native';
import { Font } from 'expo';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import SpringExample from './screens/SpringExample';
import ElasticBall from './screens/ElasticBall';
import ListItems from './screens/ListItems';
import Header from './components/Header';

const routes = {
  ListItems: {
    screen: ListItems,
    navigationOptions: () => ({
      title: 'Sortable List UI'
    })
  },
  SpringExample: {
    screen: SpringExample,
    navigationOptions: () => ({
      title: 'Stagger / Spring example'
    })
  },
  ElasticBall: {
    screen: ElasticBall,
    navigationOptions: () => ({
      title: 'Elastic ball / Event example'
    })
  }
};

const Router = createDrawerNavigator(routes, {
    initialRouteName: 'ListItems',
    headerMode: 'none'
  }
);

class App extends Component {
  constructor(props) {
    super(props);

    this.windowWidth = Dimensions.get('window').width;

    this.routes = [
      // Block3d,
      ListItems,
      Home,
      SpringExample,
      ElasticBall
    ];

    this.state = {
      loading: true,
      navigation: null
    };
  }


  async componentDidMount() {
    await Font.loadAsync({
      FontAwesome: require('./assets/fonts/fontawesome-webfont.ttf')
    });

    this.setState({ loading: false });
  }

  render () {
    const { loading, navigation } = this.state;

    return (
      loading
        ? <View style={ {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        } }><Text>Loading...</Text>
        </View>
        : <SafeAreaView style={ { flex: 1, backgroundColor: '#FFFFFF' } }>
          <Header navigation={ navigation } />
          <Router
            ref={ navRef => (navRef && !navigation) && this.setState({ navigation: navRef._navigation }) }
            routes={ routes }
          />
        </SafeAreaView>
    );
  }
}

export default App;
