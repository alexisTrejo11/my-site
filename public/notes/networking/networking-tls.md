# TLS

> Transport Layer Security — handshake, certificates, symmetric encryption, and TLS 1.3 essentials.

**TLS** (Transport Layer Security) encrypts and authenticates traffic above [TCP](/learning/networking-tcp). It powers **[HTTPS](/learning/networking-https)**, secure email (SMTPS, IMAPS), **DNS over TLS (DoT)**, and many APIs. The IETF standardizes TLS; **TLS 1.3** (2018) is the current baseline for new deployments.

---

## Why TLS exists

Plain [HTTP](/learning/networking-http) sends everything in **cleartext** — vulnerable to **passive eavesdropping** and **man-in-the-middle (MITM)** attacks on untrusted networks.

TLS provides:

1. **Confidentiality** — symmetric encryption of payload after handshake
2. **Integrity** — detect tampering (AEAD ciphers)
3. **Authentication** — server (and optionally client) identity via **PKI**

---

## Keys: asymmetric bootstrap, symmetric bulk

| Phase | Key type | Purpose |
| ----- | -------- | ------- |
| Handshake | **Asymmetric** (ECDH, RSA legacy) | Authenticate server, agree on shared secret |
| Data transfer | **Symmetric** (AES-GCM, ChaCha20-Poly1305) | Fast encryption of HTTP records |

You cannot efficiently encrypt gigabytes with RSA alone — TLS uses public-key crypto only to establish **session keys**.

---

## Handshake (TLS 1.3, simplified)

1. **ClientHello** — supported versions, ciphers, key shares, **SNI** (server name)
2. **ServerHello** — chosen parameters, certificate chain, key share
3. Client verifies certificate against trusted CAs
4. **Finished** messages — both sides confirm keys
5. Application data (HTTP) flows encrypted

**0-RTT** (early data) can resume sessions faster but has replay caveats — use carefully.

---

## Certificates

- **Leaf cert** — server’s public key + domain names (SAN)
- **Intermediate CAs** — chain to **root** in client trust store
- **Client certs** — optional **mTLS** for service-to-service auth

Revocation: OCSP / CRL (browsers check validity).

---

## SNI and metadata

**Server Name Indication (SNI)** sends the hostname in cleartext during handshake so virtual hosts on one IP can serve the right cert. Network observers still see **who** you connect to at the TLS layer.

---

## TLS vs “SSL”

**SSL 2/3** are obsolete and insecure. People still say “SSL” colloquially; configure **TLS 1.2+** (prefer **1.3**).

---

## Plain HTTP reminder

| Mode | Risk |
| ---- | ---- |
| HTTP | Body, cookies, tokens readable on the path |
| HTTPS | Payload protected; metadata (IP, SNI, timing) may remain |

Backend frameworks often listen on HTTP **behind** a TLS-terminating proxy — that is fine if the hop from proxy to app is trusted (same VPC).

---

## Related notes

- [HTTPS](/learning/networking-https) — HTTP over TLS
- [HTTP](/learning/networking-http) — application protocol
- [TCP](/learning/networking-tcp) — transport below TLS
- [DNS](/learning/networking-dns) — names for certs and DoT
