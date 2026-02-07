# Research Findings: Task Dashboard Enhancements

## R1: Task Model Fields
**Goal:** Verify if `due_date` exists in `Task` model.
**Findings:**
- `Task` model in `todo-hackathon3/app/models.py` **already has** `due_date`.
- Definition: `due_date: Optional[datetime] = Field(default=None, sa_column=Column("due_date", DateTime, nullable=True))`
- **Action:** No migration needed for `due_date` column existence.
- **Correction:** The `sa_column` name is `"due_date"` (snake_case) but constitution implies camelCase preference for DB columns. However, existing schema uses `due_date`. To respect "Ironclad Schema" rule for *new* changes while preserving existing data, we will stick to the existing `due_date` column name for now unless a migration is explicitly requested to rename it. *Wait, looking closer at the file*:
  - `User` table uses camelCase (e.g., `hashedPassword`).
  - `Task` table uses `due_date` (snake_case) in the `sa_column` definition seen in the file.
  - **Decision:** Use existing `due_date` column to avoid breaking changes/migrations.

## R2: Category Color Storage
**Goal:** Determine how category colors are stored.
**Findings:**
- `Category` model has `color: str`.
- No specific format enforcement (likely Hex or Tailwind class).
- **Decision:** Assume Hex codes or standard CSS color strings based on frontend usage.

## R3: Badge Component
**Goal:** Check for Badge component availability.
**Findings:**
- `frontend/components/ui/badge.tsx` exists.
- **Decision:** Use the existing `Badge` component for Priority and Category display.
