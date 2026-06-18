# Deployments

A **Deployment** manages a **ReplicaSet** and provides **declarative updates** for stateless apps. You change `spec.template.spec.containers[].image` to roll out a new version—the cluster replaces Pods gradually.

> **Image** field points to the same registry tags you push after `docker build`. Rolling update = replace Pods running old image with new ones without manual `docker stop`/`run` on each host.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## RollingUpdate (default)

- [ ] `maxSurge`, `maxUnavailable`
- [ ] Zero-downtime when readiness probes are correct (Advanced Ops/01 Probes Healthchecks)

## Recreate strategy

- [ ] Tear down all old Pods, then start new—downtime window
- [ ] When to use (schema migrations, single-writer)

## Rollout commands

- [ ] `kubectl rollout status/history/undo`
- [ ] `kubectl set image deployment/...`

## Course notes

- [ ] 
- [ ] 

