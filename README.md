# 🪄 MAGIC-LIB: Retro Inventory Management

A retro-styled, 8-bit theme inventory management and e-commerce web application. 

โปรเจกต์เว็บแอปพลิเคชันจัดการคลังสินค้าและระบบร้านค้า (E-commerce) ที่มาพร้อมกับดีไซน์สไตล์เกมเรโทร 8-bit โทนดาร์กโหมด สร้างขึ้นด้วย React, TypeScript และรันโปรเจกต์ด้วย Vite

## ✨ Features (จุดเด่นของโปรเจกต์)
- **Retro 8-Bit UI:** อินเทอร์เฟซสไตล์เกมยุคเก่าที่สวยงามและเป็นเอกลักษณ์
- **Admin Dashboard:** หน้ากระดานสำหรับจัดการคลังสินค้า (Inventory), ดูสถานะสินค้า และออเดอร์ต่างๆ
- **Shopping Flow:** ระบบหน้าโฮมเพจ, ดูรายละเอียดสินค้า, ตะกร้าสินค้า (Cart) และระบบชำระเงิน (Checkout)
- **User System:** หน้าต่าง Login, จัดการโปรไฟล์ และหน้า "Quest Log" สำหรับผู้ใช้งาน
- **Responsive Design:** รองรับการแสดงผลทั้งบนหน้าจอคอมพิวเตอร์และโทรศัพท์มือถือ

## 🛠️ Tech Stack (เครื่องมือที่ใช้พัฒนา)
- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router

---

## 🚀 Getting Started (วิธีติดตั้งและรันโปรเจกต์)

คำแนะนำสำหรับการตั้งค่าและรันโปรเจกต์บนเครื่องของคุณ (Localhost)

### 📋 Prerequisites (สิ่งที่ต้องเตรียมก่อนติดตั้ง)
กรุณาตรวจสอบให้แน่ใจว่าในเครื่องของคุณมีโปรแกรมเหล่านี้:
- Node.js (แนะนำเวอร์ชัน 18 ขึ้นไป)
- Git

### 💻 Installation & Setup (ขั้นตอนการติดตั้ง)

**1. Clone Repository**
ดาวน์โหลดโปรเจกต์ลงมาที่เครื่องของคุณ:
```bash
git clone [https://github.com/your-username/magic-lib.git](https://github.com/your-username/magic-lib.git)
cd magic-lib
```

**2. ตั้งค่า Environment Variables**
สร้างไฟล์ `.env` โดยคัดลอกโครงสร้างจากไฟล์ `.env.example` ที่มีอยู่แล้วในโปรเจกต์:
```bash
# สำหรับ Mac / Linux:
cp .env.example .env

# สำหรับ Windows (Command Prompt):
copy .env.example .env
```

**3. ติดตั้ง Dependencies**
รันคำสั่งนี้เพื่อติดตั้ง Library ต่างๆ ที่จำเป็นทั้งหมด (เช่น React, Tailwind, Lucide) ซึ่งระบุไว้ในไฟล์ package.json:
```bash
npm install
```

**4. รันเซิร์ฟเวอร์จำลอง (Development Server)**
เริ่มการทำงานของโปรเจกต์ด้วยคำสั่ง:
```bash
npm run dev
```

**5. เปิดดูผลลัพธ์หน้าเว็บ**
เมื่อเซิร์ฟเวอร์เริ่มทำงาน Terminal จะแสดง URL ขึ้นมา ให้เปิดเบราว์เซอร์และเข้าไปที่:
```text
http://localhost:3000
```

> **⚠️ ข้อควรระวัง:** โปรเจกต์นี้ใช้ Vite เป็น Build Tool จึง **ไม่สามารถ** รันผ่าน Extension อย่าง "Live Server" ได้โดยตรง จะต้องเปิดผ่านคำสั่ง `npm run dev` เท่านั้น

---

## 📂 Project Structure (โครงสร้างไฟล์ที่สำคัญ)
- `/src/pages/` - หน้าจอหลักของเว็บแอปพลิเคชัน
  - `Home.tsx`, `ProductDetail.tsx` (ส่วนร้านค้า)
  - `Cart.tsx`, `Checkout.tsx`, `Receipt.tsx` (ส่วนการสั่งซื้อ)
  - `AdminInventory.tsx` (ส่วนผู้ดูแลระบบ)
  - `Login.tsx`, `Profile.tsx`, `QuestLog.tsx` (ส่วนผู้ใช้งาน)
- `/src/components/` - ชิ้นส่วน UI ย่อยที่ถูกนำมาใช้ซ้ำ
- `App.tsx` & `main.tsx` - จุดเริ่มต้นการทำงานของ React และระบบ Routing
- `index.css` - ไฟล์หลักสำหรับตั้งค่า Tailwind CSS
- `vite.config.ts` - ไฟล์ตั้งค่าการทำงานของ Vite
