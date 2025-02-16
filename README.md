# Kanban To-Do List

## 프로젝트 개요

업무의 효율을 증진시키기 위한 칸반 형태의 To-Do List 애플리케이션입니다. 사용자는 보드를 생성하고, 할 일을 추가하며, 드래그 앤 드롭을 통해 보드 및 할 일의 위치를 변경할 수 있습니다.

## 기술 스택

- **Framework**: Next.js 15.x.x
- **Styling**: Tailwind CSS 3.x.x
- **State Management**: Zustand
- **Language**: TypeScript
- **Storage**: LocalStorage

## 기능 명세

### 보드 관리

- 보드를 생성할 수 있습니다.
- 보드의 제목을 수정할 수 있습니다.
- 보드를 삭제할 수 있습니다.
- 보드의 순서를 변경할 수 있습니다.

### 할 일 관리

- 보드 안에서 할 일을 생성할 수 있습니다.
- 할 일의 내용을 수정할 수 있습니다.
- 할 일을 삭제할 수 있습니다.
- 보드 내에서 할 일의 순서를 변경할 수 있습니다.
- 할 일을 다른 보드로 이동할 수 있습니다.

## 프로젝트 구조

```
/src
├── app                     # Next.js의 App Router 구조, 페이지 및 레이아웃 관리
├── components              # UI 컴포넌트
├── hooks                   # 커스텀 훅
├── pages                   # Next.js 페이지
├── services                # 비즈니스 로직 (boardService, todoService 등)
├── shared                  # 공통 타입 및 유틸리티 함수 관리
├── store                   # Zustand 상태 관리 (useBoardStore, useTodoStore 등)
└── styles                  # Tailwind 설정 및 전역 스타일
```

## 주요 라이브러리

| 라이브러리   | 설명                            |
| ------------ | ------------------------------- |
| Next.js      | React 기반의 프레임워크         |
| Tailwind CSS | 유틸리티 퍼스트 CSS 프레임워크  |
| Zustand      | 상태 관리 라이브러리            |
| TypeScript   | 정적 타입을 지원하는 JavaScript |

## 설치 및 실행 방법

```sh
# 프로젝트 클론
git clone <repo_url>

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

## 사용법

1. **보드 추가**: 보드를 생성하려면 ‘보드 추가’ 버튼을 클릭하세요.
2. **할 일 추가**: 각 보드 내에서 ‘할 일 추가’ 버튼을 눌러 할 일을 생성하세요.
3. **드래그 앤 드롭**: 보드 및 할 일의 위치를 마우스로 드래그하여 변경할 수 있습니다.
4. **보드/할 일 수정 및 삭제**: 보드 또는 할 일의 옵션 버튼을 클릭하여 수정 또는 삭제할 수 있습니다.
