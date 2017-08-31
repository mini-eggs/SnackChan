// @flow

import { connect } from "react-redux";

import SingleThread from "../scenes/singleThread";
import type { storeState } from "../reducers/_shared";

type emptyT = {};

const mapState = (state: storeState): emptyT => ({});
const mapDispatch = (d: any): emptyT => ({});

export default connect(mapState, mapDispatch)(SingleThread);
