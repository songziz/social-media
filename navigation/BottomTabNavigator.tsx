import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import FeedScreen from '../screens/FeedScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { BottomTabParamList, FeedTabParamList, FriendsTabParamList, ProfileTabParamList, LandingTabParamList } from '../types';
import LandingScreen from '../screens/LandingScreen';

import { firebase, auth } from "../firebase";
import { useState } from 'react';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const sample_uid = 'sampleuid';

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const [userState, setUserState] = useState<boolean>(!!auth.currentUser);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUserState(true);
    } else {
      setUserState(false);
    }
  });

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      {auth.currentUser ? (
        <>
          <BottomTab.Screen
            name="Feed"
            component={FeedTabNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="ios-paper" color={color} />,
            }}
          />
          <BottomTab.Screen
            name="Friends"
            component={FriendsTabNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="ios-people" color={color} />,
            }}
          />
          <BottomTab.Screen
            name="Profile"
            component={ProfileTabNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
            }}
          />
        </>
      ) : (
        <>
          <BottomTab.Screen
            name="Account"
            component={LandingTabNavigator}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="ios-color-wand" color={color} />,
            }}
          />
        </>
      )
      }
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const FeedTabStack = createStackNavigator<FeedTabParamList>();

function FeedTabNavigator() {
  return (
    <FeedTabStack.Navigator>
      <FeedTabStack.Screen
        name="FeedTabScreen"
        options={{ headerTitle: 'Feed' }}
      >
        {() => FeedScreen({uid: sample_uid})}
      </FeedTabStack.Screen>
    </FeedTabStack.Navigator>
  );
}

const FriendsTabStack = createStackNavigator<FriendsTabParamList>();

function FriendsTabNavigator() {
  return (
    <FriendsTabStack.Navigator>
      <FriendsTabStack.Screen
        name="FriendsTabScreen"
        options={{ headerTitle: 'Friends' }}
      >
        {() => FriendsScreen({uid: sample_uid})}
      </FriendsTabStack.Screen>
    </FriendsTabStack.Navigator>
  );
}

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

function ProfileTabNavigator() {
  return (
    <ProfileTabStack.Navigator>
      <ProfileTabStack.Screen
        name="ProfileTabScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
    </ProfileTabStack.Navigator>
  );
}

const LandingTabStack = createStackNavigator<LandingTabParamList>();

function LandingTabNavigator() {
  return (
    <LandingTabStack.Navigator>
      <LandingTabStack.Screen
        name="LandingTabScreen"
        component={LandingScreen}
        options={{ headerTitle: 'Login or Register' }}
      />
    </LandingTabStack.Navigator>
  );
}