# Service Types

Pods are ephemeral—their IPs change. A **Service** provides a **stable virtual IP** and DNS name that load-balances to ready Pods via **label selectors**.

> **ClusterIP** ≈ internal DNS name for a set of containers. **NodePort** ≈ publish port on every node (`-p` on all hosts). **LoadBalancer** ≈ cloud LB in front of NodePort/ClusterIP.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## ClusterIP (default)

- [ ] Internal-only virtual IP
- [ ] `my-service.namespace.svc.cluster.local`

## NodePort

- [ ] High port on each node forwards to Service
- [ ] Dev/test access; production often uses LoadBalancer or Ingress

## LoadBalancer

- [ ] Cloud provider integration (AWS ELB, Azure LB, …)
- [ ] External IP assignment

## Endpoints and readiness

- [ ] Only **ready** Pods receive traffic
- [ ] `kubectl get endpoints`

## Course notes

- [ ] 
- [ ] 

