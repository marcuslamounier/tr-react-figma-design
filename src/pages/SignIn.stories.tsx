import { Meta, StoryObj } from "@storybook/react";
import {
  userEvent,
  waitFor,
  within,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { SignIn } from "./Signin";
import { rest } from "msw";

export default {
  title: "Pages/Sign in",
  component: SignIn,
  args: {},
  argTypes: {},
  parameters: {
    msw: {
      handlers: [
        rest.post("/sessions", (req, res, ctx) => {
          return res(
            ctx.json({ message: "Successfully logged in" })
          );
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.type(
      canvas.getByPlaceholderText("Type your email address"),
      "test@test.com"
    );
    userEvent.type(
      canvas.getByPlaceholderText("******"),
      "12345678"
    );

    userEvent.click(canvas.getByRole("button"));

    await waitFor(() => {
      return expect(
        canvas.getByText("Successfully logged in!")
      ).toBeInTheDocument();
    });
  },
};
