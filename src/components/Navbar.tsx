import { Image, Navbar, Text } from "@nextui-org/react";

export const NavbarMain = () => {
  return (
    <Navbar isBordered variant="sticky" maxWidth="fluid">
      <Navbar.Brand>
        <Image src="img/icon.png" alt="icon" width={50} height={50} />
        <Text b color="inherit" hideIn="xs" h2 style={{ marginBottom: "0px" }}>
          Ethfrost
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link isActive color="inherit">
          Swap
        </Navbar.Link>
        <Navbar.Link isDisabled>Dashboard</Navbar.Link>
        <Navbar.Link isDisabled>Farm</Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
};
