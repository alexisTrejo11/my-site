# StatefulSets and Jobs

Not every workload is stateless. **StatefulSets** give Pods **stable network IDs** and **persistent storage**—typical for databases. **Jobs** and **CronJobs** run tasks to completion (migrations, reports, backups).

> StatefulSet + PVC ≈ named Docker volume + fixed hostname, but cluster-orchestrated across nodes.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## StatefulSet

- [ ] Ordered Pod creation/termination
- [ ] `volumeClaimTemplates`
- [ ] Headless Service for stable DNS

## Job

- [ ] `completions`, `parallelism`, backoff
- [ ] Use cases: batch processing

## CronJob

- [ ] Schedule syntax
- [ ] Concurrency policy

## Course notes

- [ ] 
- [ ] 

