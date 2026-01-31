import { google } from '@ai-sdk/google';
import {
    streamText,
    UIMessage,
    convertToModelMessages,
    tool,
    stepCountIs
} from 'ai';
import { z } from 'zod';
import { db } from '@/app/db/index';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const SYSTEM_PROMPT = `
You are an expert SQL assistant that helps users query their database using natural language.

You have access to the following tools:
1. schema tool – call this tool to get database schema
2. db tool – call this tool to execute SELECT queries

Rules:
- Generate ONLY SELECT queries (NO INSERT, UPDATE, DELETE, DROP)
- If user ask any question, show them the result by executing a SELECT query
- Always call the schema tool first to understand the database structure
- Dont send the query only, also execute it using the db tool and return the results
- Always use the schema provided by the schema tool
- Always execute SELECT queries using the db tool
- If the user asks for INSERT / UPDATE / DELETE:
  - Politely refuse execution


Guidelines:
- Explain the query and results in a simple way
- Teach the user how the query works
- Present results in a readable format
`;

    const result = await streamText({
        model: google('gemini-2.5-flash'), // ✅ valid model
        system: SYSTEM_PROMPT,
        messages: convertToModelMessages(messages),
        stopWhen: stepCountIs(5),

        tools: {

            schema: tool({
                description: 'Get database schema information',
                inputSchema: z.object({}),
                execute: async () => {
                    console.log('Providing schema information');

                    return {
                        result: `
TABLE: product
--------------------------------
id           INT (PK)
name         VARCHAR(255)
category     VARCHAR(255)
price        DECIMAL(10,2)
stock        INT
created_at   DATETIME (DEFAULT CURRENT_TIMESTAMP)

TABLE: sales
--------------------------------
id             INT (PK)
product_id     INT (FK → product.id)
quantity       INT
total_amount   DECIMAL(10,2)
sale_date      DATETIME (DEFAULT CURRENT_TIMESTAMP)
customer_name  VARCHAR(255)
region         VARCHAR(255)
`,
                    };
                },
            }),

            db: tool({
                description: 'Execute a SELECT SQL query on the database',
                inputSchema: z.object({
                    query: z.string().describe('A valid SELECT SQL query'),
                }),
                execute: async ({ query }) => {
                    console.log('Executing SQL:', query);

                    // Drizzle MySQL raw query execution
                    const result = await db.execute(query);
                    return result;
                },
            }),


        },
    });

    return result.toUIMessageStreamResponse();
}
