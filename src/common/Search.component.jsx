import * as React from "react";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  return (
    <>
      {/* <input type="text" name="search" placeholder="Search.." /> */}
      <SearchOutlined
        style={{ fontSize: "24px", color: "#fff", cursor: "pointer" }}
      />
    </>
  );
};

export default Search;
