# Electronic circuits

Electronic circuits **control the flow of electric charge** through conductors and components. That controlled flow is how devices sense the world, compute, store bits, and move data.

## Voltage, current, and power (intuition)

- **Voltage (V)** is electrical “pressure” that pushes charge.
- **Current (A)** is how much charge flows per second through a path.
- Practical circuits balance both: too much current through a delicate part causes **heat** or damage.

Household mains voltages vary by region (for example ~120 V or ~230 V). Small batteries are low voltage (for example 1.5 V per AA cell).

## Basic building blocks

| Component | Role |
|-----------|------|
| **Resistor** | Limits current / drops voltage; often converts excess energy to heat |
| **LED** | Emits light when current flows; usually needs a **series resistor** to avoid overload |
| **Motor** | Converts electricity to motion (many kinds: brushed, brushless, servo, traction) |
| **Speaker** | Drives a diaphragm using a varying current (an audio waveform) |
| **Switch** | Opens or closes a conductive path |
| **Transistor** | An **electronically controlled** switch or amplifier — the workhorse of digital logic |

**Thermistors** change resistance with temperature; they appear in sensors and protection circuits.

## From analog signals to digital bits

Computers ultimately store and move **[bits](/learning/computer-architecture-bit)**. In many memories, a cell’s **charged vs empty** state (simplified) represents **1 vs 0**. [Processors](/learning/computer-architecture-cpu) interpret patterns of bits as **data** and **instructions**.

## Storage media (physical picture)

- **DRAM** uses tiny capacitors per cell; it is **volatile** (needs refresh; fades when powered off).
- **Hard disks** store patterns in **magnetic domains** on spinning platters.
- **SSDs** store charge in **nonvolatile** semiconductor structures (no moving parts, very different failure modes than HDDs).

More on filesystems and deletion semantics: [Memory Storage Filesystems and Paths](/learning/computer-architecture-memory-storage-filesystems-and-paths).

## Related notes

- [CPU](/learning/computer-architecture-cpu)
- [Bit](/learning/computer-architecture-bit)
- [SoC and GPU](/learning/computer-architecture-soc-and-gpu) — massive parallelism packs **many transistors** into GPUs and SoCs
