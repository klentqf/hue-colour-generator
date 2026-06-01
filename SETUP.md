# hue — setup guide

## prerequisites

- node.js 18+ — download from https://nodejs.org
- postgresql database (or use a free cloud provider like Neon, Supabase, or Railway)
- openai api key — from https://platform.openai.com/api-keys

## steps

### 1. install node.js
download and install from https://nodejs.org (choose LTS version)
then restart your terminal.

### 2. install dependencies
```
npm install
```

### 3. set up environment variables
edit `.env.local` with your keys:

```
OPENAI_API_KEY=sk-your-key-here
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

**free database options:**
- neon.tech — free postgresql, very easy setup
- supabase.com — free tier with postgresql
- railway.app — free tier

### 4. set up the database
```
npm run db:generate
npm run db:push
```

### 5. run the app
```
npm run dev
```

open http://localhost:3000 in your browser.

## pages

- `/` — welcome page
- `/create` — enter your colours
- `/select-colours` — browse colour families
- `/preferences` — palette settings
- `/results` — generated palette
- `/palettes` — saved palettes

## notes

- all text is lowercase as requested
- the mascot appears on every page with contextual guidance
- colours can be locked before regenerating
- feedback loop refines the palette while preserving locked colours
- export formats: hex, css variables, tailwind, json, figma tokens
