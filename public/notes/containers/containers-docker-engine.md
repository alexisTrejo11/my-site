>Docker Engine (the service running on your machine) works natively only on Linux. On Windows and [macOS](/learning/operating-systems-macos), Docker runs inside a lightweight Linux virtual machine.

### 1. Docker Engine does run natively on Linux.

- The Docker daemon (the service that manages containers, images, networks, and volumes) was designed for Linux.
- It utilizes Linux kernel features such as:
	 - Namespaces (process isolation)
	 - Cgroups (resource limiting)
	 - Union filesystems (image layers)

### 2. On Windows and macOS

When you install Docker Desktop:

 - A very lightweight Linux virtual machine is created (using Hyper-V on Windows or HyperKit on macOS).
- The native Linux Docker Engine runs inside that VM.
- Your containers run inside that Linux VM.

### 3. Containers vs. Engine

- Containers: They can run different Linux distributions (Ubuntu, Alpine, CentOS) but always on the host Linux kernel. They cannot run native Windows containers unless you use Windows containers (a different type).

- Engine: The daemon that orchestrates everything always needs a Linux kernel (directly or via a VM).

---

## Docker Engine vs Kubernetes on the node

| Layer | Docker (local) | Kubernetes (cluster) |
| ----- | -------------- | -------------------- |
| CLI / API | `docker` CLI → Docker daemon | `kubectl` → API server → **kubelet** |
| Runtime | Docker Engine (containerd inside Desktop) | **containerd** / CRI-O via **CRI** |
| Unit of run | Container | **Pod** (one or more containers) |
| Orchestration | Single host (Compose/Swarm optional) | Control plane + schedulers |

Deep dive: Kubernetes Master Roadmap · Containers/Kubernetes/01 Architecture and Cluster/02 Worker Nodes Anatomy