import React, {useCallback} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {
  FlashListPerformanceView,
  ListsProfiler,
} from '@shopify/react-native-performance-lists-profiler';
import {FlashList} from '@shopify/flash-list';

import {User, USERS} from './data';

const styles = StyleSheet.create({
  commonStyles: {
    padding: 24,
    backgroundColor: 'lightblue',
    margin: 12,
    borderRadius: 1000,
  },
});

const FlashListScreen = () => {
  const renderData = (item: User) => (
    <>
      <Text>{`Username: ${item.username}`}</Text>
      <Text>{`Password: ${item.password}`}</Text>
      <Text>{`Email: ${item.email}`}</Text>
      <Text>{`UserId: ${item.userId}`}</Text>
    </>
  );

  const renderItem = itemData => {
    const item: User = itemData.item;
    if (item.username[0].toUpperCase() === 'A')
      return (
        <View
          style={[
            styles.commonStyles,
            {
              backgroundColor: 'lightblue',
            },
          ]}>
          {renderData(item)}
        </View>
      );
    if (item.username[0].toUpperCase() === 'B')
      return (
        <View
          style={[
            styles.commonStyles,
            {
              backgroundColor: 'gray',
            },
          ]}>
          {renderData(item)}
        </View>
      );
    if (item.username[0].toUpperCase() === 'C')
      return (
        <View
          style={[
            styles.commonStyles,
            {
              backgroundColor: 'red',
            },
          ]}>
          {renderData(item)}
        </View>
      );

    if (item.username[0].toUpperCase() === 'D')
      return (
        <View
          style={[
            styles.commonStyles,
            {
              backgroundColor: 'purple',
            },
          ]}>
          {renderData(item)}
        </View>
      );

    return (
      <View
        style={[
          styles.commonStyles,
          {
            backgroundColor: item.color,
          },
        ]}>
        {renderData(item)}
      </View>
    );
  };

  const onInteractiveCallback = useCallback((TTI: number, listName: string) => {
    console.log(`${listName}'s TTI: ${TTI}`);
  }, []);
  const onBlankAreaCallback = useCallback(
    (offsetStart: number, offsetEnd: number, listName: string) => {
      console.log(
        `Blank area for ${listName}: ${Math.max(offsetStart, offsetEnd)}`,
      );
    },
    [],
  );

  return (
    <ListsProfiler
      onInteractive={onInteractiveCallback}
      onBlankArea={onBlankAreaCallback}>
      <FlashListPerformanceView listName="Testing Flat List">
        <FlashList renderItem={renderItem} data={USERS} />
      </FlashListPerformanceView>
    </ListsProfiler>
  );
};

export default FlashListScreen;
