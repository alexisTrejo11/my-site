# HTTPS

> HTTP secured with TLS — encryption on the wire, certificates, port 443, and HSTS.

**HTTPS** is **[HTTP](/learning/networking-http) over [TLS](/learning/networking-tls)** (historically “SSL”, now TLS 1.2+). It protects **confidentiality** and **integrity** of request/response data and lets clients **authenticate the server** via certificates. Browsers show a lock icon when the chain of trust validates.

---

## Stack

```
HTTP  (methods, paths, headers, body)
  ↓
TLS   (encryption + server authentication)
  ↓
TCP   (reliable transport)
  ↓
IP
```

Default port: **443** (HTTP uses **80**).

---

## What HTTPS protects

| Protected | Not protected |
| --------- | ------------- |
| URL path and query (mostly) | **DNS query** visibility (unless DoH/DoT) |
| Request/response headers & body | **IP addresses** and **SNI** hostname (visible to network observers) |
| Cookies and tokens in transit | **Traffic timing** and **volume** (metadata) |

Threat modeling: HTTPS stops casual Wi-Fi snooping; it does not make you anonymous.

---

## Certificates and PKI

1. Server presents an **X.509 certificate** with its public key and domain names.
2. Certificate is signed by a **Certificate Authority (CA)** the client trusts.
3. Client verifies chain, expiry, and **hostname match** (CN / SAN).
4. [TLS](/learning/networking-tls) handshake derives **session keys** for symmetric encryption.

**Let’s Encrypt** and similar CAs issue free domain-validated certs via ACME (often `_acme-challenge` **TXT** records in [DNS](/learning/networking-dns)).

---

## TLS handshake (simplified)

1. Client sends supported ciphers and random
2. Server picks cipher, sends cert + random
3. Client verifies cert, sends key share (TLS 1.3)
4. Both derive keys → **encrypted** HTTP begins

TLS 1.3 reduces round trips compared to older versions.

---

## HSTS

**HTTP Strict Transport Security** (`Strict-Transport-Security` header) tells browsers to **only** use HTTPS for a period, reducing **sslstrip** downgrade attacks.

---

## Development vs production

| Environment | Guidance |
| ----------- | -------- |
| **Production** | Always HTTPS; redirect HTTP → HTTPS |
| **Local dev** | `http://localhost` is common; use self-signed or mkcert for HTTPS testing |
| **APIs** | mTLS or bearer tokens *in addition* to HTTPS for service auth |

Plain HTTP defaults in some frameworks are for convenience — **do not** expose them publicly without TLS termination (reverse proxy, load balancer, or in-app TLS).

---

## Related notes

- [TLS](/learning/networking-tls) — protocol details, versions, cipher suites
- [HTTP](/learning/networking-http) — semantics above TLS
- [DNS](/learning/networking-dns) — name resolution and ACME challenges
- [TCP](/learning/networking-tcp) — transport below TLS
