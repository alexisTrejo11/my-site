# Kernel

The **kernel** is the **privileged core** of an operating system. It runs in a mode where it can configure **CPU features**, program **MMU** page tables, handle **interrupts**, and access **device registers** (usually via drivers).

## What the kernel is responsible for (typical)

- **Process/thread scheduling** — who runs on **[CPU](/learning/computer-architecture-cpu)** cores and when
- **Memory management** — virtual addresses, paging, COW, OOM policies
- **I/O subsystem** — block devices, filesystems, networking stacks (design varies by OS)
- **Security primitives** — credentials, capabilities (OS-specific), syscall filtering
- **Device model** — drivers attach to buses (PCIe, USB, I2C…)

## Kernel vs userspace

**Userspace** programs (browsers, shells, databases) request services through **system calls**. If userspace could touch arbitrary hardware directly, **stability and security** would collapse.

## Boot handoff

Firmware and a **bootloader** load the kernel image and pass **tables** describing hardware (ACPI on PCs, **device trees** on many ARM boards). See [Boot Sequence](/learning/computer-architecture-boot-sequence).

## Monolithic vs microkernel (vocabulary)

- **Monolithic (common)**: many drivers and subsystems live in one **kernel address space** for performance — a bug can be high impact.
- **Microkernel (idealized)**: smaller privileged core; more components as isolated services — IPC costs matter.

Real systems (Windows, Linux, macOS/XNU) are **hybrids** in practice; labels are not perfect.

## Related notes

- [Operating System Overview](/learning/operating-systems-operating-system-overview)
- [UEFI](/learning/computer-architecture-uefi) / [BIOS](/learning/computer-architecture-bios) — what runs *before* the kernel
- [Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths) — paging ties RAM to disk
