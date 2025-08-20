# EV Charging Management System (Production-Ready Version)

นี่คือเวอร์ชันที่ได้รับการปรับปรุงและเสริมความปลอดภัยแล้ว พร้อมสำหรับนำไปใช้งานจริง

## คุณสมบัติที่ปรับปรุง

- **Backend:** Data Integrity (Transactions), Enhanced Security (Helmet), Robust Error Handling (Global Filter), API Documentation (Swagger), Advanced Logging (Winston), Health Checks.
- **Frontend:** Secure Auth Flow (Context, Protected Routes), Centralized API (Axios Interceptors), Improved UX (Toasts, Loading States).

---

## การติดตั้งและเริ่มใช้งาน

### สิ่งที่ต้องมี
- Node.js (v18+)
- pnpm (แนะนำ)
- Docker และ Docker Compose

### ขั้นตอนการติดตั้ง

1.  **สร้างโครงสร้างไฟล์และคัดลอกโค้ด**
    - สร้างไฟล์ทั้งหมดตามที่ระบุ และคัดลอกโค้ดไปวาง

2.  **ติดตั้ง Dependencies**
    ```bash
    # ติดตั้ง backend
    cd backend
    pnpm install
    cp .env.example .env

    # ติดตั้ง frontend
    cd ../frontend
    pnpm install
    cp .env.example .env
    ```

3.  **เริ่ม Database**
    ```bash
    # กลับมาที่ root directory
    cd ..
    docker-compose up -d
    ```

4.  **ตั้งค่าฐานข้อมูลและข้อมูลเริ่มต้น**
    ```bash
    cd backend
    pnpm prisma migrate dev --name init
    pnpm prisma db seed # (ถ้าคุณสร้างไฟล์ seed)
    ```

5.  **รันโปรเจกต์ (ใช้ 2 Terminal)**
    - Terminal 1: `cd backend && pnpm run start:dev`
    - Terminal 2: `cd frontend && pnpm run dev`

### Endpoints สำคัญ
- **Frontend App:** `http://localhost:5173`
- **Backend API:** `http://localhost:3001`
- **API Docs (Swagger):** `http://localhost:3001/api-docs`

### บัญชีผู้ใช้เริ่มต้น
- **รหัสผ่าน:** `123456`
- **Admin:** `admin1@evcharge.com`
- **User:** `user1@example.com`
