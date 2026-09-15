# Nexus - Resume Tailor

Nexus is an application designed to help you manage job applications, tailor your resumes specifically for each job description using AI, and keep track of your progress on a Kanban board.

## Prerequisites

- Node.js (v18 or higher)
- npm (or yarn/pnpm)

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone git@github.com:viniciuscasarin/nexus.git
cd nexus
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup Environment Variables

Copy the `.env.example` file to create your local `.env` file:

```bash
cp .env.example .env
```

Open the `.env` file and fill in the necessary values:
- **Database**: The project uses SQLite locally. You can set the database URL to: `DATABASE_URL="file:./dev.db"`
- **AI Providers**: Fill in at least one API key for the AI provider you want to use (Gemini, OpenAI, or Anthropic) in order to generate tailored resumes.

### 4. Setup the Database

Since the project uses Prisma and SQLite, run the following command to initialize the database and create the schema:

```bash
npx prisma db push
```

### 5. Run the Development Server

Start the application in development mode:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Kanban Board**: Manage your job applications and move them through different stages (Interested, Applied, Interview, Offer, Rejected, Not Considered).
- **Job Analysis**: Analyze job descriptions and get tailored recommendations using top-tier AI models.
- **Tailored Resumes**: Generate resumes specifically optimized for a particular job application to increase your chances of success.
