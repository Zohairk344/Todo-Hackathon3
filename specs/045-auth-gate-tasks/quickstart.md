# Quickstart: Authentication Gate for Tasks

## Overview
This feature implements a strict rendering and execution gate in the `TasksProvider` to prevent 401 errors during the initial session establishment.

## Integration Steps

1. **Update Imports**: 
   Ensure `useAuth` is imported in `frontend/context/tasks-context.tsx`.
   Ensure `Loader2` from `lucide-react` is available for the spinner.

2. **Consume Auth State**:
   ```tsx
   const { user, loading: authLoading } = useAuth();
   ```

3. **Implement the Render Gate**:
   At the beginning of the `TasksProvider` function body:
   ```tsx
   if (authLoading) {
     return (
       <div className="h-full w-full flex items-center justify-center p-8">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
       </div>
     );
   }

   if (!user) {
     return null;
   }
   ```

4. **Harden Functions**:
   Add guard clauses to `refreshTasks`, `addTask`, `addCategory`, etc.:
   ```tsx
   if (!user || authLoading) return;
   ```

5. **Verify**:
   - Clear cookies.
   - Load dashboard.
   - Observe spinner.
   - Check browser console/network tab for 401 errors (expect zero).
