# Psychologists Services

A modern web application for finding and booking appointments with professional psychologists. The platform allows users to browse profiles, filter specialists, save favorites, and book consultations.

## 🚀 Features

- **Authentication**: Secure Sign Up, Log In, and Log Out functionality using Firebase Authentication.
- **Psychologists Catalog**: Browse a list of psychologists with details including avatar, name, rating, price, and specialization.
- **Filtering**: Filter psychologists by:
    - Alphabetical order (A-Z, Z-A)
    - Price (Low to High, High to Low)
    - Popularity (Rating)
- **Favorites**: Authenticated users can add psychologists to their "Favorites" list. This data is persisted.
- **Appointment Booking**: A modal form to book an appointment, featuring:
    - Validation (Name, Email, Phone, Comment).
    - Custom Time Picker.
    - Success notifications (Toasts).
- **Responsive Design**: Fully responsive layout optimized for Desktop, Tablet, and Mobile devices.
- **Theme Switcher**: Built-in theme customization with 4 modes:
    - **Green** (Default)
    - **Blue**
    - **Orange**
    - **Dark Mode** (optimized for low-light environments)

## 🛠 Tech Stack

- **Frontend**: React (v19), TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM (v6)
- **Styling**: CSS Modules, `clsx` for conditional class names, `modern-normalize`
- **Forms & Validation**: `react-hook-form`, `yup`, `@hookform/resolvers`
- **Backend / Database**: Firebase Realtime Database, Firebase Authentication
- **UI Patterns**: **Barrel Pattern** (index.ts imports), Custom Hooks, Portal (for Modals)
- **Icons & Toast**: `react-icons`, `react-hot-toast`

## 📂 Project Structure

The project follows a modular structure for scalability and maintainability:

```
src/
├── components/         # Reusable UI components (Buttons, Modals, Cards)
│   ├── AppointmentForm/ # Booking form logic & styles
│   ├── Header/          # Navigation & Auth triggers
│   ├── PsychologistCard/# Card displaying doctor info
│   ├── ThemeSwitcher/   # Theme toggling logic
│   └── index.ts         # Barrel file for clean imports
├── pages/              # Page components
│   ├── HomePage/
│   ├── PsychologistsPage/
│   └── FavoritesPage/
├── hooks/              # Custom React Hooks
│   ├── useAuth.ts       # Firebase Auth logic
│   ├── useFavorites.ts  # Logic for handling favorites
│   ├── useModal.ts      # Reusable modal state management
│   └── useFormHelpers.ts# Shared form helpers (reset, toast)
├── firebase/           # Firebase configuration
├── styles/             # Global styles (variables, fonts)
├── types/              # TypeScript interfaces
└── App.tsx             # Main application component with Routes
```

## 💡 Key Implementation Details

### Barrel Pattern

We utilize the **Barrel Pattern** throughout the `src/components` directory. Each component folder contains an `index.ts` file that re-exports the component. This allows for cleaner and more readable imports:

```typescript
// Instead of:
import Header from "../components/Header/Header";

// We use:
import { Header, Modal, Loader } from "../components";
```

### Custom Hooks

Business logic is extracted into custom hooks to keep components clean:

- `useAuth`: Manages user session state and provides `signIn`, `signUp`, `logOut` methods.
- `useModal`: standardized `isOpen`, `open`, `close` logic for all modals.
- `usePsychologistFilter`: Encapsulates complex filtering and sorting logic for the catalog.

## 📦 Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/psychologists-services.git
    cd psychologists-services
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Firebase**
    Create a `.env` file in the root directory and add your Firebase config keys:

    ```env
    VITE_API_KEY=your_api_key
    VITE_AUTH_DOMAIN=your_auth_domain
    VITE_DATABASE_URL=your_database_url
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_APP_ID=your_app_id
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

5.  **Build for production**
    ```bash
    npm run build
    ```
