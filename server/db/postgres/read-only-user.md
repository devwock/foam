---
title: Read Only User
tags:
    - postgres
publish: true
---

# Read Only User

-- 사용자 생성
CREATE USER <USERNAME> WITH PASSWORD <PASSWORD>;

-- 데이터베이스 접근 권한 부여
GRANT CONNECT ON DATABASE <DATABASENAME> TO <USERNAME>;

-- 스키마 접근 권한 부여
GRANT USAGE ON SCHEMA <SCHEMANAME> TO <USERNAME>;

-- 모든 테이블에 SELECT 권한 부여
GRANT SELECT ON ALL TABLES IN SCHEMA <SCHEMANAME> TO <USERNAME>;

-- 앞으로 생성될 테이블에 자동으로 SELECT 권한 부여
ALTER DEFAULT PRIVILEGES IN SCHEMA <SCHEMANAME>
GRANT SELECT ON TABLES TO <USERNAME>;

-- 생성된 계정 조회
SELECT * FROM pg_roles;
