---
title: JMeter 원격 테스트 설정
tags:
    - server
    - jmeter
link: 
publish: true
---

# JMeter 원격 테스트 설정

## 개요

로컬호스트 (MacOS, Jmeter GUI) -> AWS Bastion -> Jmeter Server (AWS LINUX)

주의: JDK 1.8.0으로 설치해야한다. 상위 버전에서는 JNI 오류가 발생한다.

## 서버

### JDK 설치

```shell
# JDK 설치
sudo su
yum install java-1.8.0-openjdk
exit
```

### IP 허용

iptables 혹은 작업 그룹 설정

```shell
iptables -A INPUT -p udp -m udp --dport 1099 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 1099 -j ACCEPT
iptables -A INPUT -p udp -m udp --dport 50000 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 50000 -j ACCEPT
iptables -A INPUT -p udp -m udp --dport 51000 -j ACCEPT
iptables -A INPUT -p tcp -m tcp --dport 51000 -j ACCEPT
```

### Jmeter 설치

```shell
wget https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.4.3.zip
unzip ./apache-jmeter-5.4.3.zip -d ./jmeter
mv -f ./jmeter/apache-jmeter-5.4.3/* ./jmeter
rm -rf ./jmeter/apache-jmeter-5.4.3/
```

### jks 생성 (Optional)

```shell
# 실행
~jmeter/bin/create-rmi-keystore.sh 

# 출력
What is your first and last name?
  [Unknown]:  rmi  #  키 Alias
What is the name of your organizational unit?
  [Unknown]:  <UNIT>
What is the name of your organization?
  [Unknown]:  <ORG>
What is the name of your City or Locality?
  [Unknown]:  <CITY>
What is the name of your State or Province?
  [Unknown]:  <STATE>
What is the two-letter country code for this unit?
  [Unknown]:  <82>
Is CN=rmi, OU=fitpet, O=fitpet, L=Seoul, ST=Seoul, C=82 correct?
  [no]:  yes

Enter key password for <rmi>
        (RETURN if same as keystore password):  
Re-enter new password: 

Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore rmi_keystore.jks -destkeystore rmi_keystore.jks -deststoretype pkcs12".
Copy the generated rmi_keystore.jks to jmeter/bin folder or reference it in property 'server.rmi.ssl.keystore.file'

# 키 검증
keytool -list -keystore rmi_keystore.jks
```

### 서버 설정 편집

`<JMETER_ROOT>/bin/jmeter.properties`

```shell
server.rmi.localport=50000  # JMeter 서버 엔진 포트. 변경시 설정, 기본값은 4000, 사용 안하면 랜덤 포트 사용
server.rmi.ssl.disable=true  # SSL 키를 사용하지 않으려면 설정
# server.rmi.port=1099  # 서버 접근 포트. 기본값은 1099
# 다음 설정은 SSL 키를 사용할 때 설정
# server.rmi.ssl.keystore.type=JKS  # 키 타입. 기본값은 JKS. PKCS12 설정 가능
# server.rmi.ssl.keystore.password=<PASSWORD>  # 키 비밀번호를 정했다면 설정
# server.rmi.ssl.keystore.alias=<ALIAS>  # 키 Alias
```

### JMeter 서버 시작

```shell
# 실행
<JMETER_ROOT>/bin/jmeter-server

# 출력
Using local port: 50000
Created remote object: UnicastServerRef2 [liveRef: [endpoint:[<IP ADDRESS>:50000](local),objID:[-2cf0b695:17e52c766bc:-7fff, -7816885528712838043]]
```

## 클라이언트

### JDK (MacOS)

```shell
brew tap homebrew/cask-versions
brew install temurin8
```

### 포트 포워딩

- `localhost:52000` -> `<Jmeter Server>:1099`
- `localhost:51000` -> `<Jmeter Server>:51000`
- `localhost:50000` -> `<Jmeter Server>:50000`

### 클라이언트 설정 편집

`<JMETER_ROOT>/bin/jmeter.properties`

```shell
remote_hosts=127.0.0.1:52000
client.rmi.localport=51000
server.rmi.ssl.disable=true
```

### 환경 변수 설정

```shell
export JVM_ARGS="-Djava.rmi.server.hostname=localhost"
```

### JMeter 실행

```shell
<JMETER_ROOT>/bin/jmeter
```

터미널에서 실행 시 다음 명령어 사용

```shell
<JMETER_ROOT>/bin//jmeter -n -t <JMX FILE> -l <JTL FILE>
```

## SEE ALSO

- <https://rolfje.wordpress.com/2012/02/16/distributed-jmeter-through-vpn-and-ssl/>
- <https://jmeter.apache.org/usermanual/properties_reference.html#remote>
- <https://jmeter.apache.org/usermanual/remote-test.html>
