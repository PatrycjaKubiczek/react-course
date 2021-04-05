import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Clock from "../../components/Clock";

var root = null;
var clockRenderer = null;

describe("<Clock/>", () => {
  describe("when given a minutes and seconds (DOM)", () => {
    beforeEach(() => {
      root = document.createElement("div");
      ReactDOM.render(<Clock minutes={10} seconds={20} />, root);
    });
    it("renders time properly", () => {
      expect(root.childNodes[0].textContent).toMatch(/10:20/);
    });
    it("renders an h3 element", () => {
      expect(root.childNodes[0].nodeName).toEqual("H3");
    });
    it("sets a Clock className an h3 element", () => {
      expect(root.childNodes[0].className).toMatch(/Clock/);
    });
  });

  describe("when given a minutes and seconds (TestRenderer)", () => {
    beforeEach(() => {
      clockRenderer = renderer.create(
        <Clock minutes={10} seconds={20} />
      );
    });
    it("renders properly", () => {
      expect(clockRenderer.toJSON().type).toMatchSnapshot();
    //   expect(clockRenderer.toJSON().type).toEqual("h3");
    //   expect(clockRenderer.toJSON().props).toMatchObject({"className": expect.stringMatching("Clock ")});
    //   expect(clockRenderer.toJSON().children).toEqual(expect.arrayContaining([10, 20]));
    });
    xit("renders an h3 element", () => {
      expect(root.childNodes[0].nodeName).toEqual("H3");
    });
    xit("sets a Clock className an h3 element", () => {
      expect(root.childNodes[0].className).toMatch(/Clock/);
    });
  });
  it("sets className to empty string if not given anything else", () => {
    expect(<Clock minutes={10} seconds={20} />).toEqual(
      <Clock className="" minutes={10} seconds={20} />
    );
  });
});


