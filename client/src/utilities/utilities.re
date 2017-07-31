/**
 * Shared Reason code.
 */

/**
 * Functions.
 */
let wrapNavigation = [%bs.raw {|
  function(aFunction) {
    var { headerStyle } = require("../../../../src/components/styleProvider");
    return ({ navigation }) => {
      var props = navigation.state.params;
      var customObj = aFunction(props);
      return Object.assign({}, headerStyle, customObj);
    };
  }
|}];

let connect = [%bs.raw {|
  function(state, dispatch) {
    var { connect } = require("react-redux");
    return connect(state, dispatch);
  }
|}];

let buildScreen aScreen aMapNavigation aMapState aMapDispatch => {
  [%bs.obj {
    screen: aScreen |> connect aMapState aMapDispatch,
    navigationOptions: aMapNavigation |> wrapNavigation
  }];
};

let nullJS = [%bs.raw {| undefined |}];

let getType = [%bs.raw {| function(item) { return item.type } |}];

let getPayload = [%bs.raw {| function(item) { return item.payload } |}];

let formatChanItem board item => {
  [%bs.obj { 
    bumplimit: item##bumplimit,
    sub: item##sub,
    com: item##com,
    ext: item##ext,
    filename: item##filename,
    fsize: item##fsize,
    h: item##h,
    id: item##id,
    imagelimit: item##imagelimit,
    images: item##images,
    md5: item##md5,
    name: item##name,
    no: item##no,
    now: item##now,
    replies: item##replies,
    resto: item##resto,
    semantic_url: item##semantic_url,
    tim: item##tim,
    time: item##time,
    tn_h: item##tn_h,
    tn_w: item##tn_w,
    w: item##w,
    image: (String.length item##tim) > 0,
    imageURI: "https://i.4cdn.org/" ^ board ^ "/" ^ item##tim ^ item##ext,
    thumbnailURI: "https://i.4cdn.org/" ^ board ^ "/" ^ item##tim ^ "s" ^ item##ext,
    imageFilename: item##tim ^ item##ext
  }];
};
