import React from "react";
import { withNavigation } from "react-navigation";

export default function(paramName) {
  return function(Component) {
    return withNavigation(function(props) {
      const params = {};
      params[paramName] = props.navigation.state.params[paramName];
      return <Component {...props} {...params} />;
    });
  };
}
