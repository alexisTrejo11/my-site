# Resource Management

Kubernetes schedules using **requests** and enforces **limits** per container. This maps to Linux **cgroups**—the same kernel mechanism Docker uses to cap CPU and memory.

> `docker run --memory=512m --cpus=1` → `resources.requests` / `resources.limits` in the Pod spec.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## Requests vs limits

- [ ] **Request**: guaranteed minimum for scheduling
- [ ] **Limit**: maximum before throttling (CPU) or kill (memory)

## QoS classes

- [ ] Guaranteed, Burstable, BestEffort
- [ ] Eviction order under node pressure

## OOMKilled

- [ ] Memory limit exceeded → container restart
- [ ] Debugging: `kubectl describe pod`, metrics

## CPU units

- [ ] `100m` = 0.1 core
- [ ] 

## Course notes

- [ ] 
- [ ] 

