---
author: Alex Neville
date: 2023-06-11
title: GPG Notes
---

Move the GPG configuration to `.config/`.

``` {sh}
mkdir -p ~/.config/gpg
chmod 700 ~/.config/gpg
touch ~/.config/gpg/gpg.conf
chmod 600 ~/.config/gpg/gpg.conf
export GNUPGHOME="~/.config/gpg/"
```

Add the `--expert` option to enable newer ECC ciphers.

``` {sh}
gpg --quick-generate-key
gpg --generate-key
gpg --full-generate-key
```

View keys in the keychain (public & private).

``` {sh}
gpg --list-keys
gpg --list-secret-keys
```

Export keys and revocation certificate to file.

``` {sh}
gpg --export --armor --output pubkey.asc uid
gpg --export-secret-keys --armor --output seckey.asc uid
gpg --gen-revoke --armor --output revcert.asc uid
```

Interact with a key server.

``` {sh}
gpg --send-keys keyid
gpg --seach-keys uid
gpg --receive-keys keyid
```
