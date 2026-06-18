# Byte

A **byte** is a unit of digital information made of **eight [bits](/learning/computer-architecture-bit)**. One byte can represent **256** distinct patterns (\(2^8\)).

The word **octet** means the same thing as an 8-bit byte (common in networking standards). English material often labels bytes with **B**; do not confuse **B** (byte) with **b** (bit).

## What bytes are used for

- **Measuring storage and bandwidth** — file size, RAM size, network throughput (watch bit vs byte on spec sheets).
- **Representing symbols** — classic **ASCII** maps numbers 0–127 to letters, digits, and control codes; extended sets use the full 0–255 range in single-byte encodings (modern text often uses multi-byte Unicode on disk, but the byte remains the addressable unit in many filesystems and protocols).

## History (short)

Early machines had **variable-width “bytes”** sized to fit one character on that architecture. By the **1960s**, **8 bits per byte** became the dominant convention (including wide use in IBM-influenced designs), which aligned well with hardware widths and character sets of the era.

## Voltage and timing (conceptual)

In many technologies, a **1** or **0** corresponds to different **voltage levels** on a line; the **clock** defines when those levels are sampled. Faster clocks (together with wider datapaths and parallelism) contribute to higher performance — at the cost of heat and power, as discussed in [CPU](/learning/computer-architecture-cpu).

## Related notes

- [Bit](/learning/computer-architecture-bit)
- [IP Addresses and Protocols](/learning/networking-ip-addresses-and-protocols) — IPv4 addresses are often written as **four bytes** in decimal
