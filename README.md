## Project Overview

The Language Learning App will help users learn new languages by providing translations and flashcards. Initially, I will focus on the Word and Phrase Translation feature, with plans to expand to other features in future iterations.

### Live: `https://language-learning-app-ccjt.onrender.com`

#### Features
- User Authentication
- User sessions managed via Supabase.

**Translation**

Translate words and phrases to multiple supported languages.
Utilize a dropdown menu to select the target language.
Save translations as flashcards for later review.

**Flashcards**

View saved translations as flashcards.
Interactive flashcard interface with words on one side and translations on the other.

**Responsive Design**

Fully responsive and works seamlessly across devices.

### Tech Stack

**Front-End:** React

**Database:** Supabase (psql)

**Testing Framework:** Jest

**API:** Google Translate API via RapidAPI.

## Getting Started
- Prerequisites
- Node.js (v14 or higher)
- NPM (v6 or higher)

## Setup
Clone the repository: `git clone repo`

Install dependencies: `npm install`

Create a .env file in the project root:

REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
REACT_APP_GOOGLE_TRANSLATE_URL=your_google_translate_api_url
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
REACT_APP_RAPIDAPI_HOST=your_rapidapi_host

Start the development server:

`npm start`

`npm start`: Run the app in development mode.
`npm test`: Run unit tests.
`npm run build`: Build the app for production.