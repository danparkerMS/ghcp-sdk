# GitHub Copilot SDK Examples

This repository demonstrates how to use the GitHub Copilot SDK with TypeScript. Follow this guide to set up your environment and explore the various examples included.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- A GitHub account with Copilot access

## Setup

### 1. Install GitHub Copilot CLI

First, install the GitHub Copilot CLI tool globally:

```bash
npm install -g @githubnext/github-copilot-cli
```

### 2. Authenticate with GitHub Copilot

Authenticate your CLI with GitHub:

```bash
github-copilot-cli auth login
```

This will open a browser window where you can authorize the CLI with your GitHub account.

### 3. Initialize the Project

Clone or create a new project directory and initialize it as an ES module:

```bash
npm init -y --init-type module
```

This command:
- Creates a `package.json` file with default values
- Automatically sets `"type": "module"` for ES module support

### 4. Install Dependencies

Install the GitHub Copilot SDK and TypeScript execution runtime:

```bash
npm install @github/copilot-sdk tsx
```

## Examples

This repository includes five TypeScript examples that demonstrate different aspects of the GitHub Copilot SDK:

### 1. Basic Usage (`math.ts`)

**What it demonstrates:** Simple question-answer interaction with Copilot

```bash
npx tsx math.ts
```

This example shows:
- Creating a basic Copilot client
- Starting a session with the GPT-4.1 model
- Sending a simple prompt and waiting for a complete response
- Proper cleanup of resources

**Key concepts:**
- `CopilotClient` initialization
- `sendAndWait()` for synchronous responses
- Resource cleanup with `client.stop()`

### 2. Streaming Response (`streaming.ts`)

**What it demonstrates:** Real-time streaming of Copilot responses

```bash
npx tsx streaming.ts
```

This example shows:
- Enabling streaming mode for real-time responses
- Event handling for response chunks
- Processing `assistant.message_delta` events
- Detecting when the session becomes idle

**Key concepts:**
- `streaming: true` configuration
- Event-driven response handling
- `SessionEvent` types
- Real-time output display

### 3. Tool Integration (`weather.ts`)

**What it demonstrates:** Creating and using custom tools that Copilot can call

```bash
npx tsx weather.ts
```

This example shows:
- Defining custom tools with `defineTool()`
- Tool parameter validation and description
- Simulating external API calls
- Interactive conversation with tool usage

**Key concepts:**
- Tool definition and registration
- Parameter schemas and validation
- Handler functions
- Tool-enhanced conversations

### 4. Interactive Assistant (`assistant.ts`)

**What it demonstrates:** Building a persistent chat interface

```bash
npx tsx assistant.ts
```

This example shows:
- Creating an interactive REPL (Read-Eval-Print Loop)
- Maintaining conversation context
- Handling user input and graceful exit
- Continuous streaming responses

**Key concepts:**
- `readline` interface integration
- Session persistence
- Context management
- User experience patterns

### 5. MCP Integration (`mcp.ts`)

**What it demonstrates:** Model Context Protocol (MCP) server integration

```bash
npx tsx mcp.ts
```

This example shows:
- Connecting to external MCP servers
- Accessing Microsoft Learn documentation
- Enhanced AI capabilities through external tools
- Error handling for MCP connections

**Key concepts:**
- MCP server configuration
- External tool integration
- Documentation access
- Advanced AI workflows

## Common Patterns

### Session Management

All examples follow this basic pattern:

```typescript
const client = new CopilotClient();
const session = await client.createSession(config);
// ... use session
await client.stop();
```

### Error Handling

Always wrap session operations in try-catch blocks:

```typescript
try {
    await session.sendAndWait({ prompt: input });
} catch (error) {
    console.error('Session error:', error);
}
```

### Streaming vs Synchronous

- Use `streaming: true` for real-time responses
- Use `sendAndWait()` for simple request-response patterns
- Handle `assistant.message_delta` events for streaming

## Troubleshooting

### Authentication Issues

If you encounter authentication errors:

1. Ensure you're logged in: `github-copilot-cli auth login`
2. Check your GitHub Copilot subscription status
3. Verify your CLI installation

### Module Resolution

If you get import errors:

1. Ensure `"type": "module"` is in your `package.json`
2. Use `.js` extensions in imports if needed
3. Check that all dependencies are installed

### Session Errors

If sessions fail to create:

1. Check your internet connection
2. Verify API quotas and limits
3. Try with a simpler configuration first

## Next Steps

- Explore the GitHub Copilot SDK documentation
- Experiment with different models and configurations
- Build your own tools and integrations
- Contribute examples back to the community

## Resources

- [GitHub Copilot SDK Documentation](https://github.com/github/copilot-sdk)
- [GitHub Copilot CLI](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

*Happy coding with GitHub Copilot! 🤖✨*
