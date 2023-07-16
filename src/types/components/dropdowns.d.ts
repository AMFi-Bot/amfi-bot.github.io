export type ElementType =
  | string
  | {
      name: string;
      value?: string;
      icon?: string;
      id?: string | number;
    };

export type DropdownComponentProps = Omit<
  {
    /**
     * Provide this prop if you want to manually control the visibility of the dropdown content
     * The prop is being ref() -ed, so every changes you made with it in top-level component affect
     * the visibility of the dropdown content.
     *
     *
     * If the refDropdownShown prop is provided,
     * the local dropdown toogle visibility mechanic is being disabled
     * and the visibility of the dropdown content is being regulate ONLY via updates of the refDropdownShown prop.
     */
    refDropdownShown?: { state: boolean };
    /**
     * Specifies the position of the dropdown content relatively to the base title element
     */
    position?:
      | "top"
      | "left"
      | "right"
      | "bottom"
      | "top-right"
      | "top-left"
      | "bottom-right"
      | "bottom-left";
    /**
     * Specifies the class of the entire dropdown element (title with content)
     */
    elem_class?: string;
    /**
     * Specifies the class of the title
     */
    title_class?: string;
    /**
     * Specifies the class of the block with dropdown content
     */
    content_class?: string;
    /**
     * If set to true, the dropdown content hides on every click event that causes away of the dropdown element
     * @default true
     */
    hideOnClickAway?: boolean;
    /**
     * If set to true, the dropdown content hides on every click on the content block
     * @default true
     */
    hideOnClickContent?: boolean;
    /**
     * Adds the arrow to the title
     */
    useArrow?: boolean;
  } & DropdownArrowProps,
  "arrowState"
>;

export type DropdownChooseComponentProps = {
  clickButtonTitle: string;
  dropdownContent: ElementType[];
  /**
   * Provide this prop if you want to manually control choosedElement
   * The prop is being ref() -ed, so every changes you made with it in top-level component affect
   * the checked element of the dropdown.
   *
   * If the refChoosedElement variable is provided,
   * the local choosed element mechanic is being disabled
   * and the choosedElement is being regulate ONLY via updates of the refChoosedElement prop.
   */
  refChoosedElement?: ElementType;
  initChoosedElement?: ElementType;
  useChoosedElementAsTitle?: boolean;
} & DropdownComponentProps;

export type DropdownCheckboxComponentProps = {
  clickButtonTitle: string;
  dropdownContent: ElementType[];
  initChoosed?: ElementType[];
  /**
   * Provide this prop if you want to manually control choosedElements
   * The prop is being computed() -ed, so every changes you made with it in top-level component affect
   * the list with checked elems of the dropdown.
   *
   * If the refChoosedElements variable is provided,
   * the local choosed element mechanic is being disabled
   * and the choosedElements is being regulate ONLY via updates of the refChoosedElements prop.
   */
  refChoosedElements?: ElementType[];
} & DropdownComponentProps;

export type DropdownArrowProps = {
  arrowState: boolean;
  arrowAnimationSide?: "right" | "left";
  disableArrowAnimation?: boolean;
  sideSize?: string;
  width?: string;
  color?: string;
  animationSpeed?: string;
};
