# Boot sequence

When you press power, **electricity reaches the motherboard** and a coordinated sequence starts that ends in a running operating system. The same *idea* appears on PCs, phones, TVs, and embedded boards — details differ, but the layers rhyme.

## 1. Power reaches the board

Current from the PSU or battery energizes regulators and clocks. Signals are ultimately **[bits](/learning/computer-architecture-bit)** — patterns of high/low levels interpreted as zeros and ones.

## 2. Firmware runs first

A motherboard **executes startup code** from firmware:

- On many PCs: **[UEFI](/learning/computer-architecture-uefi)** (modern) or legacy **[BIOS](/learning/computer-architecture-bios)**.
- On many **Android** phones: a chain starting from a **Primary Bootloader (PBL)** stage (vendor-specific).
- On **iPhone**: **Secure ROM** then **iBoot** stages (Apple-specific, high assurance).

Firmware is responsible for **early hardware setup** and for locating the **next stage** of boot software.

## 3. POST: “does the machine look sane?”

**POST** (Power-On Self Test) checks critical hardware: display path, keyboard, storage controllers, RAM subsets, and more. Odd beeps or diagnostic LEDs often map to **POST failure codes** (vendor-specific).

If POST succeeds, firmware looks for a **bootloader** on a configured device (internal storage, USB, PXE, etc.).

## 4. Loading the OS begins

Firmware reads a bootloader image from **nonvolatile storage** (SSD, eMMC, SPI flash). That loader understands how to fetch the **OS kernel** and hand it control.

## 5. The CPU executes the kernel

The **[Kernel](/learning/operating-systems-kernel)** is the OS core: it manages memory, processes, devices (through drivers), and security boundaries. User sessions, windowing, and **[higher-level OS services](/learning/operating-systems-operating-system-overview)** start after the kernel brings up enough hardware.

## 6. Userspace, login, and drivers

After the kernel initializes subsystems, userspace starts **daemons** and **login** flows. **Drivers** teach the OS how to talk to specific GPUs, NICs, trackpads, and sensors. **Pixels** on screen are ultimately memory buffers interpreted by display hardware.

## Mental model

**Firmware → bootloader → kernel → drivers/userspace.**  
If you debug boot issues, identify **which stage** fails: power, firmware settings, disk visibility, loader signature policy, kernel panic, or driver init.

## Related notes

- [UEFI](/learning/computer-architecture-uefi) / [BIOS](/learning/computer-architecture-bios)
- [CPU](/learning/computer-architecture-cpu) — executes the instructions at each stage
- [Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths) — where boot artifacts live on disk
- [Operating System Overview](/learning/operating-systems-operating-system-overview) — what the OS does once it is alive
