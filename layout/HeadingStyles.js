import Icon from 'react-native-vector-icons/FontAwesome'; 

export const bottomScreenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === 'HomeStack') {
      iconName = 'home';
    } else if (route.name === 'ProfileStack') {
      iconName = 'user';
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: '#6200ea',
  tabBarInactiveTintColor: 'gray',
  headerTitleAlign: 'center',
});
