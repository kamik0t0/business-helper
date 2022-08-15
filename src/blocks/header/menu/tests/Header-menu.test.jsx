import { render, screen } from "@testing-library/react";
import Menu from "../Header-menu.tsx/index";

test("try react tests", () => {
    render(<Menu />);
    const linkElem = screen.getByText(/'Главная'/i);
    expect(linkElem).toBeInTheDocument();
});
