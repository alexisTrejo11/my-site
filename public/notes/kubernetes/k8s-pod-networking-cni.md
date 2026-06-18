# Pod Networking and CNI

Every Pod gets a **cluster-routable IP**. **CNI plugins** (Calico, Cilium, Flannel, …) configure bridges, overlays, or eBPF datapaths on each node.

> Builds on Linux **network namespaces**—the same isolation primitive Docker uses—extended so every Pod IP is reachable per cluster network policy.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## IP-per-Pod model

- [ ] Flat or overlay network
- [ ] No NAT between Pods (typical goal)

## CNI plugin responsibilities

- [ ] Assign IP, configure routes, optional NetworkPolicy enforcement

## Popular CNIs

- [ ] Calico — BGP, NetworkPolicy
- [ ] Cilium — eBPF, observability
- [ ] Flannel — simple overlay

## NetworkPolicy

- [ ] Firewall between Pods/namespaces (advanced)

## Course notes

- [ ] 
- [ ] 

