import { createDrawerNavigator } from '@react-navigation/drawer';

import Registration from './Registration';
import BottomTapNavigator from './BottomTap';

const {Navigator, Screen} = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="Registration" component={Registration} />
            <Screen name="BottomTap" component={BottomTapNavigator} />
        </Navigator>
    );
}

export default DrawerNavigator; 