# Gnupg

## 키 생성
gpg --full-generate-key

## 키 확인
gpg --list-keys
gpg --list-secret-keys

## 백업 생성

gpg --output backupkeys.pgp --armor --export-secret-keys --export-options export-backup <email>
gpg --export-ownertrust > trust_owner.pgp

## 맥에서 터미널 에러

echo "pinentry-program /usr/local/bin/pinentry-mac" >> ~/.gnupg/gpg-agent.conf
killall gpg-agent

## 복원

gpg --import-options import-restore --import backupkeys.pgp
gpg --import-ownertrust < trust_owner.pgp

## 권한설정

gpg --edit-key <email>
gpg> trust
