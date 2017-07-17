/* function SingleItem({ title, board, navigation }) {
     return (
       <ListItem onPress={Navigate(navigation, "Board", { board })}>
         <Body>
           <H3>
             {title}
           </H3>
         </Body>
         <Right>
           <Icon name="arrow-forward" />
         </Right>
       </ListItem>
     );
   } */
 type navigationObject = {board: string}; 

let component = ReasonReact.statelessComponent "BoardItem";

let make ::item ::navigation _children => {
  let handlePress _event {ReasonReact.state: state} => {
    let params = [%bs.obj {"board": "g", "item": item}]; 
     navigation##navigate "Board" params; 
    ReasonReact.NoUpdate
  };
  {
    ...component,
    render: fun {update} =>
      <NativeBaseListItem onPress=(update handlePress)>
        <NativeBaseBody>
          <NativeBaseText> (ReasonReact.stringToElement item##title) </NativeBaseText>
        </NativeBaseBody>
        <NativeBaseRight> <NativeBaseIcon name="arrow-forward" /> </NativeBaseRight>
      </NativeBaseListItem>
  }
};

let jsComponent =
  ReasonReact.wrapReasonForJs
    ::component (fun jsProps => make item::jsProps##item navigation::jsProps##navigation [||]);