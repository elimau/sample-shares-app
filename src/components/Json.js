import React from "react";

function Json(props) {
  const {json} = props
  return (
    <div>{JSON.stringify(json)}</div>
  );
}

export default Json;