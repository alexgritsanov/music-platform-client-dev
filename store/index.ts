import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from "redux-thunk";
import { reducer, RootState } from "./reducers";
import { GetServerSideProps } from "next";
// create a makeStore function
const makeStore: MakeStore<RootState> = (context: Context) => legacy_createStore(reducer, applyMiddleware(thunk));

// export an assembled wrapper
// export const wrapper = createWrapper<Store<State>>(makeStore, {debug: true});
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

// export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>