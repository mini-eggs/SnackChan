import { connect } from "react-redux";
import ThemeProvider from "../components/ThemeProvider";

const mapState = ({ Styles }) => ({
  header: Styles.get("header").toObject()
});

export default connect(mapState)(ThemeProvider);
