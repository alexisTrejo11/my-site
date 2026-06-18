# SoC and GPU

Two hardware trends explain a lot of consumer devices: **SoCs** integrate many subsystems onto one package, and **GPUs** provide **massive parallelism** for graphics and many non-graphics workloads.

## System on a Chip (SoC)

An **SoC** places **multiple IP blocks** on one die/package: **CPU cores**, **GPU**, **DSP/ISP**, **NPU/AI accelerators**, **memory controllers**, **storage controllers**, **cellular/Wi-Fi/BT** radios (sometimes as separate RF modules, but tightly integrated), and security processors.

### Why integration wins on phones

- **Shorter wires** between blocks reduce latency and power.
- **Shared memory** architectures can reduce copies (trade-offs: contention and complexity).
- **Thermal and battery budgets** favor fewer discrete packages.

### Unified memory (high level)

Many SoCs use **system RAM** for graphics and accelerators instead of only dedicated **GDDR** like discrete gaming GPUs. **Bandwidth sharing** becomes a first-class performance issue.

### NPUs / “AI silicon”

Dedicated **matrix multiply** units speed **on-device inference** (camera, speech, ranking). They complement the **[CPU](/learning/computer-architecture-cpu)** rather than replace general-purpose control flow.

## GPU: throughput via parallelism

A **GPU** executes **many simple tasks concurrently** (SIMT/SIMD flavor, vendor-specific). That matches **pixels**, **vertices**, **video frames**, and large **linear algebra** kernels.

### CPU vs GPU (caricature)

- **CPU**: strong at **branchy** sequential code, low latency per thread, large caches.
- **GPU**: strong at **throughput** when work is **parallel** and memory access is coalesced reasonably well.

### VRAM

Discrete GPUs use **VRAM** (high-bandwidth memory local to the card). Integrated GPUs consume **system RAM** bandwidth.

### CUDA (NVIDIA) and the idea of “compute shaders”

**CUDA** (vendor-specific) popularized **GPGPU**: writing numeric kernels for GPUs beyond graphics APIs. Cross-vendor graphics/compute paths include **Vulkan**, **Metal**, and **OpenCL** (adoption varies).

## Where GPUs matter beyond games

- **Deep learning training** (large matrix ops)
- **Rendering** and **video encode/decode**
- **Scientific simulation**
- **Cryptography** (some algorithms map well — others do not)

Demand spikes can make **GPU supply** a macroeconomic signal.

## Cooling reality

Hot silicon needs **fans**, **heatpipes**, **liquid loops**, or in datacenters **rack-level** cooling. **Mobile SoCs** throttle aggressively when **junction temperature** rises.

## Related notes

- [CPU](/learning/computer-architecture-cpu)
- [Electronic Circuits](/learning/computer-architecture-electronic-circuits) — transistors at the physical base
- [macOS](/learning/operating-systems-macos) — Apple’s vertical integration of SoC + OS + filesystem
