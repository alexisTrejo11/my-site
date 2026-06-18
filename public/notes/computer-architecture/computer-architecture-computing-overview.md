# Computing overview

This folder explains how modern devices work from **signals and bits** up to **networks and operating systems**. The goal is a compact mental model for studying programming and systems work without drowning in vendor detail.

## How the pieces connect

1. **Information** is represented as [bits](/learning/computer-architecture-bit) and [bytes](/learning/computer-architecture-byte).
2. **Hardware** ([Electronic Circuits](/learning/computer-architecture-electronic-circuits), [CPU](/learning/computer-architecture-cpu), [SoC and GPU](/learning/computer-architecture-soc-and-gpu)) manipulates those representations using electricity and logic.
3. **Firmware** ([BIOS](/learning/computer-architecture-bios), [UEFI](/learning/computer-architecture-uefi)) runs first and hands control to the OS via the [Boot Sequence](/learning/computer-architecture-boot-sequence).
4. **Networks** ([How the Internet Works](/learning/networking-how-the-internet-works), Fundamentals/Networking/Protocols/DNS, [IP Addresses and Protocols](/learning/networking-ip-addresses-and-protocols)) route packets between machines using addresses and names.
5. **Storage** ([Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths)) explains RAM, disks, filesystems, and why “delete” is not always instant erasure.
6. **Operating systems** ([Operating System Overview](/learning/operating-systems-operating-system-overview), [Kernel](/learning/operating-systems-kernel), [macOS](/learning/operating-systems-macos)) schedule work, isolate programs, and expose hardware through drivers and APIs.

## Suggested reading order

| Order | Topic | Starting note |
|------:|-------|-----------------|
| 1 | Data representation | [Bit](/learning/computer-architecture-bit) → [Byte](/learning/computer-architecture-byte) |
| 2 | Core hardware | [Electronic Circuits](/learning/computer-architecture-electronic-circuits) → [CPU](/learning/computer-architecture-cpu) |
| 3 | Boot | [Boot Sequence](/learning/computer-architecture-boot-sequence) with [UEFI](/learning/computer-architecture-uefi) / [BIOS](/learning/computer-architecture-bios) |
| 4 | Networking | [IP Addresses and Protocols](/learning/networking-ip-addresses-and-protocols) → Fundamentals/Networking/Protocols/DNS → [How the Internet Works](/learning/networking-how-the-internet-works) |
| 5 | Storage and OS | [Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths) → [Operating System Overview](/learning/operating-systems-operating-system-overview) → [Kernel](/learning/operating-systems-kernel) |

Return to the table of contents: [Computing Master Index](/learning/moc).
