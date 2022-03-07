---
title: SSH Config에 터널링 설정
summary: SSH Config에 터널링 설정
categories:
    - 
tags:
    - server
    - ssh
link: 
publish: true
---

# SSH config tunneling

ssh config에 `ProxyJump` 설정으로 터널링을 거쳐 SSH로 바로 붙을 수 있다.

`~/.ssh/config`

```shell
Host <TUNNEL ALIAS>
    HostName <TUNNEL_SERVER_URL>
    User <TUNNEL_USER_NAME>
    IdentityFile <TUNNEL_KEY_FILE_PATH>

Host <ALIAS>
    HostName <ALIAS_SERVER_URL>
    User <ALIAS_USER_NAME>
    IdentityFile <ALIAS_KEY_FILE_PATH>
    ProxyJump <TUNNEL ALIAS>
```
