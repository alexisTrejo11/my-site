# TCP

> Transmission Control Protocol — connection-oriented, reliable, ordered byte streams over IP.

**TCP** (Transmission Control Protocol) sits on [IP](/learning/networking-ip) and provides a **reliable, ordered byte stream** between two endpoints identified by **IP address + port**. Most web traffic ([HTTP](/learning/networking-http), [HTTPS](/learning/networking-https)), APIs, databases, and [GRPC](/learning/networking-grpc) run over TCP.

---

## Key properties

| Property | Behavior |
| -------- | -------- |
| **Connection-oriented** | Three-way handshake before data; explicit teardown |
| **Reliable** | Acknowledgments, retransmissions on loss |
| **Ordered** | Sequence numbers reorder out-of-order segments |
| **Flow control** | Receive window prevents overwhelming the receiver |
| **Congestion control** | Adjusts send rate when the network is saturated |

---

## Three-way handshake

Before application data flows, client and server exchange:

1. **SYN** — client proposes initial sequence number
2. **SYN-ACK** — server acknowledges and sends its own sequence
3. **ACK** — client acknowledges; connection is **ESTABLISHED**

Connection teardown uses a **four-way** close (FIN/ACK exchange) so both sides finish sending. Half-open states are tracked until timers expire.

---

## Connection state

TCP is **stateful**: each socket maintains sequence numbers, windows, and timers. Servers with many idle connections consume **memory and file descriptors**. Load balancers must preserve **session affinity** or use shared state when needed.

---

## Pros and cons

**Pros**

- Guaranteed delivery and ordering
- Built-in congestion and flow control
- Ubiquitous support in OS kernels and firewalls

**Cons**

- **Setup latency** (handshake before first byte)
- **Head-of-line blocking** — one lost segment delays the whole stream
- **Stateful** — harder to scale than [UDP](/learning/networking-udp) for some patterns
- Heavier per-connection overhead than UDP

For latency-sensitive media, apps often choose [UDP](/learning/networking-udp) or QUIC (HTTP/3) instead.

---

## Ports and multiplexing

One host IP can serve many services: **port numbers** (0–65535) distinguish processes. Well-known ports include **80** (HTTP), **443** (HTTPS), **5432** (PostgreSQL). Ephemeral ports identify client-side sockets.

---

## TCP vs [UDP](/learning/networking-udp)

| Aspect | TCP | UDP |
| ------ | --- | --- |
| Connection | Yes (handshake) | No |
| Reliability | Yes | Best effort |
| Ordering | Yes | No |
| Overhead | Higher | Lower |
| Typical uses | Web, APIs, SSH | DNS, VoIP, [WEB RTC](/learning/networking-webrtc), gaming |

---

## Common issues

- **SYN flood** — abuse of handshake (mitigated with SYN cookies)
- **TIME_WAIT** — many short connections leave sockets in wait state
- **Nagle’s algorithm** — small writes may be delayed (disable with `TCP_NODELAY` when tuning)
- **Keep-alive** — detects dead peers (optional, OS-dependent)

---

## Related notes

- [UDP](/learning/networking-udp) — connectionless alternative
- [TLS](/learning/networking-tls) — encryption layer above TCP
- [HTTP](/learning/networking-http), [HTTPS](/learning/networking-https) — application protocols on TCP
- [IP](/learning/networking-ip) — network layer below TCP
- [OSI Model](/learning/networking-osi-model) — TCP at layer 4
