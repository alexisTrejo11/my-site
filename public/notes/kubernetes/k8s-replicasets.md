# ReplicaSets

A **ReplicaSet** ensures a specified number of **identical Pod replicas** are running. If a node dies or a Pod is deleted, the controller creates replacements—going beyond what a single Docker host restart policy provides.

> Rough analogy: running **N copies** of the same `docker run` command, with a supervisor that recreates missing instances.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## Selector labels

- [ ] `matchLabels` tie ReplicaSet → Pods
- [ ] Label design conventions (`app`, `version`, `tier`)

## Scaling

- [ ] `spec.replicas`
- [ ] `kubectl scale rs/...`

## Relationship to Deployments

- [ ] Deployments own ReplicaSets; prefer Deployment for apps
- [ ] See Workloads and Compute/03 Deployments

## Course notes

- [ ] 
- [ ] 

