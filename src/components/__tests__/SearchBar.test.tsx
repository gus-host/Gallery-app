import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../SearchBar";
import { vi } from "vitest";

const setQueryMock = vi.fn();

vi.mock("@/store/useImageStore",()=>({
    useImageStore: () => ({
        query: "",
        setQuery: setQueryMock,
    })
}));

describe("SearchBar Component",()=>{
    it("Render SearchBar component", ()=>{
        render(<SearchBar/>);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    })

    it("Calls setQuery with the input value when is clicked the search button", async ()=>{
        render(<SearchBar />);
        const user = userEvent.setup();
        const input = screen.getByPlaceholderText("Type a keyword");
        await user.type(input,"wolves");
        const button = screen.getByRole("button");
        await user.click(button);  
        expect(setQueryMock).toHaveBeenCalledWith("wolves");
    })
})