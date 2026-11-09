# Security Policy

## Supported versions

| Version | Security fixes |
|---|---|
| 4.x (Rust) | Yes |
| 3.x and earlier (Node.js) | No, please update to 4.x |

## Reporting a vulnerability

If you think you have found a security problem in KoreShelf, please don't open a public issue. Write to **koreshelf@gmail.com** instead.

Please include:

- a description of the problem and what an attacker could do with it;
- the steps to reproduce it;
- the KoreShelf version and how you run it (desktop app, phone app, Docker or `koreshelf --server`);
- any code, files or screenshots that help to understand it.

## What happens next

We will reply within 48 hours to confirm we received your report, and keep you updated while we look into it and work on a fix. Please give us reasonable time to release the fix before making anything public. If you like, we will credit you in the release notes.

## Scope

These are examples of what we consider a vulnerability:

- getting around the password set with `KORESHELF_PASSWORD`;
- reading or writing files outside the KoreShelf data folder;
- running code on the computer or server through a crafted EPUB, PDF or request;
- turning off or controlling the server from another device in server mode.

These are known limits, described in the README, rather than vulnerabilities:

- KoreShelf does not provide HTTPS on its own. If you expose it to the internet, put it behind a reverse proxy with HTTPS or a VPN.
- Without `KORESHELF_PASSWORD`, anyone who can reach the server on your network can use the library.

Thank you for helping keep KoreShelf safe.
