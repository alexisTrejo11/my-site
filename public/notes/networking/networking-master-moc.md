# Networking: Fundamentals & Protocols

> Learning path from how the Internet works through the OSI model to individual protocol deep dives.

## Start here

| Note | Description |
| ---- | ----------- |
| [How the Internet Works](/learning/networking-how-the-internet-works) | End-to-end path: bits, ISPs, DNS, encryption, metadata |
| [OSI Model](/learning/networking-osi-model) | Seven-layer reference model and how real protocols map to it |
| Protocols/00 Protocols MOC | Index of every protocol note, grouped by layer |

---

## Core concepts (before protocols)

| Note | Description |
| ---- | ----------- |
| Protocols/IP Addresses and Protocols | IPv4, IPv6, public vs private, loopback, IANA/RIRs |
| Protocols/NAT | Why private addresses need translation; NAT tables and port forwarding |

---

## Protocol library

See Protocols/00 Protocols MOC for the full categorized list. Quick links by concern:

| Concern | Notes |
| ------- | ----- |
| **Addressing & routing** | Protocols/IP, Protocols/IP Addresses and Protocols, Protocols/NAT |
| **Reliable transport** | Protocols/TCP |
| **Fast / datagram transport** | Protocols/UDP |
| **Naming** | Protocols/DNS |
| **Web** | Protocols/HTTP, Protocols/HTTPS, Protocols/TLS |
| **RPC & real-time** | Protocols/GRPC, Protocols/WEB RTC |

---

## Suggested reading order

1. [How the Internet Works](/learning/networking-how-the-internet-works) — big picture
2. Protocols/IP Addresses and Protocols — what snake through everything
3. [OSI Model](/learning/networking-osi-model) — vocabulary for layers
4. Protocols/DNS → Protocols/TCP / Protocols/UDP → Protocols/HTTP → Protocols/TLS / Protocols/HTTPS
5. Specialized topics as needed: Protocols/NAT, Protocols/GRPC, Protocols/WEB RTC

---

## Adding new notes

Place protocol notes under `01_Fundamentals/Networking/Protocols/`. Use System/Templates/Template Tech Note frontmatter (`category: fundamentals`, `subcategory: networking`). Add a row to Protocols/00 Protocols MOC under the right layer group.

**Planned topics** (create when ready):

- DHCP, ICMP, BGP
- WebSockets, SSE
- QUIC / HTTP/3
- SMTP, IMAP, FTP (legacy but still seen)
- DNS over HTTPS (DoH) / DNS over TLS (DoT)

---

## Related sections

- Computing Master Index — Part 4 links here
- Kubernetes Pod Networking — applies these concepts in clusters

---

## Progress

| Area | Status |
| ---- | ------ |
| Big picture & OSI | Ready |
| Network / transport layer | Ready |
| Application & security protocols | Ready |
| Advanced (gRPC, WebRTC) | Ready |
