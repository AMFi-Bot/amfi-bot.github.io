import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import DropdownComponent from "../DropdownChooseComponent.vue";
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
});

//   it("chooses elements", async () => {
//     // Mount element
//     const wrapper = mount(DropdownComponent, {
//       props: {
//         ...baseConfig,
//       },
//       global,
//     });

//     const dropdownList = wrapper.find(".dropdown_content");
//     const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

//     for (const key in dropdownContent) {
//       const renderedElement = dropdownElements[key];

//       console.log(renderedElement.classes());
//       console.log(renderedElement.text());
//       console.log(dropdownContent[key]);

//       await renderedElement.trigger("click");
//       expect(renderedElement.classes()).toContain("choosed");
//     }
//   });

//   it("check initial element config", async () => {
//     const initialElement = dropdownContent[5];

//     // Mount element
//     const wrapper = mount(DropdownComponent, {
//       props: {
//         ...baseConfig,
//         initChoosedElement: initialElement,
//       },
//       global,
//     });

//     const dropdownComponent = wrapper.find(".dropdown_elem");
//     const dropdownTitleElement = dropdownComponent.find(".dropdown_title");

//     // Check title property exists
//     expect(dropdownTitleElement.find(".title").text()).toEqual(
//       typeof initialElement === "string" ? initialElement : initialElement.name
//     );

//     const dropdownList = wrapper.find(".dropdown_content");
//     const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

//     let initialElementFound = false;

//     for (const renderedElement of dropdownElements) {
//       renderedElement.find(".name").text() ===
//         (typeof initialElement === "string"
//           ? initialElement
//           : initialElement.name) && (initialElementFound = true);
//     }

//     expect(initialElementFound).toEqual(true);
//   });

//   it("check use choosed element as title config property", async () => {
//     const initialElement = dropdownContent[5];

//     // Mount element
//     const wrapper = mount(DropdownComponent, {
//       props: {
//         ...baseConfig,
//         initChoosedElement: initialElement,
//       },
//       global,
//     });

//     const dropdownComponent = wrapper.find(".dropdown_elem");
//     const dropdownTitleElement = dropdownComponent.find(".dropdown_title");

//     // Check title property exists
//     expect(dropdownTitleElement.find(".title").text()).toEqual(
//       typeof initialElement === "string" ? initialElement : initialElement.name
//     );

//     const dropdownList = wrapper.find(".dropdown_content");
//     const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

//     for (const key in dropdownContent) {
//       const element = dropdownContent[key];
//       const renderedElement = dropdownElements[key];

//       await renderedElement.trigger("click");
//       expect(renderedElement.classes()).toContain("choosed");
//       expect(renderedElement.find(".name").text()).toContain(
//         typeof element === "string" ? element : element.name
//       );

//       expect(dropdownTitleElement.find(".title").text()).toContain(
//         typeof element === "string" ? element : element.name
//       );
//     }
//   });

//   it("chooses elements by ref property", async () => {
//     let refChoosedElement: ElementType | undefined = dropdownContent[2];

//     // Mount element
//     const wrapper = mount(DropdownComponent, {
//       props: {
//         ...baseConfig,
//         refChoosedElement,
//       },

//       global,
//     });

//     const dropdownList = wrapper.find(".dropdown_content");
//     const dropdownElements = dropdownList.findAll(".dropdown_content_elem");

//     {
//       const renderedElement = dropdownElements[2]; // Same index as refChoosedElement

//       expect(renderedElement.classes()).toContain("choosed");
//     }
//     refChoosedElement = undefined;
//     await wrapper.setProps({ refChoosedElement });

//     for (const key in dropdownContent) {
//       const element = dropdownContent[key];
//       const renderedElement = dropdownElements[key];

//       // Check element to unchoosed state
//       expect(renderedElement.classes()).not.toContain("choosed");

//       // Change refChoosedElement event must mark the related element to choosed state
//       refChoosedElement = element;
//       await wrapper.setProps({ refChoosedElement });
//       expect(renderedElement.classes()).toContain("choosed");

//       // Change refChoosedElement event to undefined must unmark element from choosed state
//       refChoosedElement = undefined;
//       await wrapper.setProps({ refChoosedElement });
//       expect(renderedElement.classes()).not.toContain("choosed");
//     }
//   });
// });
