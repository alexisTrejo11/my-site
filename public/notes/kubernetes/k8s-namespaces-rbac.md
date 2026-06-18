# Namespaces and RBAC

**Namespaces** partition objects (dev/staging/prod, or per team). **RBAC** controls who can do what via **Roles**, **ClusterRoles**, **RoleBindings**, and **ServiceAccounts**.

> Looser analogy: namespaces ≈ organizing Compose projects or Swarm stacks; RBAC has no direct Docker CE equivalent—production K8s requires explicit authZ.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## Namespaces

- [ ] `default`, `kube-system`, custom
- [ ] Resource quotas per namespace (optional)

## RBAC primitives

- [ ] Role vs ClusterRole (namespace-scoped vs cluster)
- [ ] RoleBinding / ClusterRoleBinding

## ServiceAccounts

- [ ] Pod identity for in-cluster API access
- [ ] Image pull secrets

## Least privilege

- [ ] 
- [ ] 

## Course notes

- [ ] 
- [ ] 

