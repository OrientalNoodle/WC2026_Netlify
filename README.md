# WC2026 Kèo bạn bè

Ứng dụng React + Vite để bắt kèo châu Á, xem bảng điểm và hướng dẫn cách chơi.

## Cách chạy

1. Cài Node.js / npm trên máy nhà.
2. Mở terminal ở thư mục dự án.
3. Chạy `npm install`.
4. Chạy `npm run dev`.

## Cấu trúc

- `src/App.tsx`: giao diện chính
- `src/components/MatchCard.tsx`: thẻ trận và nút bắt kèo
- `src/components/RulesPanel.tsx`: nội dung luật chơi
- `src/components/Leaderboard.tsx`: bảng điểm
- `src/services/firebase.ts`: xác thực Google
- `src/services/storage.ts`: lưu bet lên localStorage
- `src/services/scoring.ts`: tính điểm kèo
- `src/data/matches.ts`: dữ liệu trận mẫu

## Lưu ý

- Firebase config hiện đang là placeholder. Thêm cấu hình thực tế nếu dùng Google login.
- Máy công ty có thể không cài Node; nên clone/copy code sang máy khác để chạy.
