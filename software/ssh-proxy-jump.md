---
title: SSH Proxy Jump
tags:
    - ssh
publish: true
---

# SSH Proxy Jump

ssh config에 `ProxyJump` 설정으로 프록시 서버를 거쳐 SSH로 바로 붙을 수 있다.

`~/.ssh/config`

```shell
Host <PROXY ALIAS>
    HostName <PROXY SERVER URL>
    User <PROXY USER NAME>
    IdentityFile <PROXY KEY FILE PATH>

Host <TARGET ALIAS>
    HostName <TARGET SERVER URL>
    User <TARGET USER NAME>
    IdentityFile <TARGET KEY FILE PATH>
    ProxyJump <TUNNEL ALIAS>
```

이후 `<TAGET ALIAS>`로 접속하면 된다.

```shell
ssh <TAGET ALIAS>
```
