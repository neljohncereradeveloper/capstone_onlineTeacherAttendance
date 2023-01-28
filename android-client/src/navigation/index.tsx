/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../../types';
import LinkingConfiguration from './LinkingConfiguration';
import HomeScreen from '../screens/HomeScreen';
import RoomScannerScreen from '../screens/RoomScanner';
import ActivityLogScreen from '../screens/ActivityLogScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAppSelector } from '../redux/store';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const _isOpen = useAppSelector((state) => state.menu.isOpen);
  const [open, setOpen] = React.useState(true);

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#2699FB' },
        headerTitleStyle: { fontSize: 16, color: 'white' },
        tabBarLabelStyle: { fontSize: 10, marginBottom: 5 },
        tabBarStyle: { height: 65 },
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // headerRight: () => (
          //   <>
          //     <Pressable
          //       onPress={() => setOpen((prev) => !prev)}
          //       style={({ pressed }) => ({
          //         opacity: pressed ? 0.5 : 1,
          //       })}
          //     >
          //       <FontAwesome
          //         name="bars"
          //         size={25}
          //         color="white"
          //         style={{ marginRight: 15, marginTop: 10, width: 6 }}
          //       />
          //     </Pressable>

          //     <Pressable
          //       onPress={() => console.log('home icon click')}
          //       style={{
          //         width: 120,
          //         padding: 5,
          //         position: 'absolute',
          //         right: 10,
          //         bottom: -37,
          //         borderWidth: 1,
          //         borderColor: 'gray',
          //         borderRadius: 5,
          //         display: 'flex',
          //         alignItems: 'center',
          //         justifyContent: 'center',
          //         flexDirection: 'row',
          //         zIndex: 1,
          //       }}
          //     >
          //       <FontAwesome
          //         name="sign-out"
          //         size={20}
          //         color="gray"
          //         style={{ marginTop: 1 }}
          //       />
          //       <Text style={{ marginLeft: 5, fontSize: 12 }}>Logout</Text>
          //     </Pressable>
          //   </>
          // ),
        })}
      />
      <BottomTab.Screen
        name="RoomScanner"
        component={RoomScannerScreen}
        options={{
          title: 'Scanner',
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ActivityLog"
        component={ActivityLogScreen}
        options={{
          title: 'Log',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -5 }} {...props} />;
}
