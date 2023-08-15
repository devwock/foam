---
title: AWS RDS Scale Up
tags:
    - aws
publish: true
---

# RDS Scale Up

## 개요

서비스 이용자 수가 늘어남에 따라, 피크 타임 시 DB CPU가 100%를 치는 일이 빈번하여 RDS Scale up을 해야했음.

## 고려 사항

- 피크 시 CPU 사용량을 확인, 목표 성능을 2배로 늘리기로 결정: 4xLarge -> 8xLarge
- Writer 인스턴스를 그냥 Scale up을 할 경우 수 분간 downtime이 발생함
  - 장애 시간을 최소화 할 수 있는 방법을 적용해야함
  - Reader 인스턴스 미리 생성, Writer를 Fail Over해서 Reader와 Writer를 Swap
    - Downtime 30초 ~ 수 분 정도 발생
    - 작업 중 500 오류 발생할 것
- 접속자 추이를 확인하여 접속자 수가 최소인 시간을 결정: 새벽 2시

## 진행 순서

0. 백업 스냅샷 생성
1. Reader 인스턴스를 먼저 목표 성능인 8xLarge로 생성
2. 기존 Reader 인스턴스를 목표 성능으로 Scale up (downtime 발생, 이 경우 1의 리더 인스턴스를 사용하게 됨)
3. 상기 1, 2 인스턴스 중 하나를 선택해 장애 우선 순위 0순위로 두어 Fail over 발생 시 Writer 인스턴스로 승격될 수 있도록 조치
4. Writer 인스턴스를 선택하여 `작업` - `장애 조치`(`Fail over`)를 눌러 3번의 Reader 인스턴스가 Writer로 변경되고 기존 Writer가 Reader로 변경되도록 조치
5. 작업이 완료되면 4번의 Writer -> Reader 인스턴스(4xlarge)를 삭제

## 장애 발생 시 복구 계획

- 장애 발생 시 스냅샷을 DB 인스턴스로 띄워 복구

## 결과

- RDS 4xLarge (Reader, Writer) -> 8xLarge (Reader, Writer) 변경 완료
- 피크 타임 기준 RDS CPU 100% -> 40%
  - 예상했던 50% 보다 더 적은 CPU 사용량임
- 다운 타임 30초 이하 발생
