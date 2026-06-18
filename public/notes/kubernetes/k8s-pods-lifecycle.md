# Pods and Lifecycle

A **Pod** wraps one or more containers that share **network namespace** and optional **volumes**. It is the unit Kubernetes schedules—not an individual container in isolation. Think: `docker run` groups containers that must live together on one host.

> One Pod ≈ one or more containers on the **same node**, sharing `localhost` networking. Images still come from your registry—the same artifacts tagged with `docker build` / CI.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## Pod structure

- [ ] Main application container(s)
- [ ] **Init containers** — run to completion before app containers start
- [ ] **Sidecars** — logging, mesh proxies (advanced)

## Pod phases and conditions

- [ ] Pending, Running, Succeeded, Failed, Unknown
- [ ] `kubectl describe pod` — events and state transitions

## Restart policies

- [ ] `Always`, `OnFailure`, `Never`
- [ ] Relationship to liveness failures

## Multi-container patterns

- [ ] 
- [ ] 

## Course notes

- [ ] 
- [ ] 

