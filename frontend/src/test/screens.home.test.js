import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HomeScreen from "../screens/home";
import SearchBar from "../screens/home/components/searchbar";

import axios from "axios";

jest.mock("axios");
configure({ adapter: new Adapter() });

describe("Home Screen", () => {
  it("should render search bar", () => {
    const page = shallow(<HomeScreen.Controller />);

    expect(page.find(".searchbar").find(SearchBar)).toHaveLength(1);
  });
});
