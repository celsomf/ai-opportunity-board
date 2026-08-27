# Data Model: AI Opportunity Board

We define the structure of our core data entity and state.

## Entities

### `Opportunity`
Represents an AI automation opportunity for a business process.

| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| `id` | String (UUID) | Required, Unique | Generated on creation. |
| `name` | String | Required, 1-80 chars, trimmed | Name of the process. |
| `area` | String (Enum) | Required | One of: Comercial, Marketing, Atendimento, Financeiro, RH, Operações, TI, Outros |
| `description` | String | Optional, 0-300 chars, trimmed | Brief description. |
| `impact` | Integer | Required, 1-5 | Business impact score. |
| `frequency` | Integer | Required, 1-5 | Frequency of execution score. |
| `manualEffort`| Integer | Required, 1-5 | Level of manual effort score. |
| `repetitivity`| Integer | Required, 1-5 | Repetitivity score. |
| `dataReadiness`| Integer | Required, 1-5 | Ready-to-use data score. |
| `difficulty` | Integer | Required, 1-5 | Implementation difficulty score. |
| `score` | Integer | Derived, 0-100 | Opportunity score computed dynamically. |
| `priority` | String (Enum) | Derived | ALTA (80-100), MÉDIA (60-79), BAIXA (0-59). |
| `createdAt` | Integer (Epoch) | Required | Date/time of creation for sorting tie-breakers. |

## State Shape
The application state managed in `src/state.js`:

```javascript
{
  opportunities: [], // Array of Opportunity objects
  filters: {
    area: "",      // Empty string means "All"
    priority: ""   // Empty string means "All"
  }
}
```
