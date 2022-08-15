import { render, screen } from "@testing-library/react";
import Tab from "../Tab";

test("try react tests", () => {
    render(<Menu />);
    const linkElem = screen.getByText(/'Главная'/i);
    expect(linkElem).toBeInTheDocument();
});
