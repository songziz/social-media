import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import FeedScreen from '../screens/FeedScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { BottomTabParamList, FeedTabParamList, FriendsTabParamList, ProfileTabParamList, LandingTabParamList } from '../types';
import LandingScreen from '../screens/LandingScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="FeedTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="FeedTab"
        component={FeedTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="FriendsTab"
        component={FriendsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="LandingTab"
        component={LandingTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
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
        component={FeedScreen}
        options={{ headerTitle: 'Feed' }}
      />
    </FeedTabStack.Navigator>
  );
}

const FriendsTabStack = createStackNavigator<FriendsTabParamList>();

function FriendsTabNavigator() {
  return (
    <FriendsTabStack.Navigator>
      <FriendsTabStack.Screen
        name="FriendsTabScreen"
        component={FriendsScreen}
        options={{ headerTitle: 'Friends' }}
      />
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
        options={{ headerTitle: 'Landing' }}
      />
    </LandingTabStack.Navigator>
  );
}