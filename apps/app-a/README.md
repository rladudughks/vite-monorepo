# Vite monorepo

---

## 소개

## 라이브러리 목록

**메인**

- Zustand
- React Query

**기타**

- React Router
- React Hook Form
- React Helmet
- Others...

## 프로젝트 실행/빌드 방법

**Before** : 실행/빌드를 위한 사전 단계

```shell
# Dependencies 설치
> yarn install
```

**Local** : 로컬 개발 환경

```shell
# 'vite --mode debug'와 같은 명령 처리
# 'local'는 예약어로 인해서 mode는 따로 debug로 명칭 정리

# '.env.debug'가 없는 관계로 다음 우선 순위인 '.env' 환경 기준으로 동작
> yarn local

# Build 명령어는 따로 없음
```

**Development** : 개발 환경

```shell
# 'vite --mode development'와 같은 명령 처리
# '.env.development' 환경 기준으로 동작
> yarn dev

# Build 후 "/dist" 경로로 추출

> yarn build:dev
```

**Staging** : 스테이징 환경

```shell
# 'vite --mode staging'와 같은 명령 처리
# '.env.staging' 환경 기준으로 동작
> yarn staging

# Build 후 "/dist" 경로로 추출

> yarn build:staging
```

**Production** : 운영 환경

```shell
# 'vite --mode production'와 같은 명령 처리
# '.env.production' 환경 기준으로 동작
> yarn prod

# Build 후 "/dist" 경로로 추출

> yarn build:prod
```

**ETC** : 기타

```shell
# ESLint를 검사하는 명령
> yarn lint

# Production를 local server(serve)로 확인하는 명령
> yarn preview
```
