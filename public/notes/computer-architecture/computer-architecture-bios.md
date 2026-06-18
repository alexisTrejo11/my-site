# BIOS

**BIOS** (Basic Input/Output System) traditionally refers to **PC firmware** stored in a ROM/flash chip on the motherboard. It provides **low-level services** to boot an operating system on **x86** machines.

## What BIOS did (classic model)

- **POST** and minimal hardware initialization: [Boot Sequence](/learning/computer-architecture-boot-sequence).
- **Int 10h / 13h**-era services (historical) for very early video and disk access.
- A **boot order** list and a **master boot record (MBR)**-oriented boot path on older systems.

## BIOS vs UEFI today

Modern PCs mostly ship **[UEFI](/learning/computer-architecture-uefi)**, which can **emulate** BIOS expectations for older software. When people say “enter the BIOS”, they often mean “open the **firmware setup UI**”, whether the underlying platform is legacy BIOS or UEFI.

## Security note (high level)

Legacy BIOS-era boot models assumed a **friendly local operator**. Modern platforms add **verified boot** chains (vendor-specific) because **persistence** and **bootkit** attacks target firmware.

## Related notes

- [UEFI](/learning/computer-architecture-uefi)
- [Boot Sequence](/learning/computer-architecture-boot-sequence)
- [Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths) — partitioning (GPT vs MBR) interacts with boot
