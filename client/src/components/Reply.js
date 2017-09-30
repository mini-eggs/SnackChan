import React from "react";
import { View, WebView, Modal } from "react-native";
import { withNavigation } from "react-navigation";
import Header from "../containers/Header";
import { getThreadURL } from "../constants/Chan";

const injected = `(${String(function() {
  // setup
  const oPM = window.postMessage;
  const pPM = (x, y, z) => oPM(x, y, z);
  pPM.toString = () =>
    String(Object.hasOwnProperty).replace("hasOwnProperty", "postMessage");
  window.postMessage = pPM;
  // business
  window.onload = () => {
    window.postMessage("Done loading vro");
  };
})})();`;

const Container = ({ url, onMessage, visible, navigation, onRequestClose }) => (
  <Modal
    onRequestClose={onRequestClose}
    animationType="slide"
    transparent={false}
    visible={visible}
  >
    <View style={{ flex: 1 }}>
      <Header
        title={"Reply"}
        home={false}
        refresh={false}
        onBack={onRequestClose}
      />
      <WebView
        onMessage={onMessage}
        style={{ flex: 1 }}
        source={{ uri: url }}
        injectedJavaScript={injected}
      />
    </View>
  </Modal>
);

class Reply extends React.unstable_AsyncComponent {
  handleMessage({ nativeEvent: { data } }) {
    alert(data);
  }

  render() {
    const { board, no } = this.props.navigation.state.params;
    const URL = getThreadURL(board, no);
    return (
      <Container {...this.props} url={URL} onMessage={::this.handleMessage} />
    );
  }
}

export default withNavigation(Reply);
