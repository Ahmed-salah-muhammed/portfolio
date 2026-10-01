import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';

function devChatApiPlugin() {
  return {
    name: 'dev-chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        if (req.method !== 'POST') return next();

        let raw = '';
        req.on('data', (chunk) => {
          raw += chunk;
        });
        req.on('end', async () => {
          try {
            const env = loadEnv('', process.cwd(), '');
            Object.assign(process.env, env);

            req.body = JSON.parse(raw || '{}');
            const { default: handler } = await import('./api/chat.js');
            const mockRes = {
              status(code) {
                res.statusCode = code;
                return this;
              },
              json(data) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              },
            };
            await handler(req, mockRes);
          } catch (err) {
            console.error('Local /api/chat error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

// `__dirname` does not exist in an ESM config, and `new URL().pathname` yields
// a broken `/E:/...` path on Windows — fileURLToPath is the portable form.
export default defineConfig({
  plugins: [react(), devChatApiPlugin()],
  resolve: {
    alias: {
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
