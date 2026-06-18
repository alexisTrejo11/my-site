# How the Internet Works

> End-to-end mental map — from user input to bits on the wire, through ISPs, DNS, IP routing, encryption, and CDNs.

End-user apps (chat, web, games) feel instant, but underneath they are **serialized into bits**, grouped into **frames/packets**, forwarded by **routers**, and buffered in **queues**. This note is a **mental map** of that path.

---

## 1. From text to bits on the wire

User input becomes **Unicode** in apps, then typically **UTF-8 bytes** on the wire inside **TLS** records (for modern HTTPS/WSS). At the lowest layers, everything becomes **[bits](/learning/computer-architecture-bit)** on a medium: Ethernet pulses, Wi-Fi symbols, fiber light patterns, or cellular radio.

---

## 2. The first hops: Wi-Fi or cellular

Your phone talks to:

- a **Wi-Fi access point**, or
- a **cellular base station** (4G/5G)

Those hops move your packets toward an **ISP** edge.

---

## 3. Modem / CPE and ISP

A home **modem** (often integrated with a **router/Wi-Fi AP**) bridges access-network tech (cable/DSL/fiber/PON) to **IP** routing. The **ISP** provides **global connectivity** and **addressing** (often via **DHCP** and **[NAT](/learning/networking-nat)** for consumers).

---

## 4. The wide area: fiber, IXPs, and peering

ISPs interconnect at **Internet Exchange Points (IXPs)** and private peering facilities. **Submarine cables** and long-haul fiber tie continents together. **BGP** (not memorized here) is how providers **choose routes** between autonomous networks.

---

## 5. Finding the right server: DNS and IP

Apps use names; the network needs **addresses**. **[DNS](/learning/networking-dns)** resolves names to **A/AAAA** records. Then **[IP](/learning/networking-ip) routing** delivers packets toward the destination network.

---

## 6. Encryption: what is protected?

Modern chat and web traffic often uses **public-key cryptography** to bootstrap **symmetric session keys** ([TLS](/learning/networking-tls)). The **payload** can be confidential, but **metadata** still exists:

- source/destination addresses and ports
- packet sizes and timing
- DNS query patterns (unless you use privacy-enhanced transports like **DoH/DoT** with caveats)

Threat modeling matters: “encrypted” is not the same as “anonymous”.

---

## 7. Mobility and caching

**Cellular handoff** moves your radio attachment between towers while keeping sessions alive (when it works). **CDNs** cache popular content close to users (for example video) to cut latency and backbone load — see also **[Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths)** for why “nearby bytes” feel faster.

**Satellite internet** still lands traffic into the same ISP and data-center ecosystem once it hits a ground station.

---

## Where to go next

| Topic | Note |
| ----- | ---- |
| Full networking roadmap | [Networking MOC](/learning/networking-master-moc) |
| Layer vocabulary | [OSI Model](/learning/networking-osi-model) |
| All protocols | Protocols/00 Protocols MOC |

---

## Related notes

- Protocols/IP Addresses and Protocols
- Protocols/DNS
- Protocols/NAT
- [Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths) — latency hierarchy complements network distance
