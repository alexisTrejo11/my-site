# Operating system overview

An **operating system (OS)** is the **mediation layer** between **applications** and **hardware**. It turns messy device reality into **stable abstractions**: files, sockets, processes, windows, permissions.

## Drivers and APIs

- **Device drivers** teach the kernel how to talk to specific hardware (NICs, GPUs, NVMe controllers…).
- **System calls** are the controlled door from user code into the kernel.
- **Libraries and frameworks** wrap syscalls into ergonomic **APIs**.

This is why your camera app does not hardcode a sensor part number.

## Resource management

The OS **multiplexes** finite hardware:

| Resource | What the OS does (simplified) |
|----------|-------------------------------|
| **CPU time** | Schedules threads/processes with priorities and fairness policies |
| **RAM** | Virtual memory, paging, reclamation, caches |
| **Devices** | Serializes access, enforces permissions, handles interrupts |
| **Disk I/O** | Buffering, scheduling, filesystem consistency |

When a process misbehaves, the OS may **kill** it to protect the rest of the system (OOM killer on Linux, jetsam on iOS, etc.).

## Interactive vs throughput workloads

Games and audio paths often need **low jitter**; schedulers may treat them specially. Background sync jobs prefer **throughput**. Real systems balance both.

## Filesystems and security basics

Different OS families prefer different default filesystems — see [Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths) for APFS/NTFS/ext4/FAT trade-offs.

Common security layers:

- **User accounts and ACLs** — who can read/write which objects
- **Full-disk encryption** — protects data at rest
- **Keychains / keystores** — protect credentials and key material (platform-specific)

## Privilege rings (Intel-style mental model)

Many textbooks describe **rings**:

- **Ring 0**: **[Kernel](/learning/operating-systems-kernel)** — can touch privileged CPU features and map hardware.
- **Higher rings**: normal applications.

Modern platforms add **hypervisors**, **secure enclaves**, and **firmware** trust boundaries — the picture is richer than “one kernel”.

## Virtual machines and the cloud

A **hypervisor** multiplexes hardware into **virtual machines**. Public cloud “instances” are usually **VMs** or **containers** on shared hosts, with **network isolation** enforced by software and hardware.

## App distribution and signatures

Mobile OSes often require **signed binaries** and **store review** (policy varies). Desktop OSes are more permissive by default — **trade-off: flexibility vs malware risk**.

## Related notes

- [Kernel](/learning/operating-systems-kernel)
- [Boot Sequence](/learning/computer-architecture-boot-sequence)
- [macOS](/learning/operating-systems-macos) — one vendor’s integrated stack example
- [CPU](/learning/computer-architecture-cpu) — what is being scheduled
