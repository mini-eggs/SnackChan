// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

import React from "react";
import { StackNavigator } from "react-navigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";

/**
 * Reducers
 */
import Boards from "./reducers/boards";
import Threads from "./reducers/threads";

/**
 * Routes
 */
import Explore from "./routes/explore";

const store = createStore(
  combineReducers({ Boards, Threads }),
  applyMiddleware(Thunk)
);
const Stacks = StackNavigator({ Explore });

export default function() {
  return (
    <Provider store={store}>
      <Stacks />
    </Provider>
  );
}
