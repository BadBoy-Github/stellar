


// node modules
import { useContext } from "react";

// Context
import { SnackbarContext } from "../contexts/SnackbarContext.jsx";

export const useSnackbar = () => useContext(SnackbarContext);

