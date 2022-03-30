import { render, screen } from "@testing-library/react";
import Tab from "../Tab.jsx";

test("try react tests", () => {
    render(<Menu />);
    const linkElem = screen.getByText(/'Главная'/i);
    expect(linkElem).toBeInTheDocument();
});
