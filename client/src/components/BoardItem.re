type navigationObject = {board: string}; 

let component = ReasonReact.statelessComponent "BoardItem";

let make ::item ::navigation _children => {
  let handlePress _event {ReasonReact.state: state} => {
    let params = {"board": item##board, "item": item}; 
    navigation##navigate "Board" params; 
    ReasonReact.NoUpdate
  };
  
  {
    ...component,

    render: fun {update} =>
      <CustomFade>
        <NativeBaseListItem onPress=(update handlePress)>
          <NativeBaseBody>
            <NativeBaseText> (ReasonReact.stringToElement item##title) </NativeBaseText>
          </NativeBaseBody>
          <NativeBaseRight> <NativeBaseIcon name="arrow-forward" /> </NativeBaseRight>
        </NativeBaseListItem>
      </CustomFade>
  }
};