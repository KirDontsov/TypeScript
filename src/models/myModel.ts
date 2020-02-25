import { createModel } from "@rematch/core";

interface MyState {
  myTest: number;
  state: {
    myTest: number;
  };
}

export const myModel = createModel<MyState>({
  state: {
    myTest: 0
  },

  reducers: {
    increment: (state: MyState, payload: number | string) => ({
      ...state,
      myTest: payload
    })
  },
  effects: dispatch => ({
    incrementEffects(payload: number) {
      dispatch.myModel.increment(payload || 1);
    }
  })
});
