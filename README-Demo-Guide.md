# EduCore — School Management System (Demo Complete Guide)

Demo location: `C:\Website\EduCore_Demo`
Tech: Pure **frontend** (HTML + CSS + JavaScript). Data localStorage me save hota hai (koi backend / database nahi). Har role ka apna login + apne pages hain.

---

## 🚪 Login (login.html)

Raj Role choose karke login karein. Demo credentials:

| Role | Email | Password |
|------|-------|----------|
| 👑 Super Admin | superadmin@educore.pk | admin123 |
| 🛡️ Admin | admin@educore.pk | admin123 |
| 👩‍🏫 Teacher | ahmed@educore.pk | teacher123 |
| 🎓 Student | ahmed.raza@educore.pk | student123 |

> Note: Admin student/teacher ko login email + password deta hai. Login ke baad wo apna password change kar sakte hain (`Change Password` page).
> Har page par **Login guard** hai — bina correct role ke koi bhi page nahi khol sakta (galat role → login par redirect).

---

## 👑 1. SUPER ADMIN (System ka Malik — full control)

Super Admin **sab se upar** hota hai. Admin ya teachers ko bana/control karta hai, campus setup karta hai, backup leta hai.

**Sidebar:** Overview · Admins/Sub-Admins · School Setup · Subjects · Backup & Restore · System Settings

### Pages aur kaam:
- **Overview** (`pages/super-admin/index.html`) — KPIs: kitne admins, students, teachers, subjects. Quick Actions + System Status (DB connected, last backup).
- **Admins / Sub-Admins** (`pages/super-admin/admins.html`) — 🔴 **Fully working**
  - ➕ Add Admin (role: superadmin/admin, name, email, password, module access: All/Students/Fees/Exams)
  - Reset Password, Activate/Deactivate
  - Sab admins ki list with login credentials
- **School Setup** (`pages/super-admin/setup.html`) — School name, academic year, term, campuses, currency + grading system table (A+ to F). (Demo saved message)
- **Subjects** (`pages/super-admin/subjects.html`) — 🔴 Fully working: Add/Edit/Delete subjects + codes
- **Backup & Restore** (`pages/super-admin/backup.html`) — 🔴 Fully working: **Export pura data JSON file me** + **Import (restore)** backup file
- **System Settings** (`pages/super-admin/settings.html`) — General (platform name, language, timezone), Email/SMTP, Security (timeout, 2FA), Maintenance. (Backend settings — demo placeholder)

> Super Admin **Admin ke sare pages bhi access kar sakta hai** (role ke navigation me Admin Module link hai).

---

## 🛡️ 2. ADMIN (School ka Manager)

Admin **roz ka school management** karta hai — students, teachers, classes, fees, attendance, exams, results, notifications.

**Sidebar:** Dashboard · Students · Teachers · Subjects · Classes · Attendance · Exams · Fees · Notifications · Audit Logs · Settings

### Pages aur kaam:
- **Dashboard** (`pages/admin/index.html`) — KPIs (total students, present, fees overdue, pending results), attendance trend chart, fee collection donut, class strength, pending fee table with "Collect" buttons.
- **Students** (`pages/admin/students.html`) — 🔴 Fully working (sabse complete)
  - ➕ Add Student **4-step wizard** (Personal → Contact → Academic → Guardian), auto login account banta hai
  - Search + Active/All filter
  - View Profile, Reset Password, Activate/Deactivate
- **Teachers** (`pages/admin/teachers.html`) — 🔴 Fully working
  - ➕ Add Teacher (name, email, phone, password, subjects multi-select, classes multi-select, status)
  - Reset Password, list with login
- **Subjects** (`pages/admin/subjects.html`) — 🔴 Add/Edit/Delete subjects (teacher/class me use hote hain)
- **Classes** (`pages/admin/classes.html`) — Class cards (Grade + Section, in-charge teacher, students, subjects). ➕ Add Class (grade, section, year, capacity, in-charge teacher, subjects). (Fully working — classes local array me)
- **Attendance** (`pages/admin/attendance.html`) — Attendance report: date range + class filter, Overall/Present/Absent KPI, student-wise % summary table. Export button (demo placeholder).
- **Exams** (`pages/admin/exams.html`) — 🔴 Fully working
  - ➕ Schedule Exam (type, class, subject, date, total/passing marks)
  - Exam list with status (scheduled/active/result-pending/published)
  - **Review & Publish Results** (teacher ke enter kiye marks review → publish)
- **Fees** (`pages/admin/fees.html`) — 🔴 Fully working
  - KPIs (collected/pending/overdue)
  - ➕ Record Payment → **Receipt generate hota hai**
  - Fee Structure (add/remove fee types grade-wise)
  - Pending/overdue table with "Collect" (prefill)
- **Notifications** (`pages/admin/notifications.html`) — Compose (title, message, type, recipients: students/parents/teachers/class) + history with read %. 🔴 Send works (in-app + email demo).
- **Audit Logs** (`pages/admin/audit.html`) — 🔴 Har admin action ka record: actor, action, resource, time, IP.
- **Settings** (`pages/admin/settings.html`) — School profile (name, year, term, contact) + Role management table.

---

## 👩‍🏫 3. TEACHER (Class ka In-charge)

Teacher **apne classes** ka attendance, assignments, grades aur performance manage karta hai.

**Sidebar:** Dashboard · Mark Attendance · Assignments · Grades · Notifications · Performance · Change Password

### Pages aur kaam:
- **Dashboard** (`pages/teacher/index.html`) — KPIs (attendance %, pending assignments, exams, low attendance), today's classes table, quick attendance card, recent assignments, pending results, my assignments.
- **Mark Attendance** (`pages/teacher/attendance.html`) — 🔴 Fully working
  - Class + date select
  - Har student ke liye **P (Present) / A (Absent) / L (Late)** buttons
  - "All Present" / "All Absent" bulk shortcuts
  - Save → attendance record store me save hota hai
- **Assignments** (`pages/teacher/assignments.html`) — 🔴 Fully working (newest feature)
  - ➕ Upload Assignment (title, class, subject, due date, file — PDF/DOCX/Image detect)
  - List with format badge (PDF/DOCX/Image)
  - **"N submitted"** button → expand karke dekh kon se student ne submit kiya (name + file + date) 🆕
- **Grades** (`pages/teacher/grades.html`) — 🔴 Fully working
  - Exam select → har student ka marks enter
  - Auto grade calculate (A+, A, B, C, D, F)
  - Submit Grades → exam status "result-pending" (admin review/publish karega)
- **Notifications** (`pages/teacher/notifications.html`) — Compose (class announcement, parent alert, assignment reminder, exam update) + sent list. 🔴 Send works.
- **Performance** (`pages/teacher/performance.html`) — KPIs (avg score, attendance, assignments) + class averages + Good/Average/Needs attention.
- **Change Password** (`pages/teacher/change-password.html`) — 🔴 Old password verify karke naya password set (store me update).

---

## 🎓 4. STUDENT (Apna View-Only Portal)

Student **sirf apna** data dekh/sends hai — assignments submit karta hai, results/attendance/fees/notifications dekhta hai.

**Sidebar:** Dashboard · My Attendance · Assignments · Results · Report Card · Fee Status · Notifications · Change Password

### Pages aur kaam:
- **Dashboard** (`pages/student/index.html`) — KPIs (attendance, last grade, active assignments, fees outstanding), monthly attendance grid, recent assignments, result summary, fee status, notifications.
- **My Attendance** (`pages/student/attendance.html`) — Monthly calendar grid (green present ✓ / red absent ✗d) + KPIs.
- **Assignments** (`pages/student/assignments.html`) — 🔴 Fully working (newest feature)
  - Assignment list with **Pending / Submitted** status badges
  - ➕ **Submit** button → modal (assignment, apna naam, file attach)
  - Submit → store me saved → **teacher ko exact waqt dikh jata hai** 🆕
- **Results** (`pages/student/results.html`) — Overall %, class rank + subject-wise marks/grades table.
- **Report Card** (`pages/student/report.html`) — Official report card layout (school name, student info, marks, total, %, grade, rank) + Download PDF button (demo placeholder).
- **Fee Status** (`pages/student/fees.html`) — KPIs (due / paid) + fee records with receipt buttons.
- **Notifications** (`pages/student/notifications.html`) — 🔴 Store se notifications load (Result/Assignment/Exam/Fee types, Read/New badge).
- **Change Password** (`pages/student/change-password.html`) — 🔴 Same as teacher, apna password update.

---

## 🔄 Pun Kaise Aapas Me Julta Hai (Demo flow)

Sab data ek hi **localStorage store** me share hota hai — yeh "backend ka simulation" hai:

1. **Admin** student banata hai → us student ka login account ban jata hai.
2. **Admin** teacher banata hai → teacher ke login account ban jata hai.
3. **Teacher** assignment upload karta hai → **Student** ko wo assignment dikhta hai (submit kar sakta hai).
4. **Student** assignment submit karta hai → **Teacher** "N submitted" me waqt submit dekhta hai. 🆕
5. **Teacher** grades enter karta hai → exam "result-pending" hota hai → **Admin** review/publish karta hai → **Student** result/report card me dekhta hai.
6. **Admin** fee payment record karta hai → **Student** fee status me dekh sakta hai.
7. **Admin/Teacher** notification bhejta hai → **Student** notifications me dekhta hai.
8. **Super Admin** pura data **Export (backup)** / **Import (restore)** kar sakta hai.

---

## ✅ Summary Table

| Role | Kya kar sakta hai |
|------|-------------------|
| 👑 Super Admin | Admins create, school setup, subjects, backup/restore, system settings |
| 🛡️ Admin | Students/Teachers add, classes, subjects, fees + receipts, attendance report, exams + publish results, notifications, audit logs, settings |
| 👩‍🏫 Teacher | Mark attendance, upload assignments + view submissions, enter grades, notifications, performance, change password |
| 🎓 Student | Submit assignments, view attendance/results/report card/fees/notifications, change password |

---

## ⚠️ "Demo / Placeholder" Wale Pages

Yeh pages **sirf design/preview** hain — real data/backend chahiye (junhi backend lagayenge, working ho jayenge):
- Admin Attendance (export monta nahi)
- Teacher Dashboard quick attendance
- Report Card PDF download
- System Settings (SMTP, security, etc.)
- Super Admin School Setup save

Baaki ~90% features **abhi se fully working** hain (localStorage ke andar).
