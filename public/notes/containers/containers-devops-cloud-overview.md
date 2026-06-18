> Docker is software plattform that allows create, deploy and execute application inside of containers. Basically, it's the tool that made the classic programmer phrase, "But it worked on my computer," obsolete.


# 1. What is it and what is it for?

Docker packages and application and all his dependencies in a standard unit called container

- **Portability:** The same container that runs on your laptop will run the same on a cloud server or on a colleague's computer.
- **Isolation:** Multiple applications can coexist on the same server without interfering with each other (for example, one that uses Python 2 and another that uses Python 3).
- **Efficiency:**  It is much lighter and simpler than a traditional virtual machine.


# 2. System Architecture Level Operation

To understand how Docker works "behind the scenes", it needs to be compared to Virtual Machines. Meanwhile a Virtual Machine emulates a complete hardware, Docker does something smarter:  **It shares the system's core ([Kernel](/learning/operating-systems-kernel))** using the [Docker Engine](/learning/containers-docker-engine)

---

## Next: Kubernetes

Docker solves **build, ship, and run on one machine**. When you need **scheduling, scaling, and self-healing across many hosts**, move to **Kubernetes**—it runs the **same container images** via a **container runtime** on each node (see Worker Nodes).

### The technical pillars in the Linux Kernel

Docker 