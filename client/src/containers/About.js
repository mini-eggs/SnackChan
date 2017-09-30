import { connect } from "react-redux";
import About from "../scenes/About";

const mapState = ({ Styles }) => ({
  textStyle: Styles.get("text").toObject()
});

const mapActions = () => ({});

export default connect(mapState, mapActions)(About);
