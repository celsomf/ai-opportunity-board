# Interface Contracts: Storage and UI

## Storage Contract
The application persists opportunities in browser `localStorage`.

- **Key**: `ai_opportunities_board_data`
- **Format**: JSON serialized array of `Opportunity` objects.
- **Example Value**:
  ```json
  [
    {
      "id": "a3b2c1d0-1234-5678-90ab-cdef12345678",
      "name": "Customer Ticket Routing",
      "area": "Atendimento",
      "description": "Automate triage of support tickets using NLP",
      "impact": 5,
      "frequency": 4,
      "manualEffort": 5,
      "repetitivity": 5,
      "dataReadiness": 3,
      "difficulty": 2,
      "score": 86,
      "priority": "ALTA",
      "createdAt": 1792271200000
    }
  ]
  ```

## UI Element Contracts (DOM IDs)
To keep JS selectors clean and decoupled from styling:

- **Form**: `#opportunity-form`
- **Fields**:
  - `#field-id` (Hidden input for Edit mode)
  - `#field-name`
  - `#field-area`
  - `#field-description`
  - `#field-impact`
  - `#field-frequency`
  - `#field-manual-effort`
  - `#field-repetitivity`
  - `#field-data-readiness`
  - `#field-difficulty`
- **Form Feedback**: `#form-errors`
- **Filters**:
  - `#filter-area`
  - `#filter-priority`
- **Summary Metrics**:
  - `#metric-total`: Displays count of all filtered opportunities
  - `#metric-high-priority`: Displays count of high-priority opportunities
  - `#metric-average-score`: Displays average score of all filtered opportunities
- **List Container**: `#opportunities-list`
