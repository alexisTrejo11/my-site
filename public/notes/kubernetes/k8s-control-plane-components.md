# Control Plane Components

The **control plane** is the brain of the cluster. It does not run your application containers—that happens on **worker nodes** via the **kubelet** and a **container runtime** (see Architecture and Cluster/02 Worker Nodes Anatomy). You interact with the control plane mainly through **`kubectl`** and the **Kubernetes API**.

> Unlike Docker Engine on a single host, the control plane coordinates **many nodes** and **desired state** stored in **etcd**.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## API Server

- [ ] Front door for all cluster operations (`kubectl`, controllers, kubelet)
- [ ] Authentication, authorization, admission
- [ ] REST API; validates and persists objects

## etcd

- [ ] Distributed key-value store for cluster state
- [ ] Source of truth for objects (Pods, Services, …)
- [ ] Backup and restore considerations

## Scheduler

- [ ] Assigns Pods to nodes based on resources, affinity, taints
- [ ] Does not run containers—only binds Pod → Node

## Controller Manager

- [ ] Runs control loops (Deployment, ReplicaSet, Node, …)
- [ ] Reconciles **actual** state with **desired** state

## High availability (notes)

- [ ] 
- [ ] 

