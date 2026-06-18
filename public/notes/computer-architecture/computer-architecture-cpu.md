# CPU

A **CPU** (central processing unit) executes instructions, performs arithmetic, and coordinates work on a chip built from **transistors** (see [Electronic Circuits](/learning/computer-architecture-electronic-circuits)). You find CPUs in phones, laptops, servers, cars, ATMs, and many embedded devices.

## Transistors and throughput

Inside the CPU, transistors implement **logic and arithmetic** and move data between small, very fast on-chip memories (**registers**, **cache**). Advertised **clock frequency** (Hz) counts how many cycles occur per second; more cycles per second can mean more work **if** the pipeline can be fed efficiently — but **IPC** (instructions per cycle), **memory latency**, and **thermals** matter just as much.

## Manufacturing snapshot

Most processors are fabricated on **silicon wafers** using photolithography (today often **EUV** for cutting-edge nodes). Smaller features let designers pack **more transistors** per area, enabling more cores, larger caches, and new accelerators — again bounded by **power and heat**.

## Temperature and cooling

Higher performance generally draws more current and produces more heat. Without **heatspreaders, fans, liquid cooling**, or aggressive **throttling**, chips hit thermal limits and slow down to protect themselves.

## Memory hierarchy (what the CPU actually touches)

From fastest/smallest to slower/larger:

| Layer | Role |
|-------|------|
| Registers / L1–L3 cache | Tiny, extremely fast storage close to execution units |
| RAM | Working set for running programs |
| SSD / HDD / network storage | Persistent or remote data — must be copied toward RAM before the CPU can operate on it directly |

This hierarchy is why “disk-bound” workloads behave differently from “CPU-bound” ones. More detail lives in [Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths).

## Architectures you will hear about

- **x86-64** — dominant on PCs and many servers.
- **ARM** — strong in phones and efficient laptops; also common in servers and embedded.
- **RISC** — design philosophy (simpler instructions, compiler-friendly); **ARM** is often described as RISC-family.

Modern cores also use **speculative execution** to speed common code paths; it created famous **security trade-offs** (side channels) that OS and CPU vendors mitigate over time.

## Cores and product stacks

Vendors increase throughput by **adding cores**, **widening SIMD**, and improving **branch prediction** — not only by raising GHz. Commercial CPU lines (for example Core i3/i5/i7 class branding) often share a **microarchitecture** and differ in core count, cache, clocks, and binning after manufacturing test.

## Assembly and your programs

**Assembly** is a human-readable view of **machine instructions**. Higher-level languages compile or interpret down to the instruction streams the CPU executes, using **RAM addresses** and **registers** behind the scenes.

## Related notes

- [Electronic Circuits](/learning/computer-architecture-electronic-circuits)
- [SoC and GPU](/learning/computer-architecture-soc-and-gpu) — graphics and AI throughput often come from **GPUs** or **NPUs**, not the CPU alone
- [Boot Sequence](/learning/computer-architecture-boot-sequence) — early instructions the CPU runs come from firmware and the bootloader
- [Kernel](/learning/operating-systems-kernel) — the OS kernel schedules **which** code runs on the CPU and **how** memory is virtualized
