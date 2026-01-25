# Quickstart: Total Theme Reset

## 1. Setup Environment
Ensure you are on the feature branch:
```bash
git checkout 037-theme-reset
```

## 2. Dependency Check
Install the core styling dependencies:
```bash
npm install tailwindcss-animate next-themes lucide-react clsx tailwind-merge
```

## 3. Reset Foundation
1. Replace `frontend/app/globals.css` with the standard Zinc template.
2. Replace `frontend/tailwind.config.ts` with the standard configuration.

## 4. Cleanup UI
1. Delete `frontend/components/dashboard/ThemePicker.tsx`.
2. Update `frontend/app/dashboard/settings/page.tsx` to remove the `Appearance` card.
3. Extract and update the header logic to `frontend/components/dashboard/Header.tsx`.

## 5. Verify
Run the dev server and check for build errors:
```bash
npm run dev
```
Verify that toggling Light/Dark mode works seamlessly and persists on refresh.
