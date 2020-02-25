import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { RematchDispatch, RematchRootState } from "@rematch/core";
import { GlassMagnifier } from "react-image-magnifiers";

import { models, select } from "./store";

interface CountProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {}

const Count: FunctionComponent<CountProps> = props => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <div style={{ width: 120 }}>
      <h3>Dolphins</h3>
      <h2>{props.dolphins}</h2>
      <button onClick={props.incrementDolphins}>+1</button>
      <button onClick={props.incrementDolphinsAsync}>Async +1</button>
    </div>
    <div style={{ width: 200 }}>
      <h3>Sharks</h3>
      <h2>{props.sharks}</h2>
      <button onClick={props.incrementSharks}>+1</button>
      <button onClick={props.incrementSharksAsync}>Async +1</button>
      <button onClick={props.incrementSharksAsync2}>Async +2</button>
    </div>

    <div style={{ width: 200 }}>
      <h3>MyTest {props.myTest.myTest}</h3>
      <h2>{props.myTest.myTest}</h2>
      <button onClick={props.incrementMyTestReducer}>1</button>
      <button onClick={props.incrementMyTestEffects}>2</button>
    </div>
    <GlassMagnifier
      imageSrc={require("./assets/img/KIR_2320.jpg")}
      imageAlt="Example"
    />
  </div>
);

const mapState = (state: RematchRootState<models>) => ({
  dolphins: state.dolphins,
  sharks: select.sharks.total(state),
  myTest: state.myModel
});

const mapDispatch = (dispatch: RematchDispatch<models>) => ({
  incrementMyTestReducer: () => dispatch.myModel.increment(1),
  incrementMyTestEffects: () => dispatch.myModel.incrementEffects(9),
  // dispatch({ type: "myModel/incrementEffects", payload: 2 }),
  incrementDolphins: () => dispatch.dolphins.increment(1),
  incrementDolphinsAsync: dispatch.dolphins.incrementAsync,
  incrementSharks: () => dispatch.sharks.increment(1),
  incrementSharksAsync: () => dispatch.sharks.incrementAsync(1),
  incrementSharksAsync2: () =>
    dispatch({ type: "sharks/incrementAsync", payload: 2 })
});

export default connect(mapState as any, mapDispatch as any)(Count);
