import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginButton from "../LoginButton";
import { vi } from "vitest";
import { signIn } from "next-auth/react";


vi.mock("next-auth/react", ()=>({
    signIn: vi.fn(),
}));    

describe('LoginButton component', ()=>{
    it('Render Button with correct text',()=>{
        render(<LoginButton/>);
        expect(screen.getByRole("button")).toHaveTextContent("Sign in with Google");
    })

    it("Calls signIn when clicked", async ()=>{
        render(<LoginButton/>);
        const user = userEvent.setup();
        await user.click(screen.getByRole("button"));
        expect(signIn).toHaveBeenCalledWith("google");;
    })
})