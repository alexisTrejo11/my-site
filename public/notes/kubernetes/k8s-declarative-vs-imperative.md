# Declarative vs Imperative

Kubernetes is designed for **declarative** configuration: you describe **desired state**, controllers reconcile. **Imperative** `kubectl` commands are fine for learning and debugging—similar to one-off `docker run` vs a checked-in Compose file.

> **Imperative:** `kubectl run`, `kubectl expose` · **Declarative:** `kubectl apply -f` (like `docker compose up` from versioned files).

> Hub: [K8s MOC](/learning/k8s-master-moc)

## Imperative style

- [ ] `kubectl create`, `run`, `expose`, `scale`
- [ ] Fast for experiments; harder to reproduce and review

## Declarative style

- [ ] Manifests in Git (Deployment, Service, …)
- [ ] `kubectl apply` — three-way merge, idempotent updates
- [ ] GitOps (Argo CD, Flux) — optional advanced topic

## Imperative with dry-run to YAML

- [ ] `kubectl create deployment ... --dry-run=client -o yaml`
- [ ] Bootstrap manifests from commands

## Best practices

- [ ] 
- [ ] 

