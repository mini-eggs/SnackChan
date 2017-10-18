import React from "react";
import { View, TextInput, Alert } from "react-native";
import { Button } from "react-native-material-ui";
import SuggestionsConnect from "../containers/Suggestions";
import { API_CREATE_SUGGESTION as handleSubmit } from "../constants/API";

const styles = {
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 3
  },
  input: {
    fontSize: 14,
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  spacer: {
    height: 15
  }
};

class Suggestions extends React.unstable_AsyncComponent {
  state = { textInput: "" };

  updateText(textInput) {
    this.setState(() => ({ textInput }));
  }

  async onSubmit() {
    if (!this.state.textInput) {
      return;
    }

    try {
      const res = await handleSubmit(this.state.textInput);
      const { message, status } = await res.json();

      if (status) {
        this.handleSubmitComplete(message);
      } else {
        this.handleSubmitError(message);
      }
    } catch (err) {
      this.handleCrucialError(err);
    }
  }

  handleSubmitComplete(message) {
    Alert.alert("Complete", message, [{ text: "OK" }], { cancelable: true });
    this.setState(() => ({ textInput: "" }));
  }

  handleSubmitError(message) {
    Alert.alert("Error", message, [{ text: "OK" }], { cancelable: true });
  }

  handleCrucialError(err) {
    Alert.alert("Error", `Oops, something has gone wrong.`, [{ text: "OK" }], {
      cancelable: true
    });
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            value={this.state.textInput}
            multiline={true}
            placeholder="Enter suggestion"
            style={{ ...this.props.textStyle, ...styles.input }}
            autoGrow={true}
            underlineColorAndroid="transparent"
            maxLength={4096}
            onChangeText={::this.updateText}
          />
        </View>
        <Button onPress={::this.onSubmit} raised primary text="Submit" />
      </View>
    );
  }
}
export default SuggestionsConnect(Suggestions);
