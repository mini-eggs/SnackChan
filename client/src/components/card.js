import React from "react";
import {
  Image,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { Grid, Row, Text, Spinner } from "native-base";
import FadeIn from "react-native-fade-in-image";
import HTML from "./html";

function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spinner />
    </View>
  );
}

function getChanImage({ tim, ext }, board) {
  return `https://i.4cdn.org/${board}/${tim}${ext}`;
}

const { width } = Dimensions.get("window");
function getImageDimensions({ tn_w, tn_h }) {
  return {
    width: width,
    height: tn_h * width / tn_w
  };
}

function Fade({ children }) {
  return (
    <FadeIn
      children={children}
      style={{ flex: 1 }}
      renderPlaceholderContent={<Placeholder />}
    />
  );
}

export default function({ item, board, onPress }) {
  function ImageWrapper() {
    if (typeof item.tim === "undefined") {
      return null;
    }
    return (
      <Row>
        <Fade>
          <Image
            source={{ uri: getChanImage(item, board) }}
            style={getImageDimensions(item)}
          />
        </Fade>
      </Row>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Grid>
        <ImageWrapper />
        <Row>
          <View style={{ padding: 15 }}>
            <Text>
              {item.name}
            </Text>
            <Text>
              {item.no}
            </Text>
            <View style={{ height: 15 }} />
            <HTML html={item.com} />
          </View>
        </Row>
      </Grid>
    </TouchableWithoutFeedback>
  );
}

// Object {
//   "board": "adv",
//   "bumplimit": 0,
//   "com": "So a friend of mine used to invite a group of friends to her beachside condo for 4th of July weekend every year. Last year, shit got out of hand, and she&#039;s been unemployed and in a bad spot, so the group of us didn&#039;t even bother asking if we were invited.<br><br>She told another of our friends that &quot;we acted like dicks to her when we found out we couldn&#039;t go.&quot; None of us spoke to her that we can determine, but admittedly, I have been talking about how concerned I am about the path she&#039;s going down.<br><br>Our friend that she talked to insists that we need to apologize, but we can&#039;t determine when we would have been shitty to her, because she never keeps in touch and we all never hang out.<br><br>Should I try to reach out to her and see what happened, or what?",
//   "ext": ".png",
//   "filename": "1465502204719",
//   "fsize": 34920,
//   "h": 360,
//   "imagelimit": 0,
//   "images": 1,
//   "md5": "3J0MmI4b2XLr/7Q4mUB38Q==",
//   "name": "Anonymous",
//   "no": 18515110,
//   "now": "07/13/17(Thu)21:10:02",
//   "omitted_images": 1,
//   "omitted_posts": 3,
//   "replies": 8,
//   "resto": 0,
//   "semantic_url": "apologize-for-something-im-not-sure-i-did",
//   "sub": "Apologize for something I&#039;m not sure I did?",
//   "tim": 1499994602592,
//   "time": 1499994602,
//   "tn_h": 240,
//   "tn_w": 250,
//   "w": 375,
// }
