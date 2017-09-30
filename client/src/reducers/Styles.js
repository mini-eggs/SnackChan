import { Map } from "immutable";

const initial = Map({
  header: Map({
    backgroundColor: "#2793e8"
  }),
  title: Map({
    color: "white"
  }),
  body: Map({
    backgroundColor: "#f1f1f1"
  }),
  text: Map({
    color: "black"
  })
});

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    default: {
      return state;
    }
  }
};

export default reducer;
