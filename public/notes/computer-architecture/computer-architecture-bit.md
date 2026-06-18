# Bit

A **bit** (binary digit) is the smallest unit of digital information. It takes **one of two states**, written: **0** or **1**.

## Why only two states?

Reliable hardware is good at distinguishing **two** stable levels — for example, a transistor channel that is **strongly conducting** vs **strongly off**, or a capacitor cell **charged** vs **not charged** within a detection window. Binary encoding matches that physical reality.

## Common metaphors

| 0 | 1 |
|---|---|
| Off | On |
| False | True |
| Low voltage | High voltage (in many logic families) |

These are **conventions**; what matters is that the system agrees on how to interpret the two levels.

## Bits compose larger values

- **N bits** can represent **\(2^N\)** distinct patterns.
- Eight bits form one [Byte](/learning/computer-architecture-byte) (256 patterns), which is why you see **0–255** per octet in **IPv4** notation: [IP Addresses and Protocols](/learning/networking-ip-addresses-and-protocols).

## Where bits show up in the stack

- **Firmware and boot** read early-stage code as bit patterns from flash or disk: [Boot Sequence](/learning/computer-architecture-boot-sequence).
- **Networking** frames and packets are serialized as bits on a wire or as symbols on a radio channel: [How the Internet Works](/learning/networking-how-the-internet-works).
- **Cryptography** treats keys and ciphertext as bit strings; “metadata” can still leak **who/when/where** even if payload bits are encrypted.

## Related notes

- [Byte](/learning/computer-architecture-byte)
- [Electronic Circuits](/learning/computer-architecture-electronic-circuits) — physical implementation of 0/1 storage and switching
