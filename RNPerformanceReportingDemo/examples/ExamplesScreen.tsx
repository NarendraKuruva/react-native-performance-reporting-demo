import React from 'react';
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ReactNavigationPerformanceView,
  useProfiledNavigation,
} from '@shopify/react-native-performance-navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {NavigationKeys, RootStackParamList} from '../constants';

export const ExamplesScreen = () => {
  const {navigate} =
    useProfiledNavigation<
      StackNavigationProp<RootStackParamList, 'Examples'>
    >();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Examples'>>();

  const renderTimeoutMillisOverride = (screenName: string) => {
    return screenName === NavigationKeys.PERFORMANCE ? 6 * 1000 : undefined;
  };

  return (
    <ReactNavigationPerformanceView
      screenName={NavigationKeys.EXAMPLES}
      interactive>
      <StatusBar barStyle="dark-content" />
      <FlatList
        keyExtractor={item => item.destination}
        data={[
          {title: 'Performance', destination: NavigationKeys.PERFORMANCE},
          {
            title: 'Drawer Navigator',
            destination: NavigationKeys.DRAWER_NAVIGATOR,
          },
          {
            title: 'Nested Navigation Screen',
            destination: NavigationKeys.NESTED_NAVIGATION_SCREEN,
          },
          {
            title: 'Conditional Rendering Screen',
            destination: NavigationKeys.CONDITIONAL_RENDERING_SCREEN,
          },
          {
            title: 'Nested Context Screen',
            destination: NavigationKeys.NESTED_PROFILER_CONTEXT,
          },
          {
            title: 'FlashList Screen',
            destination: NavigationKeys.FLASHLIST_SCREEN,
          },
        ]}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.row}
            onPress={uiEvent => {
              if (item.destination === NavigationKeys.NESTED_PROFILER_CONTEXT) {
                navigation.navigate(item.destination);
              } else {
                navigate(
                  {
                    source: NavigationKeys.EXAMPLES,
                    uiEvent,
                    renderTimeoutMillisOverride: renderTimeoutMillisOverride(
                      item.destination,
                    ),
                  },
                  item.destination,
                );
              }
            }}>
            <Text style={styles.rowTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </ReactNavigationPerformanceView>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowTitle: {
    fontSize: 18,
  },
  arrow: {
    resizeMode: 'center',
  },
});
