# UEFI

**UEFI** (Unified Extensible Firmware Interface) is the **modern PC firmware** standard that replaces most classic **[BIOS](/learning/computer-architecture-bios)** behavior on contemporary systems.

## What UEFI improves (conceptually)

- **Structured boot services** and a **C-friendly** runtime model compared with very old BIOS mechanisms.
- **GPT disks** and flexible boot entries (operating systems install their own boot managers/ loaders).
- **Secure Boot** (when enabled) checks **signatures** on boot components to reduce **pre-OS malware** — trade-offs exist with dual-booting and custom kernels (platform- and distro-specific).

## How it fits the boot story

At power-on, the platform still runs **early init** and **POST**-like checks, then UEFI loads a configured **OS loader** from EFI system partitions or other paths. See [Boot Sequence](/learning/computer-architecture-boot-sequence).

## Phones are different

Mobile SoCs use vendor boot chains (not “UEFI” in the PC sense), though some ideas overlap: **stages**, **verified images**, **device trees** or ACPI tables. Compare with [SoC and GPU](/learning/computer-architecture-soc-and-gpu).

## Related notes

- [BIOS](/learning/computer-architecture-bios)
- [Kernel](/learning/operating-systems-kernel) — what UEFI ultimately hands off to (via a loader)
- [Operating System Overview](/learning/operating-systems-operating-system-overview) — drivers and rings after the kernel starts
