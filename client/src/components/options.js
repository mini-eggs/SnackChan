import { withNavigation } from "react-navigation";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { jsComponent as FabOptions } from "../../lib/js/src/components/fabOptions";
export default withNavigation(connectActionSheet(FabOptions));
