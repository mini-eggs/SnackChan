open ReactNative;

type postType = {
  board: string,
  bumplimit: int,
  com: string,
  ext: string,
  filename: string,
  fize: int,
  h: int,
  imagelimit: int,
  image: int,
  md5: string,
  name: string,
  no: int,
  now: string,
  omitted_images: int,
  omitted_posts: int,
  replies: int,
  resto: int,
  semantic_url: string,
  sub: string,
  tim: int,
  time: int,
  tn_h: int,
  tn_w: int,
  w: int
};

type threadType = {posts: list postType};

let containerStyle = Style.(style [flex 1.]);

let scrollStyle = Style.(style [flex 1.]);

let component = ReasonReact.statelessComponent "ThreadList";

let make
    page::(page: int)
    threads::(threads: list threadType)
    loadingNextPage::(loadingNextPage: bool)
    ::onNextPage
    _children => {
  ...component,
  render: fun _self => {
    let board = "g";
    let listItems = threads |> List.map (fun thread => <CardWrapper item=thread board />);
    let listElements = ReasonReact.arrayToElement (Array.of_list listItems);
    <View style=containerStyle> <ScrollView style=scrollStyle> listElements </ScrollView> </View>
  }
};