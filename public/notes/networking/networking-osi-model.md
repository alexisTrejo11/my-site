# OSI Model

> The seven-layer OSI reference model — what each layer does and how TCP/IP protocols map to it.

The **Open Systems Interconnection (OSI) model** is a **conceptual framework** that splits network communication into **seven layers**. It helps you name problems (“this looks like a transport-layer issue”) and compare protocols without memorizing every RFC.

Real stacks (especially **TCP/IP**) do not map perfectly to OSI, but the model is still the standard teaching vocabulary.

---

## The seven layers (top to bottom)

| Layer | Name | Role | Examples in this vault |
| ----- | ---- | ---- | ---------------------- |
| **7** | Application | What users and apps see | Protocols/HTTP, Protocols/DNS, Protocols/GRPC, Protocols/WEB RTC |
| **6** | Presentation | Encoding, compression, encryption (often folded into app) | TLS record format (see Protocols/TLS) |
| **5** | Session | Dialog control, checkpoints (rarely separate today) | — |
| **4** | Transport | End-to-end delivery between processes (ports) | Protocols/TCP, Protocols/UDP |
| **3** | Network | Logical addressing and routing across networks | Protocols/IP, Protocols/NAT |
| **2** | Data link | Frames on a local link (MAC addresses) | Ethernet, Wi-Fi (not covered here) |
| **1** | Physical | Bits on the wire / radio / fiber | [Bit](/learning/computer-architecture-bit) |

**Mnemonic (top → bottom):** *All People Seem To Need Data Processing* (Application → Physical).

---

## Encapsulation

Each layer adds its own **header** (and sometimes trailer) around data from the layer above:

```
[ App data ]
  → TCP/UDP header + payload        (segment / datagram)
    → IP header + segment             (packet)
      → Ethernet header + packet      (frame)
        → bits on the medium
```

On receive, each layer **strips its header** and passes the payload up. This is why “TCP runs on IP” means TCP segments are **carried inside** IP packets.

---

## TCP/IP vs OSI (practical mapping)

The **Internet protocol suite** (TCP/IP) is often taught as four layers:

| TCP/IP layer | OSI layers | Notes |
| ------------ | ---------- | ----- |
| Application | 5, 6, 7 | HTTP, DNS, TLS handshake logic |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP, routing |
| Link | 2, 1 | Ethernet, Wi-Fi |

**TLS** sits awkwardly in textbooks: the **handshake** is application-like, but **record encryption** wraps bytes before they hit TCP — treat it as **presentation + session** sitting above TCP.

---

## How to use this when debugging

| Symptom | Layer to suspect first |
| ------- | ---------------------- |
| Wrong IP, no route, NAT issues | Network (3) — Protocols/IP Addresses and Protocols, Protocols/NAT |
| Connection reset, timeouts, retransmits | Transport (4) — Protocols/TCP |
| Certificate errors, cipher mismatch | TLS / presentation — Protocols/TLS |
| 404, wrong Host header, REST semantics | Application (7) — Protocols/HTTP |
| Name resolves wrong | Application — Protocols/DNS |

Start at the **lowest layer that could explain the failure**, then move up.

---

## Related notes

- [Networking MOC](/learning/networking-master-moc) — full networking roadmap
- Protocols/00 Protocols MOC — protocols grouped by layer
- [How the Internet Works](/learning/networking-how-the-internet-works) — real-world path from app to wire
