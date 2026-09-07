# EduCore — School Management System

> One Platform. Every Classroom. — School management demo (frontend-only).

**EduCore** is a complete **School Management System** demo built with pure **HTML + CSS + JavaScript**. All data is stored in the browser's **localStorage** (no backend yet — works as a frontend simulation of a live system).

---

## ✨ Features Overview

- 🔐 **Role-based login** — 4 roles with separated pages and permissions
- 🎓 Student admission (4-step wizard) with auto login account creation
- 👩‍🏫 Teacher management (multi-subject, multi-class assignment)
- 📚 Subjects — add/edit/delete
- 🏫 Classes & sections with in-charge teacher
- 📅 **Attendance** — mark present/absent/late (bulk shortcuts), monthly calendar view
- 📝 **Exams & Results** — schedule exams, enter grades, review & publish
- 💰 **Fees** — record payments, auto receipt generation, fee structure
- 📚 **Assignments** — teachers upload, students submit, submissions tracked 🆕
- 🔔 **Notifications** — compose & send to students/parents/teachers
- 📊 **Audit logs** — record of admin actions
- 🛡️ **Super Admin** — admin accounts, backup/restore (JSON), system settings

---

## 🔑 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| 👑 Super Admin | `superadmin@educore.pk` | `admin123` |
| 🛡️ Admin | `admin@educore.pk` | `admin123` |
| 👩‍🏫 Teacher | `ahmed@educore.pk` | `teacher123` |
| 🎓 Student | `ahmed.raza@educore.pk` | `student123` |

> Admins create student/teacher login accounts. Users can change their own password after login.

---

## 📂 Project Structure

```
educore-demo/
│
├── index.html                      # Marketing landing page (root)
├── vercel.json                     # Vercel static deployment config
├── README.md                       # Main documentation
├── README-Demo-Guide.md            # Detailed demo walkthrough (Urdu/English)
├── Demo_Start.bat                  # Windows starter (opens index.html)
├── start.bat                       # Windows starter (alt)
│
├── auth/                           # 🔐 Authentication
│   └── login.html                  # Login page (role tabs)
│
├── assets/                         # 🎨 Shared static assets
│   ├── css/
│   │   └── style.css               # Global styles (single stylesheet)
│   └── js/
│       └── app.js                  # Shared JS: store, auth, sidebar, helpers
│
└── pages/                          # 📄 Role-based pages
    ├── super-admin/                # 👑 Super Admin
    │   ├── index.html              # Dashboard / Overview
    │   ├── admins.html             # Admins & Sub-Admins management
    │   ├── setup.html              # School setup (year, term, currency)
    │   ├── subjects.html           # Subjects management
    │   ├── backup.html             # Backup/Export & Restore/Import
    │   └── settings.html           # System settings (SMTP, security)
    │
    ├── admin/                      # 🛡️ Admin
    │   ├── index.html              # Dashboard
    │   ├── students.html           # Student admission + profiles
    │   ├── teachers.html           # Teacher management
    │   ├── classes.html            # Classes & Sections
    │   ├── subjects.html           # Subject management
    │   ├── attendance.html         # Attendance report
    │   ├── exams.html              # Exam scheduling + result publish
    │   ├── fees.html               # Fee management (payments, receipts)
    │   ├── notifications.html      # Compose notifications
    │   ├── audit.html              # Audit logs
    │   └── settings.html           # School profile & roles
    │
    ├── teacher/                    # 👩‍🏫 Teacher
    │   ├── index.html              # Dashboard
    │   ├── attendance.html         # Mark attendance (P/A/L)
    │   ├── assignments.html        # Upload assignments + view submissions 🆕
    │   ├── grades.html             # Enter marks, auto-grade, submit
    │   ├── notifications.html      # Send class/parent notifications
    │   ├── performance.html        # Class performance stats
    │   └── change-password.html    # Change password
    │
    └── student/                    # 🎓 Student
        ├── index.html              # Dashboard
        ├── attendance.html         # Monthly attendance calendar
        ├── assignments.html        # View & submit assignments 🆕
        ├── results.html            # Exam results & rank
        ├── report.html             # Official report card
        ├── fees.html               # Fee status & receipts
        ├── notifications.html      # Received notifications
        └── change-password.html    # Change password
```

---

## 👑 Roles & What They Can Do

### Super Admin — System Owner
- Create / manage Admin & Sub-Admin accounts (roles, permissions, passwords)
- Reset passwords, activate/deactivate admins
- School setup (name, academic year, term, campuses, currency, grading)
- Manage subjects
- **Backup & Restore** — export full data as JSON, import to restore
- System settings (email/SMTP, security, maintenance)

### Admin — School Manager
- **Students:** 4-step admission wizard, search/filter, profiles, reset password, deactivate
- **Teachers:** add with multiple subjects/classes, reset password
- **Classes:** create with grade, section, in-charge teacher, subjects
- **Subjects:** add/edit/delete
- **Exams & Results:** schedule exams, review & publish results
- **Fees:** record payments (auto receipt), manage fee structure
- **Notifications:** send to students/parents/teachers/classes
- **Audit logs:** track every admin action
- School profile settings

### Teacher — Class In-charge
- Mark attendance (P/A/L) per class, bulk all-present/absent
- Upload assignments (title, class, subject, due date, file)
- **View student submissions** 🆕
- Enter marks → auto grade → submit (admin reviews & publishes)
- Send class announcement / parent attendance alerts
- View class performance analytics
- Change own password

### Student — Personal Portal
- **View & submit assignments** 🆕 (submissions instantly visible to teacher)
- Monthly attendance calendar
- Exam results & class rank
- Official report card (PDF-ready layout)
- Fee status & receipts
- Receive notifications
- Change own password

---

## 🔄 How Data Flows Between Roles

All roles share one **localStorage store** (simulating a backend):

```
Admin creates Student ──▶ Student login account created
Admin creates Teacher ──▶ Teacher login account created
Teacher uploads assignment ──▶ Student sees & submits it 🆕
Student submits ──▶ Teacher sees submission instantly 🆕
Teacher enters grades ──▶ Exam status = result-pending
Admin publishes results ──▶ Student sees result/report card
Admin records payment ──▶ Student sees fee status update
Admin/Teacher sends notification ──▶ Student receives it
Super Admin exports/imports full data ──▶ Backup/Restore
```

---

## 🚀 Run Locally

Double-click **`Demo_Start.bat`** (or `start.bat`), or open `index.html` directly in a browser — no install needed.

### Or via a simple local server (optional)
```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000

# Node.js
npx serve .
```

---

## ☁️ Deploy on Vercel

This is a **static site** — deploys instantly on Vercel.

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo
3. **Framework Preset:** `Other` (or leave blank)
4. Root directory: `./` (default)
5. **Deploy** — done ✅

`vercel.json` already included for clean URLs:
```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

---

## ⚠️ Notes
- **Data is per-browser** (localStorage). Different users on different browsers won't share data — a real backend is required for multi-user production.
- Some pages are **previews/placeholders** (PDF download, SMTP email, admin attendance export) — these need a backend.

## 🛠️ Tech Stack
- HTML5 / CSS3 (single `style.css`)
- Vanilla JavaScript (single `app.js`, ~200 lines shared logic)
- localStorage for persistence
- No frameworks, no build step, no dependencies

---

© 2026 EduCore. Demo project — school management system frontend.