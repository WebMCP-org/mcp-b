import { getBindings } from '@/utils/bindings';
import { createAnthropic } from '@ai-sdk/anthropic';
import { frontendTools } from '@assistant-ui/react-ai-sdk';
import { createServerFileRoute } from '@tanstack/react-start/server';
import { convertToModelMessages, stepCountIs, streamText } from 'ai';
import { z } from 'zod';

const PostRequestBodySchema = z.object({
  messages: z.array(z.any()),
  system: z.string().optional(),
  tools: z.any().optional(),
});

export const maxDuration = 30;

export const ServerRoute = createServerFileRoute('/api/chat').methods({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const parsedBody = PostRequestBodySchema.safeParse(body);
      if (!parsedBody.success) {
        const errors = parsedBody.error.flatten((issue: any) => ({
          message: issue.message,
          path: issue.path,
        }));
        return new Response(JSON.stringify({ error: 'Invalid request body', details: errors }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const { messages, system, tools } = parsedBody.data;
      const bindings = getBindings();
      const provider = createAnthropic({
        apiKey: bindings.ANTHROPIC_API_KEY,
        headers: {
          'x-model-provider': 'anthropic',
          'x-model-name': 'claude-sonnet-4-20250514',
          'x-api-key': bindings.ANTHROPIC_API_KEY,
        },
      });
      const result = streamText({
        model: provider('claude-sonnet-4-20250514'),
        system,
        messages: convertToModelMessages(messages),
        stopWhen: stepCountIs(100),
        tools: {
          ...frontendTools(tools),
        },
      });

      return result.toUIMessageStreamResponse({});
    } catch (error) {
      console.error('Chat API error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
});
