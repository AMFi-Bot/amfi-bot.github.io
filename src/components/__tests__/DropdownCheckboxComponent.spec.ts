import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import DropdownCheckboxComponent from "../DropdownCheckboxComponent.vue";
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
};
const global = {
  plugins: [VueClickAwayPlugin],
};

describe("Dropdown Checkbox", () => {
  it("renders properly", async () => {
    // Mount element
    const wrapper = mount(DropdownCheckboxComponent, {
      props: {
        ...baseConfig,
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

      const elementCheckbox = renderedElement.find(".checkbox");
      const elementContent = renderedElement.find(".element");

      expect(elementContent.find(".name").text()).toEqual(
        typeof element === "string" ? element : element.name
      );

      if (typeof element !== "string") {
        if (element.icon) {
          expect(elementContent.find(".icon").attributes()["src"]).toEqual(
            element.icon
          );
        }
        if (element.value) {
          expect(elementContent.find(".value").text()).toEqual(element.value);
        }
      }

      expect(elementCheckbox.classes()).toContain("unchecked");
    }
  });

  it("chooses elements", async () => {
    // Mount element
    const wrapper = mount(DropdownCheckboxComponent, {
      props: {
        ...baseConfig,
      },
      global,
    });

    const dropdownList = wrapper.find(".dropdown_content");
    const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

    for (const key in dropdownContent) {
      const renderedElement = dropdownElements[key];

      const elementCheckbox = renderedElement.find(".checkbox");

      // Check checkbox of element to unchecked state
      expect(elementCheckbox.classes()).toContain("unchecked");

      // Click on element event must mark checkbox to checked state(and delete unchecked)
      await renderedElement.trigger("click");
      expect(elementCheckbox.classes()).not.toContain("unchecked");
      expect(elementCheckbox.classes()).toContain("checked");

      // Click again on choosed element must mark checkbox to unchecked state
      await renderedElement.trigger("click");
      expect(elementCheckbox.classes()).toContain("unchecked");
    }
  });

  it("chooses multiply elements", async () => {
    // Mount element
    const wrapper = mount(DropdownCheckboxComponent, {
      props: {
        ...baseConfig,
      },
      global,
    });

    const dropdownList = wrapper.find(".dropdown_content");
    const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

    for (const key in dropdownContent) {
      const renderedElement = dropdownElements[key];

      // Click on element event must mark checkbox to checked state(and delete unchecked)
      await renderedElement.trigger("click");
    }

    // Choosed every element

    for (const key in dropdownContent) {
      const renderedElement = dropdownElements[key];

      const elementCheckbox = renderedElement.find(".checkbox");

      expect(elementCheckbox.classes()).not.toContain("unchecked");
      expect(elementCheckbox.classes()).toContain("checked");
    }
  });

  it("check initial elements config", async () => {
    // Mount element
    const wrapper = mount(DropdownCheckboxComponent, {
      props: {
        ...baseConfig,
        initChoosed: dropdownContent,
      },
      global,
    });

    const dropdownList = wrapper.find(".dropdown_content");
    const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

    for (const key in dropdownContent) {
      const renderedElement = dropdownElements[key];

      const elementCheckbox = renderedElement.find(".checkbox");

      // All elements must be marked as choosed
      expect(elementCheckbox.classes()).not.toContain("unchecked");
      expect(elementCheckbox.classes()).toContain("checked");
    }
  });

  it("check ref elements", async () => {
    let refChoosedElements: ElementType[] = ["qwe"];

    // Mount element
    const wrapper = mount(DropdownCheckboxComponent, {
      props: {
        ...baseConfig,
        refChoosedElements,
      },

      global,
    });

    const dropdownList = wrapper.find(".dropdown_content");
    const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

    refChoosedElements = dropdownContent;
    await wrapper.setProps({ refChoosedElements });
    for (const renderedElement of dropdownElements) {
      const elementCheckbox = renderedElement.find(".checkbox");

      expect(elementCheckbox.classes()).not.toContain("unchecked");
      expect(elementCheckbox.classes()).toContain("checked");
    }
    refChoosedElements = [];
    await wrapper.setProps({ refChoosedElements });

    for (const key in dropdownContent) {
      const element = dropdownContent[key];
      const renderedElement = dropdownElements[key];

      const elementCheckbox = renderedElement.find(".checkbox");

      // Check checkbox of element to unchecked state
      expect(elementCheckbox.classes()).toContain("unchecked");

      // Click on element event must mark checkbox to checked state(and delete unchecked)
      refChoosedElements = [element];
      await wrapper.setProps({ refChoosedElements });
      expect(elementCheckbox.classes()).not.toContain("unchecked");
      expect(elementCheckbox.classes()).toContain("checked");

      // Click again on choosed element must mark checkbox to unchecked state
      refChoosedElements = [];
      await wrapper.setProps({ refChoosedElements });
      expect(elementCheckbox.classes()).toContain("unchecked");
    }
  });
});
