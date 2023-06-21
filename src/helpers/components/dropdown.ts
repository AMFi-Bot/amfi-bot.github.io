import type {
  DropdownComponentProps,
  ElementType,
} from "@/types/components/dropdowns";

export function getKeyOfElement(element: ElementType) {
  return typeof element == "string" ? element : element.id ?? element.name;
}

export const topStyle = "bottom: 100%; margin-bottom:5px;";
export const leftStyle = "right: 100%; margin-right: 5px;";
export const rightStyle = "left: 100%; margin-left: 5px;";
export const bottomStyle = "top: 100%; margin-top:5px;";
export const leftCombinatedStyle = "left: 0;";
export const rightCombinatedStyle = "right: 0;";
export const styles = {
  top: topStyle,
  left: leftStyle,
  right: rightStyle,
  bottom: bottomStyle,
  "top-right": topStyle + rightCombinatedStyle,
  "top-left": topStyle + leftCombinatedStyle,
  "bottom-right": bottomStyle + rightCombinatedStyle,
  "bottom-left": bottomStyle + leftCombinatedStyle,
};

export const dropdownComponentDefaults = {
  hideOnClickAway: true,
  hideOnClickContent: true,
};

export const dropdownChoosableComponentDefaults = {
  ...dropdownComponentDefaults,
  useArrow: true,
};

export const dropdownCheckboxComponentDefaults = {
  ...dropdownChoosableComponentDefaults,
  hideOnClickContent: false,
};
