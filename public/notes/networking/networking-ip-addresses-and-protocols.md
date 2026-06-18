# IP Addresses and Protocols

> IPv4 and IPv6 address formats, public vs private space, loopback, and how IANA/RIRs allocate addresses.

An **IP address** identifies a **network interface** (not always a whole “device”, because one machine can have many interfaces). **[IP](/learning/networking-ip)** is part of the **Internet layer** in common teaching stacks; it delivers packets across networks with **routing**.

---

## IPv4: dotted quads

**IPv4** addresses are **32 bits**, usually written as **four decimal octets** separated by dots:

`203.0.113.10`

Each octet is **one [Byte](/learning/computer-architecture-byte)** (8 bits), so each number is in **0–255**. Total unique addresses: about **\(2^{32} \approx 4.3 \times 10^9\)** — not enough for every gadget today.

---

## Why IPv6 exists

Growth in phones, laptops, servers, and **IoT** exhausted the practical supply of **public IPv4**. Mitigations like **[NAT](/learning/networking-nat)** extended IPv4’s life, but **IPv6** is the long-term expansion:

- **128-bit** addresses, written as **eight groups** of **hex** quartets, separated by colons.
- Example (illustrative): `2001:0db8:0000:0042:0000:8a2e:0370:7334`
- Leading zeros in a group can be trimmed; **one** contiguous all-zero run may be shortened to `::` (rules are precise — use a calculator/tool when editing).

---

## Public vs private IPv4 space

| Kind        | Meaning                                                                             |
| ----------- | ----------------------------------------------------------------------------------- |
| **Public**  | Routable on the global Internet; must be uniquely assigned to avoid clashes         |
| **Private** | Used **inside** LANs; the same private ranges can repeat in different homes/offices |

Common **RFC 1918** private ranges: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.

**NAT** on a home/office **router** maps **many private** hosts to **one public** address (or a small pool). NAT tracks **connections** so return traffic reaches the correct internal host.

---

## Special addresses

- **`127.0.0.1` (IPv4 loopback)** — “this host”. Commonly called **localhost** with [DNS](/learning/networking-dns) name `localhost`.
- **`::1` (IPv6 loopback)** — IPv6 equivalent of localhost.
- **APIPA / link-local** ranges exist for “no DHCP” scenarios (details vary by OS).

---

## Who coordinates addresses?

**IANA** allocates large blocks to **RIRs** (Regional Internet Registries). RIRs assign space to ISPs and large organizations. **ICANN** coordinates DNS root policy (related but not identical to IP allocation).

---

## For developers

You often use **hostnames** and libraries, not raw addresses — but you still need IP literacy for:

- Debugging **firewalls**, **[TLS](/learning/networking-tls)**, **VPC** rules, and **container networking**
- Understanding **dual-stack** behavior (A vs AAAA records from [DNS](/learning/networking-dns))
- Reading **logs** and **traceroutes**

---

## Related notes

- [IP](/learning/networking-ip) — IP protocol headers and behavior
- [DNS](/learning/networking-dns) — names to addresses
- [NAT](/learning/networking-nat) — private address sharing
- [How the Internet Works](/learning/networking-how-the-internet-works) — packets, ISPs, IXPs
- [Byte](/learning/computer-architecture-byte) — why IPv4 uses four 0–255 numbers
