import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// seed.ts는 실행 목적의 파일 (ESLint 검사 불필요)
// CJS 와 ES Module 충돌 방지
// prisma 공식 문서 참조 : https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['prisma/seed.ts'], // `prisma/seed.ts`를 ESLint 검사에서 제외
  },
];

export default eslintConfig;
