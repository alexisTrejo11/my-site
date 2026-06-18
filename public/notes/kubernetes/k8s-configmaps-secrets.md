# ConfigMaps and Secrets

Bake **code** into the image; inject **config** at runtime. **ConfigMaps** hold non-sensitive settings; **Secrets** hold sensitive data (base64 in etcd—encrypt at rest in production).

> Replaces `-e` / `--env-file` and bind-mounting config files with `docker run`. Same image, different ConfigMap per environment (dev/staging/prod).

> Hub: [K8s MOC](/learning/k8s-master-moc)

## ConfigMap

- [ ] Key-value or file bundles
- [ ] Mount as env vars or volumes

## Secret

- [ ] Types: `Opaque`, `kubernetes.io/tls`, docker-registry, …
- [ ] RBAC and encryption at rest

## Injection patterns

- [ ] `envFrom`, `valueFrom`
- [ ] Hot reload limitations

## Course notes

- [ ] 
- [ ] 

