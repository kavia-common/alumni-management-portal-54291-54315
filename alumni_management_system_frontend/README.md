# Alumni Management System Frontend (React + Tailwind)

Elegant Ocean Professional themed frontend with role-based dashboards, authentication, data collection, approvals, requests, and jobs using mock APIs.

## Quick Start

1. Install dependencies
   - npm install

2. Start development server
   - npm start
   - App runs at http://localhost:3000

## Features

- Authentication and Registration (mock)
- Role-based dashboards:
  - Student, Alumni, Coordinator, Placement Incharge, Office Incharge
- Alumni data collection forms
- Profile management
- Approvals workflow
- Requests management
- Job listings and posting (by Placement/Coordinator/Office)
- Responsive layout with top navbar and role-aware side menu
- Soft pastel gradient UI per Ocean Professional style guide

## Testing Roles

Use the login email suffix to simulate roles:
- student@example.com -> Student (default)
- user+alumni@example.com -> Alumni
- user+coord@example.com -> Coordinator
- user+place@example.com -> PlacementIncharge
- user+office@example.com -> OfficeIncharge

Any password is accepted in mock mode.

## Structure

- src/context/AuthContext.js - Auth state using mock API
- src/services/mockApi.js - All mock endpoints and data
- src/layout/MainLayout.js - Navbar + side navigation + content outlet
- src/pages/auth/* - Login/Register
- src/pages/dashboards/* - Role dashboards
- src/pages/common/* - Shared feature pages

## Styling

Tailwind configured with:
- Primary: #F472B6
- Secondary: #F59E0B
- Success: #10B981
- Error: #EF4444
- Gradient: from-rose-50 to-purple-50
- Background: #FDF2F8
- Surface: #FFFFFF
- Text: #374151

Utilities and components in src/index.css.

## Notes

This frontend uses mock APIs only. Replace src/services/mockApi.js with real API integration when backend is ready.
