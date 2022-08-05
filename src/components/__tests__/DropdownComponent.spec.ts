import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import DropdownComponent from "../DropdownComponent.vue";
import type { ElementType } from "@/types/components/DropdownComponents";
import VueClickAwayPlugin from "vue3-click-away";

const clickButtonTitle = "Click me!";
const dropdownContent: ElementType[] = [
  "content 1",
  "content 2",
  "content 3",
  { name: "content 1" },
  { name: "content 2", id: 2 },
  { icon: "icon", name: "content 3", id: 3 },
  { icon: "icon", name: "content 3", id: 3, value: "value" },
];

const baseConfig = {
  clickButtonTitle,
  dropdownContent,
  onChoose(element: ElementType) {
    console.log(element);
  },
  useChoosedElementAsTitle: true,
};

const global = {
  plugins: [VueClickAwayPlugin],
};

describe("Dropdown Component", () => {
  it("renders properly", async () => {
    // Mount element
    const wrapper = mount(DropdownComponent, {
      props: {
        config: baseConfig,
      },
      global,
    });

    const dropdownComponent = wrapper.find(".dropdown_elem");
    const dropdownTitleElement = dropdownComponent.find(".dropdown_title");

    // Check title property exists
    expect(dropdownTitleElement.find(".title").text()).toContain(
      clickButtonTitle
    );

    const dropdownList = wrapper.find(".dropdown_content");
    const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

    // Check dropdown list to be hidden by default
    expect(dropdownList.attributes()["style"]).toContain("display: none;");

    // Check elements amount to equal setted amount
    expect(dropdownElements).toHaveLength(dropdownContent.length);

    // Check rendered elements to equal setted elements
    for (const key in dropdownContent) {
      const element = dropdownContent[key];
      const renderedElement = dropdownElements[key];

      expect(renderedElement.find(".name").text()).toEqual(
        typeof element === "string" ? element : element.name
      );

      if (typeof element !== "string") {
        if (element.icon) {
          expect(renderedElement.find(".icon").attributes()["src"]).toEqual(
            element.icon
          );
        }
        if (element.value) {
          expect(renderedElement.find(".value").text()).toEqual(element.value);
        }
      }
    }
  });

  it("dropdown list switches visibility on click", async () => {
    // Mount element
    const wrapper = mount(DropdownComponent, {
      props: {
        config: baseConfig,
      },
      global,
    });

    const dropdownList = wrapper.find(".dropdown_content");
    const dropdownTitleElement = wrapper.find(".dropdown_title");

    // Check dropdown list to be hidden by default
    expect(dropdownList.attributes()["style"]).toContain("display: none;");

    // Check dropdown list to displays on click to title
    await dropdownTitleElement.trigger("click");
    expect(dropdownList.attributes()["style"]).not.toContain("display: none;");

    // And hides on click again
    await dropdownTitleElement.trigger("click");
    expect(dropdownList.attributes()["style"]).toContain("display: none;");
  });

  it("chooses elements", async () => {
    let onChooseCallbackReturn: ElementType | undefined = undefined;

    // Mount element
    const wrapper = mount(DropdownComponent, {
      props: {
        config: {
          ...baseConfig,
          onChoose(element: ElementType) {
            onChooseCallbackReturn = element;
          },
        },
      },
      global,
    });

    const dropdownList = wrapper.find(".dropdown_content");
    const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

    for (const key in dropdownContent) {
      const element = dropdownContent[key];
      const renderedElement = dropdownElements[key];

      await renderedElement.trigger("click");
      expect(onChooseCallbackReturn).toEqual(element);
    }
  });

  it("check initial element config", async () => {
    const initialElement = { name: "qwerty" };

    // Mount element
    const wrapper = mount(DropdownComponent, {
      props: {
        config: {
          ...baseConfig,
          initChoosedElement: initialElement,
        },
      },
      global,
    });

    const dropdownComponent = wrapper.find(".dropdown_elem");
    const dropdownTitleElement = dropdownComponent.find(".dropdown_title");

    // Check title property exists
    expect(dropdownTitleElement.find(".title").text()).toEqual(
      initialElement.name
    );
  });

  it("check use choosed element as title config property", async () => {
    let onChooseCallbackReturn: ElementType = dropdownContent[0];
    const initialElement = { name: "qwerty" };

    // Mount element
    const wrapper = mount(DropdownComponent, {
      props: {
        config: {
          ...baseConfig,
          initChoosedElement: initialElement,
          onChoose(element: ElementType) {
            onChooseCallbackReturn = element;
          },
        },
      },
      global,
    });

    const dropdownComponent = wrapper.find(".dropdown_elem");
    const dropdownTitleElement = dropdownComponent.find(".dropdown_title");

    // Check title property exists
    expect(dropdownTitleElement.find(".title").text()).toEqual(
      initialElement.name
    );

    const dropdownList = wrapper.find(".dropdown_content");
    const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

    for (const key in dropdownContent) {
      const element = dropdownContent[key];
      const renderedElement = dropdownElements[key];

      await renderedElement.trigger("click");
      expect(onChooseCallbackReturn).toEqual(element);

      expect(dropdownTitleElement.find(".title").text()).toContain(
        onChooseCallbackReturn
          ? typeof onChooseCallbackReturn === "string"
            ? onChooseCallbackReturn
            : onChooseCallbackReturn.name
          : onChooseCallbackReturn
      );
    }
  });
});
