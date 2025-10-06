# 🚢 ระบบติดตามการเดินเรือ (Voyage Tracking System)

Web Application สำหรับติดตามและแสดงข้อมูลการเดินเรือ พัฒนาด้วย React + Vite และ Ant Design

## 🎯 Features

- ✅ Login ด้วย Fake Authentication (5 users)
- ✅ แสดงรายการเดินเรือทั้งหมด
- ✅ Expand/Collapse เพื่อดูข้อมูล Checkpoints และ GPS Tracking
- ✅ แสดงสถานะด้วยสีและเครื่องหมายที่ชัดเจน
- ✅ เรียงลำดับข้อมูล child ตามเวลา
- ✅ Clean Architecture

## 🏗️ โครงสร้างโปรเจกต์

```
src/
├── domain/              # Business entities
│   └── entities/
├── application/         # Use cases & business logic
│   └── usecases/
├── infrastructure/      # External services (API, Auth)
│   ├── api/
│   └── auth/
├── presentation/        # UI Components & Pages
│   ├── components/
│   └── pages/
└── shared/             # Utilities & Constants
    ├── utils/
    └── constants/
```

## 🚀 การติดตั้งและรันโปรเจกต์

### ติดตั้ง Dependencies

```bash
bun install
```

### ตั้งค่า Environment Variables

แก้ไขไฟล์ `.env` เพื่อกำหนด API endpoint และ API Key:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_KEY=your-api-key-here
```

### รันโปรเจกต์

```bash
bun run dev
```

เปิดเบราว์เซอร์ที่ http://localhost:5173

## 👥 ผู้ใช้งานทดสอบ

| Username    | Password  | Role      |
|-------------|-----------|-----------|
| captain1    | pass123   | Captain   |
| officer1    | pass123   | Officer   |
| engineer1   | pass123   | Engineer  |
| navigator1  | pass123   | Navigator |
| admin       | admin123  | Admin     |

## 🔌 API Configuration

แอปพลิเคชันจะเรียก API endpoint:

```
GET http://localhost:8080/api/v1/voyages/all
Headers:
  X-API-Key: your-api-key-here
```

สามารถเปลี่ยน URL และ API Key ได้ที่ไฟล์ `.env`

## 📊 โครงสร้างข้อมูล API Response

```json
{
  "count": 1,
  "data": [
    {
      "voyage": {
        "id": "...",
        "voyage_id": "...",
        "ship_id": "SHIP001",
        "ship_name": "Sea Explorer",
        "departure_port": "Bangkok Port",
        "arrival_port": "Singapore Port",
        "departure_time": "2025-10-06T05:49:10.812Z",
        "arrival_time": "2025-10-06T05:52:03.421Z",
        "status": "completed"
      },
      "checkpoints": [...],
      "gps_tracks": [...]
    }
  ]
}
```

## 🎨 สถานะและสี

- ✓ **Completed** - เขียว (#52c41a)
- ⟳ **In Progress** - น้ำเงิน (#1890ff)
- ⏱ **Pending** - เหลือง (#faad14)
- ✕ **Cancelled** - แดง (#ff4d4f)

## 🛠️ เทคโนโลยีที่ใช้

- React 18
- TypeScript
- Vite
- Ant Design
- Day.js
- Bun

## 📝 หมายเหตุ

- ระบบใช้ Fake Authentication โดยเก็บข้อมูลใน localStorage
- ข้อมูล child (Checkpoints และ GPS Tracking) จะถูกเรียงลำดับตามเวลาโดยอัตโนมัติ
- สามารถกด Refresh เพื่อโหลดข้อมูลใหม่ได้
