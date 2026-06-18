# Worker Nodes Anatomy

A **worker node** is where your workloads run. Each node runs a **kubelet** (node agent), **kube-proxy** (Service networking), and a **container runtime** that actually starts containers from **images**—the same OCI images you build with Docker.

> **Docker Engine** on your laptop = daemon + CLI on one machine. On a node, **containerd** (or CRI-O) + **kubelet** play that role under cluster control. Docker Desktop’s Kubernetes uses this same model internally.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## Kubelet

- [ ] Registers node with API server
- [ ] Watches Pod specs assigned to this node
- [ ] Instructs CRI to pull image and create/start/stop containers
- [ ] Runs probes (Advanced Ops/01 Probes Healthchecks)

## Container runtime (CRI)

- [ ] **CRI**: standard interface between kubelet and runtime
- [ ] Common runtimes: **containerd**, **CRI-O** (not the Docker daemon on nodes in modern clusters)
- [ ] Pull policy, image registry auth
- [ ] Link: Containers/Docker/Docker Engine (namespaces, cgroups on Linux)

## kube-proxy

- [ ] Implements Service abstraction (ClusterIP, NodePort, …)
- [ ] iptables/IPVS or userspace modes (implementation detail)

## Node resources

- [ ] CPU, memory, ephemeral storage
- [ ] Pod capacity, allocatable vs capacity

## Course notes

- [ ] 
- [ ] 

