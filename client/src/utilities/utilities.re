/**
 * Shared Reason code.
 */

/**
 * Functions.
 */

let dangerouslyGetItem = [%bs.raw {|
  function(item, key) {
    return item[key];
  }  
|}];

let toast = [%bs.raw {|
  function(text) {
    var { Toast } = require("native-base");
    Toast.show({
      text: text,
      position: "bottom",
      buttonText: "OK"
    })
  }
|}];

let getHeaderStyle = [%bs.raw {|
  function() {
    var { getHeaderStyle } = require("../../../../src/components/styleProvider");
    return getHeaderStyle();
  }
|}];

let wrapNavigation = [%bs.raw {|
  function(aFunction) {
    var { getHeaderStyle } = require("../../../../src/components/styleProvider");
    return ({ navigation }) => {
      var props = navigation.state.params;
      var customObj = aFunction(props);
      return Object.assign({}, getHeaderStyle(), customObj);
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
  {
    "screen": aScreen |> connect aMapState aMapDispatch,
    "navigationOptions": aMapNavigation |> wrapNavigation
  };
};

let nullJS = [%bs.raw {| undefined |}];

let getType = [%bs.raw {| function(item) { return item.type } |}];

let getPayload = [%bs.raw {| function(item) { return item.payload } |}];

let formatChanBoard item => {
  {
    "board": item##board,
    "bump_limit": item##bump_limit,
    "image_limit": item##image_limit,
    "is_archived": item##is_archived,
    "max_comment_chars": item##max_comment_chars,
    "max_filesize": item##max_filesize,
    "max_webm_duration": item##max_webm_duration,
    "max_webm_filesize": item##max_webm_filesize,
    "meta_description": item##meta_description,
    "pages": item##pages,
    "per_page": item##per_page,
    "title": item##title,
    "ws_board": item##ws_board,
  };
};

let formatChanItem board item => {
  { 
    "bumplimit": item##bumplimit,
    "sub": item##sub,
    "com": item##com,
    "ext": item##ext,
    "filename": item##filename,
    "fsize": item##fsize,
    "h": item##h,
    "id": item##id,
    "imagelimit": item##imagelimit,
    "images": item##images,
    "md5": item##md5,
    "name": item##name,
    "no": item##no,
    "now": item##now,
    "replies": item##replies,
    "resto": item##resto,
    "semantic_url": item##semantic_url,
    "tim": item##tim,
    "time": item##time,
    "tn_h": item##tn_h,
    "tn_w": item##tn_w,
    "w": item##w,
    "image": item##tim != nullJS && (String.length item##tim) > 0,
    "imageURI": "https://i.4cdn.org/" ^ board ^ "/" ^ item##tim ^ item##ext,
    "thumbnailURI": "https://i.4cdn.org/" ^ board ^ "/" ^ item##tim ^ "s" ^ item##ext,
    "imageFilename": item##tim ^ item##ext
  };
};
