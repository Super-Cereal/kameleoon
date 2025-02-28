# Kameleoon interview task

Task: https://development.kameleoon.net/oivanov/frontend-interview-task

### How to work

Clone a repository

```bash
git clone https://github.com/Super-Cereal/kameleoon.git
```

Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

Start both client and server

```bash
cd client && npm start
cd ../server && npm start
```

### What I used

- React
- TypeScript
- Vite
- Axios
- React Router Dom
- Eslint
- FSD (feature-sliced design)

### Structure

- app – main app component
- entities – 2 entities (test, site) with api requests
- pages – 3 pages (Dashboard, Finalize, Results)
- shared – some shared components, utils, fonts
- widgets – 1 widget (TestsTable)

`shared/ui/Table` – shared component for displaying a table. It can sort and filter data thanks to custom `useSort` and `useFilter` hooks. Hooks use `useTransition`, `useMemo` and `useCallback` to optimize rendering.

`widgets/TestsTable` – component that uses the `shared/ui/Table`. It requests tests and websites, adapts them for the table and transfers them with props. It also provides custom memoized components `Row` and `HeadRow`, which are used in the table.

`shared/api/requests/useData` – custom hook for fetching data from the server.
