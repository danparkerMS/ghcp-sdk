import { CopilotClient, SessionEvent } from "@github/copilot-sdk";
import * as readline from "readline";

const client = new CopilotClient();

try {
    console.log("🔧 Setting up MCP (Model Context Protocol) session...");
    
    const session = await client.createSession({
        model: "gpt-4.1",
        streaming: true,
        mcpServers: {
            // Microsoft Learn MCP Server - provides access to Microsoft documentation
            "microsoft-learn": {
                type: "http",
                url: "https://learn.microsoft.com/api/mcp",
                // No authentication required - it's a public endpoint
                tools: ["*"], // Enable all available tools
            },
        },
    });

    console.log("✅ MCP session created successfully!");

    // Set up event handling for streaming
    session.on((event: SessionEvent) => {
        if (event.type === "assistant.message_delta") {
            process.stdout.write(event.data.deltaContent);
        }
        if (event.type === "session.idle") {
            console.log("\n");
        }
    });

    // Set up readline interface for user input
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log("📚 Microsoft Learn Documentation Assistant (type 'exit' to quit)");
    console.log("   Ask questions about Microsoft technologies, Azure, .NET, etc.\n");

    const prompt = () => {
        rl.question("You: ", async (input) => {
            if (input.toLowerCase() === "exit") {
                console.log("👋 Goodbye!");
                await client.stop();
                rl.close();
                process.exit(0);
            }

            process.stdout.write("Assistant: ");
            try {
                await session.sendAndWait({ prompt: input });
            } catch (error) {
                console.log(`\n❌ Error: ${error}`);
            }
            console.log("\n");
            prompt();
        });
    };

    prompt();

} catch (error) {
    console.error("❌ Error setting up MCP session:", error);
    await client.stop();
    process.exit(1);
}
