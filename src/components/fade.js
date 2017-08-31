// @flow

import React from "react";
import { Animated, View } from "react-native";
import { merge } from "lodash";

type propsT = {
  delay?: number,
  duration?: number,
  style?: any,
  children: React.Children
};

type stateT = {
  animation: Animated.Value
};

class Fade extends React.PureComponent<void, propsT, stateT> {
  state = {
    animation: new Animated.Value(0)
  };

  componentDidMount() {
    const delay = this.props.delay || 0;
    const duration = this.props.duration || 500;

    setTimeout(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true
      }).start();
    }, delay);
  }

  render() {
    const style = merge({}, this.props.style || {}, {
      opacity: this.state.animation
    });
    return <Animated.View style={style} children={this.props.children} />;
  }
}

export default Fade;
