import React from "react";

export const UserUpdateImpl = () => {
  const userId = window.location.pathname.split("/")[2];
  return <div>{userId}</div>;
};
