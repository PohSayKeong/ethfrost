import { Loading } from "@nextui-org/react";

export const Loader = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: "3rem",
    }}
  >
    <Loading size="xl" style={{ margin: "auto" }} />
  </div>
);
