# Kubernetes Master Roadmap

> **From Docker to Kubernetes:** You package apps with Docker and run them locally with the Docker Engine. **Kubernetes** orchestrates those same **container images** across a **cluster**—scheduling, networking, scaling, and self-healing at production scale.

**Prerequisites in this vault**

| Topic | Note |
| ----- | ---- |
| Containers & portability | Containers/Docker/Overview |
| Engine, namespaces, cgroups | Containers/Docker/Docker Engine |
| VMs vs containers | Containers/Virtual Machines |

---

## Learning path

### 01 — Architecture and cluster

| Note | Focus |
| ---- | ----- |
| Architecture and Cluster/01 Control Plane Components | API Server, etcd, Scheduler, Controller Manager |
| Architecture and Cluster/02 Worker Nodes Anatomy | Kubelet, kube-proxy, container runtime (CRI) |
| Architecture and Cluster/03 Declarative Vs Imperative | YAML manifests vs `kubectl` commands |

### 02 — Workloads and compute

| Note | Focus |
| ---- | ----- |
| Workloads and Compute/01 Pods Lifecycle | Pod states, init containers |
| Workloads and Compute/02 ReplicaSets | Replication and self-healing |
| Workloads and Compute/03 Deployments | RollingUpdate vs Recreate |
| Workloads and Compute/04 StatefulSets and Jobs | Stateful apps and batch jobs |

### 03 — Networking and services

| Note | Focus |
| ---- | ----- |
| Networking and Services/01 ClusterIP NodePort LB | Service types |
| Networking and Services/02 Ingress Controllers | HTTP routing (Nginx, Traefik, …) |
| Networking and Services/03 Pod Networking CNI | IP-per-Pod model and CNI plugins |

### 04 — Configuration and storage

| Note | Focus |
| ---- | ----- |
| Configuration and Storage/01 ConfigMaps and Secrets | Config and sensitive data |
| Configuration and Storage/02 Volumes and Mounts | Ephemeral container storage |
| Configuration and Storage/03 Persistent Volumes PV PVC | PV, PVC, StorageClass |

### 05 — Advanced operations

| Note | Focus |
| ---- | ----- |
| Advanced Ops/01 Probes Healthchecks | Liveness, Readiness, Startup |
| Advanced Ops/02 Resource Management | Requests, limits, OOMKilled |
| Advanced Ops/03 Namespaces and RBAC | Isolation and access control |

---

## Docker → Kubernetes mental model

| Docker concept | Kubernetes equivalent |
| -------------- | ---------------------- |
| `docker run` | Pod (+ controller such as Deployment) |
| Image | `image` in container spec (often from same registry you use with Docker) |
| `docker-compose.yml` | Multiple manifests or Helm chart |
| Published port `-p` | Service (`ClusterIP`, `NodePort`, `LoadBalancer`) + Ingress |
| Named volume | PersistentVolume + PersistentVolumeClaim |
| Env file / `-e` | ConfigMap / Secret |
| Single host | Cluster of nodes |

The **container runtime** on each node (containerd, CRI-O, etc.) pulls and runs **OCI images**—the same artifacts you build with `docker build` or CI pipelines.

---

## kubectl cheat sheet

### Context and discovery

```bash
kubectl config current-context
kubectl get nodes -o wide
kubectl get all -n <namespace>
kubectl api-resources
kubectl explain pod.spec.containers
```

### Apply and diff

```bash
kubectl apply -f deployment.yaml
kubectl diff -f deployment.yaml
kubectl delete -f deployment.yaml
```

### Workloads

```bash
kubectl get pods,deployments,rs -n <namespace>
kubectl describe pod <name> -n <namespace>
kubectl logs <pod> -c <container> -f
kubectl exec -it <pod> -- /bin/sh
kubectl rollout status deployment/<name>
kubectl rollout undo deployment/<name>
```

### Debugging

```bash
kubectl get events -n <namespace> --sort-by='.lastTimestamp'
kubectl top pods -n <namespace>    # metrics-server required
```

---

## Glossary

| Term | Meaning |
| ---- | ------- |
| **Cluster** | Set of nodes running containerized workloads, managed by Kubernetes |
| **Control plane** | Components that manage the cluster (API server, etcd, scheduler, controllers) |
| **Node** | Worker machine (VM or bare metal) that runs Pods |
| **Pod** | Smallest deployable unit; one or more containers sharing network/storage |
| **Deployment** | Declarative controller for stateless apps (ReplicaSet + rollout strategy) |
| **Service** | Stable network endpoint for a set of Pods |
| **Ingress** | HTTP/HTTPS routing into the cluster |
| **Namespace** | Virtual cluster partition for teams or environments |
| **CRI** | Container Runtime Interface—how kubelet talks to containerd/CRI-O |
| **CNI** | Container Network Interface—how Pods get IP connectivity |

---

## Progress

| Module | Status |
| ------ | ------ |
| Architecture | 📝 Scaffolded |
| Workloads | 📝 Scaffolded |
| Networking | 📝 Scaffolded |
| Config & storage | 📝 Scaffolded |
| Advanced ops | 📝 Scaffolded |
