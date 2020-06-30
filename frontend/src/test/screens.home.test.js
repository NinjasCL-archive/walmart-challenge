import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HomeScreen from "../screens/home";

configure({ adapter: new Adapter() });

describe("Home Screen", () => {
  it("should render nav, search and products", () => {
    const page = mount(<HomeScreen.Controller />);
    expect(page.find(HomeScreen.View.Components.NavBar)).toHaveLength(1);
    expect(page.find(HomeScreen.View.Components.SearchBar)).toHaveLength(1);
    expect(page.find(HomeScreen.View.Components.Products)).toHaveLength(1);
  });
});
