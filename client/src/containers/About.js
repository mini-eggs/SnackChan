import { connect } from "react-redux";

const mapState = ({ Styles }) => ({
  textStyle: Styles.get("text").toObject()
});

const mapActions = () => ({});

export default connect(mapState, mapActions);
