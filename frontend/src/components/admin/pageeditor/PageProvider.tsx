import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

import { Field, Page } from "../../../api/pageeditor";

// Action argument typing for the reducer function
export type PageAction = {
  type: string;
  setIsEdited?: boolean;
  page?: Page;
  field?: Field;
};

// Placeholder page to initialize the context with
const emptyPage: Page = {
  name: "",
  isEdited: false,
  fields: [],
};

export const PageContext = createContext<Page>(emptyPage);
export const PageDispatchContext = createContext<Dispatch<PageAction>>(() => {
  console.log("Error: Page Dispatch is uninitialized.");
});

type PageProviderProps = {
  initialPage: Page;
  children: ReactNode;
};

function pageReducer(page: Page, action: PageAction): Page {
  let newIsEdited;
  // use setIsEdited if defined
  if (action.setIsEdited !== undefined) {
    newIsEdited = action.setIsEdited;
  } else {
    newIsEdited = page.isEdited;
  }

  if (action.field) {
    // if field is defined, handle single field edit actions
    const newField = action.field;
    switch (action.type) {
      case "edit_field": {
        return {
          ...page,
          isEdited: newIsEdited,
          fields: page.fields.map((f: Field) => (newField.name === f.name ? newField : f)),
        };
      }
      default: {
        throw new Error(`Error: ${action.type} is an unknown action type.`);
      }
    }
  } else if (action.page) {
    // if page is defined, handle full page edit actions
    const newPage = action.page;
    switch (action.type) {
      case "edit_page": {
        return {
          ...page, // don't edit page.name
          isEdited: newIsEdited,
          fields: newPage.fields,
        };
      }
      default: {
        throw new Error(`Error: ${action.type} is an unknown action type.`);
      }
    }
  } else {
    // handle generic dispatches
    switch (action.type) {
      case "set_isEdited": {
        return {
          ...page,
          isEdited: newIsEdited,
        };
      }
      default: {
        throw new Error(`Error: ${action.type} is an unknown action type.`);
      }
    }
  }
}

// Context provider for page editors
export function PageProvider({ initialPage, children }: PageProviderProps) {
  const [page, dispatch] = useReducer(pageReducer, initialPage);

  return (
    <PageContext.Provider value={page}>
      <PageDispatchContext.Provider value={dispatch}>{children}</PageDispatchContext.Provider>
    </PageContext.Provider>
  );
}

// Hooks for Page context and Reducer Dispatch context
export const usePage = () => useContext(PageContext);
export const usePageDispatch = () => useContext(PageDispatchContext);
