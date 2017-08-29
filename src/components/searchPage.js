import React from "react";
import { Modal, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  wrapper: {
    paddingTop: 22
  }
});

export default function({ children }) {
  return (
    <Modal
      transparent={false}
      visible={true}
      animationType={"none"}
      style={styles.container}
    >
      <View style={styles.wrapper} children={children} />
    </Modal>
  );
}
