MCP(模型上下文协议) 是一个开放协议，用于标准化应用程序向大语言模型提供上下文的方式。可以将 MCP 想象成 AI 应用程序的 USB-C 接口。就像 USB-C 为设备连接各种外设和配件提供了标准化方式一样，MCP 为 AI 模型连接不同的数据源和工具提供了标准化方式。

### Function Call
函数调用，可以提供一个用户定义的 JSON 字符串，其中包含希望从 OpenAI 得到的响应结构，以及希望向 OpenAI 提出的问题。
function call 帮我们做了两件事情：
- 判断是否要调用某个预定义的函数；
- 如果要调用，从用户输入的文本里提取出函数所需要的函数值。

首先我们定义一些function，如下所示，我只定义了一个查询天气的函数get_current_weather，我们需要对这个函数进行简单的描述，如“获取今天的天气”。
这个函数有两个参数，分别是地点location和时间time，也需要进行文本描述。
LLM 根据函数描述，参数描述以及用户的输入，来决定是不是要调用这个funciton。
```
func = {
    "name": "get_current_weather",
    "description": "获取今天的天气",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "获取天气情况的城市或者国家，比如北京、东京、新加坡"
            },
            "time": {
                "type": "string",
                "description": "时间信息"
            },

        },
        "required": ["location", "time"]
    }
}
```

functions参数是将要被弃用的一个参数，更加推荐使用tools参数。
通过调用 tools 就能使用自定义的工具。

### MCP
<img src="/img/llm-tools/mcp-structure.png" alt="mcp-structure" style="width: 90%; height: auto; display: block; margin: 0 auto;" />

MCP 的核心架构如上所示。
MCP 遵循客户端-服务器架构（client-server），其中包含以下几个核心概念：
- MCP 主机（MCP Hosts）：发起请求的 LLM 应用程序（例如 Claude Desktop、IDE 或 AI 工具）。
- MCP 客户端（MCP Clients）：在主机程序内部，与 MCP server 保持 1:1 的连接。
- MCP 服务器（MCP Servers）：为 MCP client 提供上下文、工具和 prompt 信息。
- 本地资源（Local Resources）：本地计算机中可供 MCP server 安全访问的资源（例如文件、数据库）。
- 远程资源（Remote Resources）：MCP server 可以连接到的远程资源（例如通过 API）。

#### MCP Client

MCP client 充当 LLM 和 MCP server 之间的桥梁，MCP client 的工作流程如下：
- MCP client 首先从 MCP server 获取可用的工具列表。
- 将用户的查询连同工具描述通过 function calling 一起发送给 LLM。
- LLM 决定是否需要使用工具以及使用哪些工具。
- 如果需要使用工具，MCP client 会通过 MCP server 执行相应的工具调用。
- 工具调用的结果会被发送回 LLM。
- LLM 基于所有信息生成自然语言响应。
- 最后将响应展示给用户。

#### MCP Server

MCP server 是 MCP 架构中的关键组件，它可以提供 3 种主要类型的功能：
- 资源（Resources）：类似文件的数据，可以被客户端读取，如 API 响应或文件内容。
- 工具（Tools）：可以被 LLM 调用的函数（需要用户批准）。
- 提示（Prompts）：预先编写的模板，帮助用户完成特定任务。
- 这些功能使 MCP server 能够为 AI 应用提供丰富的上下文信息和操作能力，从而增强 LLM 的实用性和灵活性。

你可以在 MCP Servers Repository 和 Awesome MCP Servers 这两个 repo 中找到许多由社区实现的 MCP server。
使用 TypeScript 编写的 MCP server 可以通过 npx 命令来运行，使用 Python 编写的 MCP server 可以通过 uvx 命令来运行。

#### 通信机制
MCP 协议支持两种主要的通信机制：基于标准输入输出的本地通信和基于 SSE（Server-Sent Events）的远程通信。

这两种机制都使用 JSON-RPC 2.0 格式进行消息传输，确保了通信的标准化和可扩展性。
- 本地通信：通过 stdio 传输数据，适用于在同一台机器上运行的客户端和服务器之间的通信。
- 远程通信：利用 SSE 与 HTTP 结合，实现跨网络的实时数据传输，适用于需要访问远程资源或分布式部署的场景。


### Reference
- 大模型工具调用(function call)原理及实现：https://zhuanlan.zhihu.com/p/663770472
- OpenAI -- 理解function calling：https://zhuanlan.zhihu.com/p/700925039
- MCP 用户指南：https://docs.anthropic.com/zh-CN/docs/agents-and-tools/mcp
- 一文看懂：MCP(大模型上下文协议)：https://zhuanlan.zhihu.com/p/27327515233
- Server-Sent Events 教程：https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html