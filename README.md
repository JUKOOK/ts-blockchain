# ts-blockchain

블록체인으로 타입스크립트 공부하기

### 시작하기

- `yarn init`

### 타입스크립트 설치

- `yarn add typescript`

### 타입스크립트용 설정 파일 추가

- tsconfig.json

  - compilerOptions : TSC에서 지정할 옵션
  - include : 타입스크립트 변환 파일 지정 path
  - exclude : 타입스크립트 변환 파일 제외 path

- tsc-watch : watch mode 컴파일링 (src 변화에 대해 즉각적으로 반영)
  - /src/ : ts들이 모이는 폴더
  - /dist/ : TSC 이후 js들이 모이는 폴더
