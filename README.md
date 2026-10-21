# CI/CD Lab — React + TypeScript + Vite + GitHub Pages

Dự án mẫu minh họa GitHub Actions CI/CD trong môn **Quản trị dự án công nghệ thông tin (BS2025.2A01)**.

Trang web giới thiệu pipeline Checkout → TypeScript Check → Build → Deploy. Nút **Mô phỏng pipeline** trên trang web là minh họa; bằng chứng triển khai thực tế nằm trong tab **Actions** của repository này.

## Chạy trên máy
Yêu cầu Node.js 22 và npm:

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## Quy trình CI/CD
Workflow: `.github/workflows/pages.yml`. Mỗi pull request hướng tới `main` được typecheck và build. Khi push lên `main`, Actions build và deploy thư mục `dist` bằng `actions/upload-pages-artifact` và `actions/deploy-pages`.

**Bật GitHub Pages:** Settings → Pages → Build and deployment → Source → **GitHub Actions**.

- Repository: https://github.com/HoangTouliverBN/github-pages-cicd-demo
- Actions: https://github.com/HoangTouliverBN/github-pages-cicd-demo/actions
- Website dự kiến (chỉ xác nhận thành công khi truy cập được): https://hoangtouliverbn.github.io/github-pages-cicd-demo/

Để đảm bảo build tái lập sau thực nghiệm, hãy sinh `package-lock.json` và đổi `npm install` thành `npm ci`. Không commit khóa bảo mật, PAT hoặc secrets.

