import React, {useCallback, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PerformanceProfiler, LogLevel} from '@shopify/react-native-performance';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import analytics from '@react-native-firebase/analytics';

import {ExamplesScreen} from './examples';
import PerformanceScreen from './examples/PerformanceScreen';
import {NavigationKeys, RootStackParamList} from './constants';
import FastRenderPassesScreen from './examples/FastRenderPassesScreen';
import ConditionalRenderingScreen from './examples/ConditionalRenderingScreen';
import DrawerNavigator from './examples/DrawerNavigator';
import NestedNavigationScreen from './examples/NestedNavigationScreen';
import NestedContextScreen, {
  InnerNestedContextScreen,
} from './examples/NestedContextScreen';

const Stack = createStackNavigator<RootStackParamList>();

const NavigationTree = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={NavigationKeys.EXAMPLES}
          component={ExamplesScreen}
        />
        <Stack.Screen
          name={NavigationKeys.PERFORMANCE}
          component={PerformanceScreen}
        />
        <Stack.Screen
          name={NavigationKeys.DRAWER_NAVIGATOR}
          component={DrawerNavigator}
        />
        <Stack.Screen
          name={NavigationKeys.FAST_RENDER_PASSES_SCREEN}
          component={FastRenderPassesScreen}
        />
        <Stack.Screen
          name={NavigationKeys.CONDITIONAL_RENDERING_SCREEN}
          component={ConditionalRenderingScreen}
        />
        <Stack.Screen
          name={NavigationKeys.NESTED_NAVIGATION_SCREEN}
          component={NestedNavigationScreen}
        />
        <Stack.Screen
          name={NavigationKeys.NESTED_PROFILER_CONTEXT}
          component={NestedProfilerNavigationTree}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function NestedProfilerNavigationTree() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigationKeys.NESTED_CONTEXT_SCREEN}
        component={NestedContextScreen}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name={NavigationKeys.INNER_NESTED_CONTEXT_SCREEN}
          component={InnerNestedContextScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const App = () => {
  const apolloClient = useMemo(() => {
    return new ApolloClient({
      uri: 'https://rickandmortyapi.com/graphql',
      cache: new InMemoryCache(),
    });
  }, []);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <PerformanceProfiler
          logLevel={LogLevel.Debug}
          onReportPrepared={async report =>
            await analytics().logEvent('react_native_performance', report)
          }>
          <NavigationTree />
        </PerformanceProfiler>
      </ApolloProvider>
    </>
  );
};

export default App;
