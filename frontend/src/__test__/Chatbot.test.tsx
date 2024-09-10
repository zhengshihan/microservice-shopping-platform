import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Chatbot from "../components/Chatbot"; // Adjust the import path as needed

// Mock fetch globally
beforeEach(() => {
  jest.clearAllMocks(); // Clear previous mocks
  // Mocking fetch with a proper Response object
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(
      new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: "Hello! How can I help you today?",
                  },
                ],
              },
            },
          ],
        }),
        {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" },
        }
      )
    )
  );
});

describe("Chatbot component", () => {
  it("renders chatbot and sends a message", async () => {
    // Render Chatbot component
    render(<Chatbot />);

    // Check if the title is rendered
    expect(screen.getByText("Chatbot")).toBeInTheDocument();

    // Input a message
    const input = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(input, { target: { value: "Hello" } });

    // Click the send button
    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);

    // Wait for the bot's response
    const botMessage = await screen.findByText(
      /Hello! How can I help you today\?/,
      { exact: false }
    );
    expect(botMessage).toBeInTheDocument();

    // Ensure fetch was called once
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
