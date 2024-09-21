import React, { createContext, useReducer, PropsWithChildren } from "react";

export const initialValues = {
  searchValue: "",
};

export const SearchContext = createContext({} as any);

function reducer(
  state: { searchValue: string },
  action: { type: string; data: string }
) {
  switch (action.type) {
    case "SET_SEARCH_VALUE":
      return { searchValue: action.data };
    default:
      return state;
  }
}

export const SearchContextProvider: React.FC<PropsWithChildren> = ({
  children,
}: any) => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  const setSearchValue = (input: string) => {
    dispatch({ type: "SET_SEARCH_VALUE", data: input });
  };
  console.log("State", state);
  return (
    <SearchContext.Provider value={{ searchData: state, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
