# Development Guide - Enrut Bus Driver App

Welcome to the Enrut Bus Driver App project! This document serves as a guide for setting up the development environment, understanding the contribution workflow, and building out the core functionality of the application.

**Project Goal:** To create a React Native application that tracks bus positions and estimated arrival times in real-time for both bus drivers and passengers.

**Current State (IMPORTANT):** This project was initialized from a UI template. It primarily contains React Native components for views (`screens/`), basic styling (`constants/styles.js`), assets (`assets/`), and potentially some navigation setup (`@react-navigation/stack`). It **currently lacks** essential application logic, including state management, API integration, real-time data handling, business logic, and tests. The primary task for developers is to build this core logic.

## 1. Getting Started

### Prerequisites

Ensure you have the following software installed on your development machine:

*   **Node.js:** LTS version recommended (e.g., v18 or later). Check with `node -v`.
*   **Yarn:** The project uses `yarn` (presence of `yarn.lock`). Check with `yarn -v`. Install via `npm install --global yarn` if needed.
*   **Watchman:** (Recommended for macOS/Linux for performance) Follow installation instructions at [https://facebook.github.io/watchman/](https://facebook.github.io/watchman/).
*   **Expo CLI:** `npm install --global expo-cli` or `yarn global add expo-cli`.
*   **iOS Development:**
    *   macOS required.
    *   Xcode: Install from the Mac App Store.
    *   Xcode Command Line Tools: Open Xcode > Preferences > Locations > Command Line Tools.
    *   CocoaPods: (Usually managed by Expo Prebuild, but good to have) `sudo gem install cocoapods`.
*   **Android Development:**
    *   Android Studio: Download and install from [https://developer.android.com/studio](https://developer.android.com/studio).
    *   Android SDK: Set up SDK Platforms (latest stable recommended) and SDK Tools (Android SDK Build-Tools, Android Emulator, Android SDK Platform-Tools, Google Play services).
    *   Emulator/Device: Set up an Android Virtual Device (AVD) via Android Studio or use a physical device with USB debugging enabled.

### Cloning the Repository

```bash
git clone <repository-url>
cd enrut-bus-driver-app
```

### Installation

Install project dependencies:

```bash
yarn install
```

Since this is an Expo managed project, `pod install` is typically handled automatically when building for iOS or via `npx expo prebuild` if you need to generate the native directories.

### Environment Setup (Future Needs)

As we integrate with a backend, we will need to manage environment variables (API keys, base URLs, etc.) securely. We recommend using `react-native-dotenv`.

1.  **Install:**
    ```bash
    yarn add --dev react-native-dotenv
    ```
2.  **Configure Babel:** Add the plugin to your `babel.config.js`:
    ```javascript
    module.exports = function(api) {
      api.cache(true);
      return {
        presets: ['babel-preset-expo'],
        plugins: [ // Add this plugins array
          ['module:react-native-dotenv', {
            moduleName: '@env',
            path: '.env',
            blacklist: null,
            whitelist: null,
            safe: false,
            allowUndefined: true
          }]
        ]
      };
    };
    ```
3.  **Create `.env` file:** Create a `.env` file in the project root. **Add `.env` to your `.gitignore` file immediately!**
4.  **Add Placeholder Variables:** Populate `.env` with necessary variables as backend development progresses. Example:
    ```env
    # .env - DO NOT COMMIT THIS FILE
    API_BASE_URL=http://your-dev-api.com/api
    WEBSOCKET_URL=ws://your-dev-ws.com
    GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
    ```
5.  **Usage:** Access variables in your code like this:
    ```javascript
    import { API_BASE_URL, WEBSOCKET_URL } from '@env';

    console.log(API_BASE_URL);
    ```

### Running the App

This project uses Expo.

*   **Start the Metro Bundler:**
    ```bash
    yarn start
    ```
*   **Run on iOS Simulator:** Press `i` in the terminal where Metro is running.
*   **Run on Android Emulator/Device:** Press `a` in the terminal where Metro is running. (Ensure an emulator is running or a device is connected and authorized).
*   **Run on Physical Device:** Install the "Expo Go" app on your iOS or Android device and scan the QR code shown in the terminal.

### Running Storybook (If Applicable)

Storybook does not appear to be set up currently (no `.storybook` directory or related dependencies found in `package.json`). If added later, instructions will be placed here.

## 2. Contribution Workflow & Adding Core Logic

### Branching Strategy

We will use a simple **GitHub Flow**:

1.  `main` branch is always deployable.
2.  Create feature branches from `main` (e.g., `feature/add-login-logic`, `fix/map-marker-bug`).
3.  Push feature branches to the remote repository.
4.  Open a Pull Request (PR) to merge the feature branch into `main`.
5.  Code review happens on the PR.
6.  Once approved and CI checks pass, merge the PR into `main`.

### Code Style & Linting

Currently, `ESLint` and `Prettier` are not explicitly listed in `devDependencies`. It is **highly recommended** to add them:

1.  **Install:**
    ```bash
    yarn add --dev eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks @react-native-community/eslint-config
    ```
2.  **Configure:** Create `.eslintrc.js` and `.prettierrc.js` configuration files. A basic setup can extend recommended rules:
    *   `.eslintrc.js`:
        ```javascript
        module.exports = {
          root: true,
          extends: ['@react-native-community', 'plugin:prettier/recommended'],
          rules: {
            // Add specific rule overrides here if needed
            'prettier/prettier': ['error', { endOfLine: 'auto' }], // Example for Windows line endings
          },
        };
        ```
    *   `.prettierrc.js`:
        ```javascript
        module.exports = {
          arrowParens: 'avoid',
          bracketSameLine: true,
          bracketSpacing: true,
          singleQuote: true,
          trailingComma: 'all',
          endOfLine: 'auto', // Or 'lf'/'crlf' based on team preference
        };
        ```
3.  **Add Scripts to `package.json`:**
    ```json
    "scripts": {
      // ... existing scripts
      "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
      "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md}\""
    },
    ```
4.  **Run:**
    *   `yarn lint`
    *   `yarn format`

Configure your editor to use ESLint and Prettier for auto-formatting on save.

### Developing New Features (Focus on Adding Logic)

#### State Management

*   **Need:** To manage application-wide state (user authentication, bus locations, route data, settings) consistently and avoid prop drilling.
*   **Recommendation:** **Zustand** or **Redux Toolkit**.
    *   **Zustand:** Simpler, less boilerplate, based on hooks. Good for smaller to medium complexity or if you prefer a lighter solution.
    *   **Redux Toolkit:** More structured, excellent DevTools, industry standard for complex state. Recommended for potentially large-scale applications with complex state interactions.
*   **Setup (Conceptual - Example using Zustand):**
    1.  Install: `yarn add zustand`
    2.  Create a store: `src/store/busStore.js`
        ```javascript
        import { create } from 'zustand';

        const useBusStore = create((set) => ({
          buses: [], // Array to hold bus data { id, location, routeId, ... }
          selectedBus: null,
          isLoading: false,
          error: null,
          fetchBuses: async () => {
            set({ isLoading: true, error: null });
            try {
              // Replace with actual API call using your chosen library
              // const response = await api.get('/buses');
              // set({ buses: response.data, isLoading: false });
              // Mock data for now:
              await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
              set({ buses: [{ id: 1, location: { latitude: 0, longitude: 0 }, routeId: 'A' }], isLoading: false });
            } catch (err) {
              set({ error: 'Failed to fetch buses', isLoading: false });
            }
          },
          setSelectedBus: (bus) => set({ selectedBus: bus }),
          updateBusLocation: (busId, newLocation) => set((state) => ({
            buses: state.buses.map(bus =>
              bus.id === busId ? { ...bus, location: newLocation } : bus
            ),
          })),
        }));

        export default useBusStore;
        ```
    3.  Use in components:
        ```javascript
        import React from 'react';
        import { View, Text, Button } from 'react-native';
        import useBusStore from '../store/busStore'; // Adjust path

        const BusListScreen = () => {
          const { buses, isLoading, fetchBuses } = useBusStore();

          React.useEffect(() => {
            fetchBuses();
          }, [fetchBuses]);

          if (isLoading) return <Text>Loading...</Text>;

          return (
            <View>
              {buses.map(bus => <Text key={bus.id}>Bus {bus.id} on Route {bus.routeId}</Text>)}
              <Button title="Refresh Buses" onPress={fetchBuses} />
            </View>
          );
        };

        export default BusListScreen;
        ```

#### API Integration

*   **Need:** To communicate with the backend API for fetching data (routes, schedules, bus locations) and sending data (driver status, location updates, issue reports).
*   **Recommendation:** **Axios**. It's promise-based, works in Node.js and browsers (and React Native), and has features like request/response interception. `fetch` is built-in but requires more manual handling for things like JSON parsing and error handling.
*   **Structure:** Create a dedicated services layer.
    *   `src/services/api.js`: Configure Axios instance.
        ```javascript
        import axios from 'axios';
        import { API_BASE_URL } from '@env'; // From react-native-dotenv

        const apiClient = axios.create({
          baseURL: API_BASE_URL,
          timeout: 10000, // 10 seconds
          headers: {
            'Content-Type': 'application/json',
            // Authorization header can be added here or via interceptors later
          },
        });

        // Optional: Interceptors for adding auth tokens, handling errors globally
        apiClient.interceptors.request.use(config => {
          // const token = /* get token from state or storage */;
          // if (token) {
          //   config.headers.Authorization = `Bearer ${token}`;
          // }
          return config;
        });

        apiClient.interceptors.response.use(
          response => response,
          error => {
            // Handle errors globally (e.g., log, show message, redirect on 401)
            console.error('API Error:', error.response?.data || error.message);
            return Promise.reject(error);
          }
        );

        export default apiClient;
        ```
    *   `src/services/busService.js`: Define functions for specific endpoints.
        ```javascript
        import apiClient from './api';

        export const getBuses = () => {
          return apiClient.get('/buses'); // Returns the Axios promise
        };

        export const getBusDetails = (id) => {
          return apiClient.get(`/buses/${id}`);
        };

        export const updateDriverLocation = (locationData) => {
          return apiClient.post('/driver/location', locationData);
        };
        ```
*   **Usage:** Call these service functions within your state management logic (e.g., inside Zustand actions or Redux thunks).

#### Connecting Views to Logic

Use hooks provided by your state management library or custom hooks to access state and dispatch actions/update state from your existing view components.

*   **Zustand Example:** (See `BusListScreen` example under State Management). You select parts of the state (`buses`, `isLoading`) and actions (`fetchBuses`) directly from the store hook.
*   **Redux Toolkit Example (Conceptual):**
    ```javascript
    import React from 'react';
    import { View, Text, Button } from 'react-native';
    import { useSelector, useDispatch } from 'react-redux';
    import { fetchBusesAsync, selectAllBuses, selectBusLoadingStatus } from '../store/busSlice'; // Adjust path

    const BusListScreen = () => {
      const dispatch = useDispatch();
      const buses = useSelector(selectAllBuses);
      const isLoading = useSelector(selectBusLoadingStatus);

      React.useEffect(() => {
        dispatch(fetchBusesAsync());
      }, [dispatch]);

      // ... render logic similar to Zustand example
    };
    ```

#### Real-time Data Handling

*   **Need:** To receive live updates for bus positions without constant manual refreshing.
*   **Approach:** **WebSockets** are generally preferred for true real-time, bi-directional communication. Server-Sent Events (SSE) are simpler for server-to-client streaming if bi-directional isn't needed. Frequent polling is a fallback but less efficient.
*   **Recommendation:** Use **WebSockets**.
*   **Library:** `socket.io-client` is a popular choice if the backend uses Socket.IO. If using plain WebSockets, the built-in `WebSocket` API can be used, potentially wrapped in a custom hook or service.
*   **Structure:**
    *   Initialize the WebSocket connection in a central place, perhaps when the app loads or a user logs in. A dedicated service (`src/services/socketService.js`) or a hook could manage the connection lifecycle and event handling.
    *   Listen for specific events (e.g., `bus_location_update`).
    *   When an event is received, update the application state using your state management library's actions/reducers (e.g., `useBusStore.getState().updateBusLocation(...)`).

#### Component Structure

*   **Current:** The structure seems to be primarily screen-based (`screens/auth`, `screens/home`, etc.) with very few shared components (`components/loadingScreen.js`).
*   **Integration:**
    *   Identify reusable UI elements within the `screens` folders and extract them into the `components` directory.
    *   Create container components (or utilize hooks directly in screens) that fetch data and manage state, passing necessary data and callbacks down to the presentational components (which might be the existing template components).
    *   Introduce custom hooks (`src/hooks`) for encapsulating reusable logic (e.g., `useLocationTracking`, `useApi`).

#### Folder Structure

Based on the current structure and future needs, here's a recommended structure within `src` (you might need to create the `src` folder and move existing content like `screens`, `components`, `constants`, `assets` into it):

```
src/
├── assets/         # Images, fonts, etc.
├── components/     # Shared, reusable UI components (presentational)
├── constants/      # Global constants, styles, themes (keep styles.js here or move to theme/)
├── hooks/          # Custom React hooks for reusable logic
├── navigation/     # Navigation stack, tab, drawer configurations
├── screens/        # Screen components (containers that orchestrate views and logic)
├── services/       # API client setup, specific API call functions, WebSocket service
├── store/          # State management configuration (e.g., Zustand stores or Redux slices/reducers)
├── types/          # TypeScript type definitions (if using TS)
├── utils/          # Utility functions (formatting, validation, etc.)
└── App.js          # App root component (often moved inside src)
.env                # (Root level) Environment variables - DO NOT COMMIT
.env.example        # (Root level) Example environment variables
babel.config.js     # (Root level)
package.json        # (Root level)
yarn.lock           # (Root level)
# ... other config files
```

#### Commit Messages

Use **Conventional Commits** format: `type(scope): description`. Examples:

*   `feat(auth): implement login screen logic`
*   `fix(map): correct marker positioning on android`
*   `refactor(store): switch from Context API to Zustand for bus state`
*   `docs(readme): update setup instructions`
*   `chore(deps): upgrade react-navigation libraries`

#### Testing Requirements

*   **Need:** To ensure reliability and prevent regressions as logic is added.
*   **Frameworks:** **Jest** (comes with React Native) and **React Native Testing Library** (`@testing-library/react-native`).
*   **Install:**
    ```bash
    yarn add --dev @testing-library/react-native @testing-library/jest-native jest
    # Configure Jest setup according to React Native/Expo docs if needed
    ```
*   **Expectations:**
    *   **Unit Tests:** For utility functions (`src/utils`), state logic (reducers/actions/store logic), custom hooks (`src/hooks`), service functions (can mock API client).
    *   **Integration Tests (Component Tests):** Use RNTL to test component rendering, user interactions, and integration with state/props within individual screens or components.

#### Pull Request (PR) Process

1.  Ensure your feature branch is up-to-date with `main` (`git pull origin main`).
2.  Push your completed feature branch (`git push origin feature/your-feature`).
3.  Create a Pull Request on GitHub/GitLab/etc., targeting the `main` branch.
4.  Write a clear description: What does the PR do? Why? How was it tested? Link relevant issues (e.g., `Closes #123`).
5.  Request reviews from team members.
6.  Address feedback and push changes to the same branch.
7.  Once approved and automated checks (linting, testing - if CI is set up) pass, merge the PR.

## 3. Building and Improving the Application

### Defining the Architecture

*   **Client-Side Architecture:** A component-based architecture leveraging React Native, with:
    *   **State Management:** Centralized state (Zustand or Redux Toolkit) managing bus data, user state, UI state.
    *   **Services Layer:** Encapsulating API communication (`axios`) and real-time updates (`socket.io-client` or `WebSocket`).
    *   **Navigation:** Using `@react-navigation/stack` (already installed) for screen transitions. Potentially add `@react-navigation/bottom-tabs` or `@react-navigation/drawer` later.
    *   **Component Model:** Separating container logic (fetching data, interacting with state/services) from presentational components (rendering UI based on props). Custom hooks bridge this gap effectively.

### Implementing Core Features (Roadmap - Initial Ideas)

1.  **Authentication:** Implement login/signup screens (if required for drivers). Connect to backend auth endpoints. Store auth tokens securely (e.g., `expo-secure-store`). Manage auth state globally.
2.  **Fetch Initial Data:** Fetch list of routes, buses associated with the driver (if applicable) upon login/app start.
3.  **Map Display:** Integrate `react-native-maps` (already installed). Display user's current location and bus locations as markers.
4.  **Real-time Updates:** Establish WebSocket connection. Update bus locations on the map in real-time based on server events.
5.  **Route Display:** Show selected bus route path on the map (`MapView.Polyline` using data from API). Use `react-native-maps-directions` (already installed) if direct route plotting between points is needed.
6.  **Driver Actions:** Implement UI/logic for drivers to start/end trips, report issues (`screens/startTrip`, `screens/endTrip`, `screens/busIssues`). Send relevant updates to the backend.
7.  **ETA Calculation:** Display ETAs (likely calculated by the backend, but may involve some client-side display logic).

### Map Integration (`react-native-maps`)

*   **Setup:** Requires API keys (especially Google Maps on Android). Add your `GOOGLE_MAPS_API_KEY` to `.env` and configure it in `app.json` or native project files as per `react-native-maps` documentation for Expo/bare RN.
*   **Common Patterns:**
    *   Use `<MapView>` component.
    *   Set `initialRegion` or use `provider={PROVIDER_GOOGLE}`.
    *   Show user location with `showsUserLocation={true}`.
    *   Render bus markers using `<Marker>` within `<MapView>`, iterating over bus data from the state store. Update marker coordinates when state changes.
    *   Display routes using `<Polyline>` with coordinates fetched from the API.

### Performance Considerations

*   **Efficient Rendering:** Use `React.memo` for components that re-render unnecessarily. Optimize list rendering (`FlatList` instead of `map`).
*   **State Updates:** Avoid updating state too frequently, especially during real-time updates. Batch updates if possible. Select only necessary state slices in components to minimize re-renders.
*   **Map Performance:** Limit the number of markers/polylines rendered simultaneously if performance degrades. Consider clustering markers (`react-native-map-clustering`). Debounce or throttle location updates sent *to* the server.
*   **Background Processing:** For driver location tracking, investigate background location libraries (e.g., `expo-location`'s background capabilities) but be mindful of battery usage and platform restrictions.

### Offline Support (Optional but Recommended)

*   **Strategy:** Cache essential data (routes, last known bus locations) using `AsyncStorage` or a more robust solution like WatermelonDB/Realm if complex offline capabilities are needed.
*   **Implementation:** Store fetched data locally. Display cached data when offline. Implement logic to sync changes when connectivity returns.

### Testing Strategy

*   **Goal:** Build confidence in the application's logic as it grows.
*   **Unit Tests:** Cover all utility functions, state logic (reducers/actions/selectors), and non-trivial custom hooks. Aim for high coverage here.
*   **Integration Tests (RNTL):** Test screen components interacting with the state store (mocked services). Verify user flows (e.g., login process, selecting a bus, seeing updates).
*   **End-to-End (E2E) Tests:** (Optional, heavier setup) Use frameworks like Detox or Maestro to test full user flows across the app interacting with a staging backend.

### Accessibility (A11y)

*   Use semantic elements (`<Text>`, `<View>`, etc.).
*   Add `accessibilityLabel`, `accessibilityHint`, `accessibilityRole` props where needed, especially for interactive elements and icons without text.
*   Test with screen readers (VoiceOver on iOS, TalkBack on Android).

### Type Safety

*   **Recommendation:** **Use TypeScript.** If the project is not already using it (currently seems to be JavaScript based on file extensions), consider migrating or starting new logic files in TypeScript (`.ts`/`.tsx`).
*   **Benefits:** Catch errors at build time, improve code completion and refactoring, self-documenting code.
*   **Setup:** `yarn add --dev typescript @types/react @types/react-native @types/jest` and create a `tsconfig.json`. Expo provides guidance on adding TypeScript.
*   **Alternative (if not using TS):** Use `PropTypes` (`yarn add prop-types`) for basic type checking on component props.
