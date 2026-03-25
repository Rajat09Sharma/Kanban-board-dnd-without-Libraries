import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatchType, AppSelectorType } from "../store/store";

export const useAppDispatch: () => AppDispatchType = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppSelectorType> =
  useSelector;
