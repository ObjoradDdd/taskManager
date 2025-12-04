# Backend endpoints expected by the frontend

The frontend will call a minimal set of endpoints. If these are not present in the backend, please add them with the specified shapes.

1) GET /api/projects
Response: 200
[
  {
    "id": "proj-1",
    "name": "Final Product",
    "subject": "Course XYZ",
    "results": [ { "id":"res-1", "title":"..." } ]
  }
]

2) GET /api/projects/:id
Response: 200: project object (with results and nested items as needed)

3) GET /api/results/:id
Response: 200
{
  "id":"res-1",
  "title":"Integration Mobile-Backend",
  "description":"...",
  "dueDate":"2025-12-10",
  "tasks": [ { "id":"t1", "title":"Spec API", "dueDate":"...", "assignees":["u1"] } ],
  "dependencies": ["res-2"],
  "assignees": ["u2"]
}

4) POST /api/tasks
Request: { title, description?, dueDate?, assignees?: string[], resultId?: string }
Response: 201 { task }

5) GET /api/users
Response: 200 [ { id, name, email? } ]

Notes / potential enhancements the backend can provide:
- Endpoints for assigning multiple users to a result
- Endpoints for specifying dependency types and statuses
- Filtering endpoints (by due date range, project, assigned user)
- Bulk import/export (CSV/JSON) for demo projects
