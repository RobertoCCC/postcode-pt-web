# postcode-pt-web

Frontend for the [postcode-pt](https://github.com/RobertoCCC/postcode-pt) API — search Portuguese postal codes and browse districts/municipalities.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, and shadcn/ui. Deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The app fetches from `https://postcode-pt.onrender.com/v1`. Override with `NEXT_PUBLIC_API_BASE_URL` in `.env.local` to point at a local backend.
