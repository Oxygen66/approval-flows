import React, { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { rootReducers, RootState } from "./redux/rootReducer";

const initialState: Partial<RootState> = {
  teams: {
    teams: [],
    isLoading: false,
  },
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function renderWithProviders(
  ui: ReactElement,
  { reduxState } = { reduxState: { ...initialState } }
) {
  const store = createStore(rootReducers, reduxState || initialState);
  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithProviders as render };
