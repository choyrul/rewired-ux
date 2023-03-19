import Button from "./Button";

export const WiredButton = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <Button size="sm">Small</Button>
    <Button>Button</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const DisabledButton = () => <Button disabled>Button</Button>;

export const ElevateButton = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <Button elevation={1}>Button</Button>
    <Button elevation={2}>Button</Button>
    <Button elevation={3}>Button</Button>
    <Button elevation={4}>Button</Button>
    <Button elevation={5}>Button</Button>
  </div>
);
