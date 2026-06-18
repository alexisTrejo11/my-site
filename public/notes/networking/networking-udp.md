# UDP

> User Datagram Protocol — connectionless transport, trade-offs vs TCP, and common use cases.

**UDP** (User Datagram Protocol) is a **simple, connectionless** transport protocol. It lets applications on a host talk to each other using **ports**, so **many applications** can run at once on the **same IP address**.

---

## Role of UDP

- Carries application data between endpoints identified by **IP + port**.
- Does **not** establish a session before sending — datagrams go out as soon as the app writes them.
- Fits workloads where **speed** and **low overhead** matter more than **guaranteed delivery**.

---

## UDP vs [TCP](/learning/networking-tcp)

| Aspect | UDP | TCP |
| ------ | --- | --- |
| Connection | **Connectionless** — no handshake | **Connection-oriented** — handshake required |
| State | **Stateless** — no connection state kept on the server | **Stateful** — tracks sequence, windows, retransmits |
| Delivery | **Best effort** — no guarantee packets arrive | **Reliable** — acknowledges and retransmits |
| Overhead | **Light** — small header, less work per packet | **Heavier** — more control traffic and bookkeeping |
| Speed | Typically **faster** for bursty or real-time traffic | More latency early on (setup + reliability machinery) |

UDP is simpler than TCP: there is **no prior negotiation** and the stack does **not** maintain per-connection state the way TCP does. That enables **faster** data transmission when the application can tolerate loss or reordering.

---

## Trade-offs

**Advantages**

- Low latency and overhead.
- No connection setup — good for short request/response patterns.
- Application chooses what “reliability” means (if anything).

**Disadvantages**

- **No delivery guarantee** — packets can be lost, duplicated, or arrive out of order.
- No built-in flow control or congestion control like TCP.
- Whether that hurts or helps depends entirely on the **application**.

---

## Multiplexing

A single host IP can serve **many applications** at once. **Multiplexing** uses a **unique port** per service or socket so incoming datagrams are delivered to the correct process (for example web on 443, DNS on 53, a game on a high ephemeral port).

---

## Common use cases

### Video streaming

Live and real-time media often **tolerate some loss** (a dropped frame is better than freezing while TCP retries). UDP matches that model.

### VPN tunnels

Many VPN designs run over UDP to **avoid double TCP** (TCP inside TCP can hurt performance and congestion behavior). The tunnel adds its own framing and encryption.

### [DNS](/learning/networking-dns)

**DNS** commonly uses UDP for short queries (name → [IP address](/learning/networking-ip-addresses-and-protocols)). UDP keeps lookups fast, but DNS over UDP has well-known **security** concerns (for example **DNS cache poisoning** / spoofing). Modern deployments also use **DNS over TLS/HTTPS** where policy requires it.

### [WEB RTC](/learning/networking-webrtc)

**WebRTC** enables **peer-to-peer**, **real-time** communication (voice, video, data channels). It relies on UDP (and related mechanisms) so media can flow with low latency between peers.

---

## Summary

UDP is a **simple, connectionless** protocol for **efficient** datagram delivery without setting up a connection first. It shines when the app accepts **best-effort** delivery: **streaming**, **DNS lookups**, **VPN encapsulation**, **WebRTC**, and other **peer-to-peer** or **real-time** patterns. Pair it with application logic (or a higher protocol) when you need reliability, ordering, or security guarantees TCP does not provide on its own.

---

## Related notes

- [TCP](/learning/networking-tcp) — reliable alternative
- [IP](/learning/networking-ip) — network layer below UDP
- [DNS](/learning/networking-dns), [WEB RTC](/learning/networking-webrtc)
- [OSI Model](/learning/networking-osi-model) — layer 4
