import React from "react";
import { Animated, View } from "react-native";
import { merge } from "lodash";

export default class extends React.Component {
  animation = new Animated.Value(0);

  componentDidMount() {
    const delay = this.props.delay || 0;
    const duration = this.props.duration || 500;

    setTimeout(() => {
      Animated.timing(this.animation, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true
      }).start();
    }, delay);
  }

  render() {
    const style = merge({}, this.props.style || {}, {
      opacity: this.animation
    });
    return <Animated.View style={style} children={this.props.children} />;
  }
}
