import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { rootReducers, RootState } from "./redux/rootReducer";

const initialState: Partial<RootState> = {
  teams: {
    teams: [],
    isLoading: false,
  },
};

export interface RenderWithProvidersOptionType {
  reduxState?: Partial<typeof initialState>;
  route?: string;
}

const history = createMemoryHistory();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function renderWithProviders(
  ui: ReactElement,
  option?: RenderWithProvidersOptionType
) {
  history.push(option?.route ?? "/");
  const store = createStore(rootReducers, option?.reduxState ?? initialState);
  return render(
    <Provider store={store}>
      <Router history={history}>{ui}</Router>
    </Provider>
  );
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithProviders as render };
