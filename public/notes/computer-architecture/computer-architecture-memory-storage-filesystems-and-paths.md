# Memory, storage, filesystems, and paths

This note ties together **volatile memory**, **persistent storage**, **filesystems**, and how **paths and URLs** mirror each other — ideas that were previously mixed into a single “internet” note.

## Performance: memory defines the ceiling

The **[CPU](/learning/computer-architecture-cpu)** executes instructions, but it only “sees” working data after it reaches **registers**, **cache**, and **RAM**. **Disks** (SSD/HDD) and **remote storage** are astronomically slower for random access than DRAM.

### Volatile vs persistent

| Volatile | Persistent |
|----------|------------|
| Registers, cache, **RAM** | SSD/HDD/NVMe, firmware flash, optical discs |
| Lost at power-off (for RAM, modulo hibernation images) | Retained without power (with caveats: flash wear, bit rot) |

**Firmware** (see [Boot Sequence](/learning/computer-architecture-boot-sequence)) lives in **nonvolatile** chips; **RAM** holds the **live** kernel and apps.

### Order-of-magnitude intuition (not exact on every machine)

- **DRAM** random access: tens of **nanoseconds** typical.
- **NVMe SSD**: tens to hundreds of **microseconds** for many operations — still vastly slower than DRAM for fine-grained pointer chasing.
- **HDD**: **milliseconds** seeks — catastrophic for latency if the working set misses RAM.

That gap is why **swapping** (paging cold pages to disk) hurts interactive performance.

### Swap and memory pressure

If working memory exceeds RAM, operating systems **evict** pages to a **swap** partition/file. That can work for **rare** oversubscription but becomes painful under steady pressure. Managed runtimes may **garbage-collect**, but **leaks** or **oversized in-memory caches** still hurt.

## HDD vs SSD (physical picture)

- **HDD**: spinning platters + moving heads; sequential throughput can be good; **random seeks** are costly; **fragmentation** mattered more historically for performance.
- **SSD**: no moving parts; fast random reads; writes are more complex (**erase blocks**, **wear leveling**). **TRIM** and controller algorithms matter.

## Filesystems: how bytes become “files”

Disks expose **sectors/blocks**. A **filesystem** indexes blocks into **files** and **directories** (trees). What you see as “folders” is the OS rendering that index.

### Common filesystems (examples)

| FS | Typical use |
|----|-------------|
| **FAT32** | removable media; simple; **4 GiB file size limit** |
| **exFAT** | large removable files (simplified picture) |
| **NTFS** | Windows internal disks; ACLs, journaling (feature set evolves) |
| **ext4** | common on Linux desktops/servers |
| **APFS** | Apple ecosystem (see [macOS](/learning/operating-systems-macos)) |

Pick filesystems for **compatibility**, **features** (permissions, encryption), and **failure modes** (journaling/copy-on-write).

## What “delete” usually means

Deleting often **removes directory entries** and marks blocks **free** without immediately overwriting them. **Forensics** can sometimes recover data until blocks are reused. **Encryption** changes the story: without keys, recovered ciphertext may be useless.

**Secure erase** is a policy/tooling topic (SSD trim vs overwrite myths) — treat media-specific guidance seriously.

## Encryption and cloud

**Full-disk encryption** protects **at-rest** confidentiality if the device is stolen — keys are tied to your password/secure enclave/TPM (platform-specific).

**Cloud storage** is **someone else’s computer**: uploads are **copies** moved over the network to **data centers** with their own durability and security models.

## Paths and URLs (the same idea)

### Filesystem paths

- **Windows** tradition: drive letters + backslashes: `C:\Users\alice\file.txt`
- **Unix** (Linux, macOS, Android, iOS userland): **single root** `/` and forward slashes: `/home/alice/file.txt`

### URLs

`https://example.com/images/cat.png`

- **Scheme** (`https`) chooses protocol (TLS-backed HTTP).
- **Authority** (`example.com`) maps via **Fundamentals/Networking/Protocols/DNS** to **[IP](/learning/networking-ip-addresses-and-protocols)**.
- **Path** (`/images/cat.png`) mirrors “folders + file”.

Showing **extensions** and full paths in the OS UI is useful for developers even if “friendly” defaults hide them.

## Related notes

- [Electronic Circuits](/learning/computer-architecture-electronic-circuits) — DRAM capacitors vs SSD flash cells (cartoon level)
- [Operating System Overview](/learning/operating-systems-operating-system-overview) — permissions, paging, and device access
- [How the Internet Works](/learning/networking-how-the-internet-works) — why “far away bytes” feel slower
