# NAT

> Network Address Translation — sharing public IPv4, NAT tables, port forwarding, and developer implications.

**NAT** (Network Address Translation) lets many devices on a **private** network share one or few **public** [IP addresses](/learning/networking-ip-addresses-and-protocols). Home routers, office gateways, and cloud NAT gateways all perform variants of the same idea.

---

## Why NAT exists

**IPv4** has ~4.3 billion addresses — not enough for every phone, laptop, and IoT device. **Private ranges** (RFC 1918: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) are reusable inside LANs but **not routable on the public Internet**.

NAT bridges private ↔ public at the network edge.

---

## How it works (NAPT / PAT)

Most home NAT is **Network Address Port Translation**:

1. Internal host `192.168.1.50:54321` sends a packet to `203.0.113.10:443`
2. Router rewrites **source** to `198.51.100.5:60001` (public IP + ephemeral port)
3. Router stores mapping in a **NAT table**
4. Return packets to `198.51.100.5:60001` are rewritten back to `192.168.1.50:54321`

The WAN sees traffic from the **router’s public IP**, not each laptop individually.

---

## NAT table

| Field | Role |
| ----- | ---- |
| Internal IP:port | Private host socket |
| External IP:port | Translated public side |
| Destination | Remote peer |
| Protocol | Usually [TCP](/learning/networking-tcp) or [UDP](/learning/networking-udp) |
| Timeout | Entry expires when connection idle |

Table exhaustion can cause **mysterious connection failures** under heavy outbound load.

---

## Port forwarding

**Port forwarding** (static NAT) maps a **public port** to a **specific internal host** — e.g. expose a home server or game host. Required because inbound connections to private IPs are not routed from the Internet without explicit rules.

---

## NAT and developers

| Scenario | Effect |
| -------- | ------ |
| **P2P** ([WEB RTC](/learning/networking-webrtc), torrents) | Peers behind symmetric NAT may need **STUN/TURN** relays |
| **Webhooks to localhost** | Need tunnel (ngrok, cloudflare tunnel) — inbound NAT blocks |
| **Server logs** | You see public NAT IP, not true client (use `X-Forwarded-For` behind proxies carefully) |
| **Container egress** | Kubernetes nodes often SNAT pod traffic |

NAT is **not a firewall**, but it blocks unsolicited inbound traffic by default.

---

## NAT vs IPv6

IPv6 reduces **address** pressure; **IPv6 NAT** (NPT) exists but global addresses are the design goal. IPv4 NAT remains ubiquitous for years.

---

## Related notes

- [IP Addresses and Protocols](/learning/networking-ip-addresses-and-protocols) — public vs private ranges
- [IP](/learning/networking-ip) — headers NAT modifies
- [TCP](/learning/networking-tcp), [UDP](/learning/networking-udp) — port fields in NAT mappings
- [How the Internet Works](/learning/networking-how-the-internet-works) — ISP and home router context
