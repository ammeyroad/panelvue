import Cleave from "cleave.js";

/**
 * We add a new instance of Cleave when the element
 * is bound and destroy it when it's unbound.
 */
const cleave = {
  name: "cleave",
  bind(el, binding) {
    const input = el.querySelector("input");
    input._vCleave = new Cleave(input, binding.value);
  },
  unbind(el) {
    const input = el.querySelector("input");
    input._vCleave.destroy();
  },
};

export const numeral = {
  numeral: true,
  numeralThousandsGroupStype: "thousand",
  numeralDecimalMark: ",",
  delimiter: ".",
};

export default cleave;
