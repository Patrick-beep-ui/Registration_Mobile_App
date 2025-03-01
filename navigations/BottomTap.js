import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './stack_navigators/Home';
import ProfileStack from './stack_navigators/Profile';
import { bottomScreenOptions } from '../layout/HeadingStyles';

//import RegistrationView from '../views/RegistrationView';

import Registration from './Registration';

const {Navigator, Screen} = createBottomTabNavigator();

function BottomTapNavigator() {
    return (
        <Navigator screenOptions={bottomScreenOptions}>
            <Screen name="HomeStack" component={HomeStack} options={{title: 'Home'}} />
            <Screen name="ProfileStack" component={ProfileStack} options={{title: 'Profile'}} />
        </Navigator>
    );
}

export default BottomTapNavigator;