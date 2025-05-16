# Keep One App with UPC Scanner

This app allows users to create an account, sign in, and scan UPC barcodes that are saved to a Supabase database.

## Features

- User authentication (sign up and sign in)
- UPC barcode scanning
- Real-time database storage with Supabase

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a free Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project
3. Set up email authentication in the Authentication section
4. Create a new table called `upc_scans` with the following columns:
   - `id` (type: uuid, primary key, default: uuid_generate_v4())
   - `user_id` (type: uuid, foreign key to auth.users, not null)
   - `upc_code` (type: text, not null)
   - `scanned_at` (type: timestamp with time zone, not null)
   - `created_at` (type: timestamp with time zone, default: now())

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings > API.

### 4. Run the app

```bash
npm start
```

## Usage

1. Create an account or sign in to your existing account
2. Navigate to the UPC Scanner page
3. Allow camera access when prompted
4. Position a UPC barcode within the scanner frame
5. The app will automatically detect and save the UPC code to your Supabase database

## Technology Stack

- React
- TypeScript
- React Router
- Supabase for backend & authentication
- react-zxing for barcode scanning

## Project Structure

```
keep-one/
├── src/
│   ├── components/
│   │   ├── Home.tsx        # Home page with auth features
│   │   ├── SignIn.tsx      # Sign in component
│   │   └── UpcScanner.tsx  # UPC scanner component
│   ├── utils/
│   │   └── auth.ts         # Auth utility functions
│   ├── App.tsx             # Main app with routing
│   ├── supabaseClient.ts   # Supabase configuration
│   └── ...
├── package.json
└── README.md
```

## Technologies Used

- React 18
- TypeScript
- Styled Components
- Create React App 