import React from "react";
import { View, TextInput } from "react-native";
import { Button } from "react-native-material-ui";
import SuggestionsConnect from "../containers/Suggestions";
import { API_CREATE_SUGGESTION as handleSubmit } from "../constants/API";
import { AlertWrap, SanitizeAndLogError } from "../constants/Tools";

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

const initialState = { textInput: "", loading: false };

class Suggestions extends React.unstable_AsyncComponent {
  state = initialState;

  updateText(textInput) {
    this.setState(() => ({ textInput }));
  }

  onSubmit() {
    if (this.state.textInput && !this.state.loading) {
      this.setState(() => ({ loading: true }), ::this.createSubmitRequest);
    }
  }

  createSubmitRequest() {
    handleSubmit(this.state.textInput)
      .then(::this.handleSubmitSucces)
      .catch(::this.handleSubmitError)
      .finally(() => this.setState(() => initialState));
  }

  handleSubmitSucces({ message }) {
    AlertWrap("Complete", message);
  }

  handleSubmitError(err) {
    AlertWrap("Error", SanitizeAndLogError(err));
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
        <Button
          raised
          primary
          onPress={::this.onSubmit}
          text={this.state.loading ? "Loading..." : "Submit"}
        />
      </View>
    );
  }
}

export default SuggestionsConnect(Suggestions);
