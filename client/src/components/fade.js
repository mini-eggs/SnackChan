import React from "react";
import { Animated } from "react-native";
import { compose, withProps, lifecycle } from "recompose";

function Fade({ opacity, style, children }) {
  return (
    <Animated.View
      style={Object.assign({}, style, { opacity })}
      children={children}
    />
  );
}

function componentDidMount() {
  Animated.timing(this.props.opacity, {
    toValue: 1,
    duration: 250,
    useNativeDriver: true
  }).start();
}

export default compose(
  withProps({ opacity: new Animated.Value(0) }),
  lifecycle({ componentDidMount })
)(Fade);
