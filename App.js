import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions
} from 'react-native';
import Animated, { not, multiply, interpolate } from 'react-native-reanimated';
import { useTransition } from 'react-native-redash/lib/module/v1';

const cards = [
  {key: '0', style: {zIndex: 0, backgroundColor: '#e6007e'}},
  {key: '1', style: {zIndex: 1, backgroundColor: '#fed304'}},
  {key: '2', style: {zIndex: 2, backgroundColor: '#00bacc'}},
];
const { width } = Dimensions.get('screen');
const transformOrigin = -1 * 0.74 * width / 2; 

function App() {
  const [toggled, setToggled] = useState(0);
  const transition = useTransition(toggled, not(toggled), toggled)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.body}>
        {cards.map((card, index) => {
          const direction = interpolate(index, {
            inputRange: [0, 1, 2],
            outputRange: [-1, 0, 1],
          })
          const rotate = multiply(direction, interpolate(transition, {
            inputRange: [0, 1],
            outputRange: [0, Math.PI / 6]
          }));

          return (
            <View key={card.key} style={styles.cardContainer}>
              <Animated.View
                style={[
                  styles.card,
                  {...card.style},
                  {
                    transform: [
                      {translateX: transformOrigin},
                      { rotate },
                      {translateX: -transformOrigin},
                    ],
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={1}
        onPress={() => setToggled(toggled ^ 1)}>
        <Text style={styles.touchableText}>{toggled ? 'reset' : 'start'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#087056',
  },
  touchableText: {
    fontSize: 20,
    color: '#FFF',
    textTransform: 'uppercase',
    margin: 12,
  },
  cardContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '74%',
    height: 180,
    borderRadius: 10,
  },
});

export default App;
