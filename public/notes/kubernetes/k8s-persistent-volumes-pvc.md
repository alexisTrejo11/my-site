# Persistent Volumes (PV) and Claims (PVC)

**PersistentVolume** is cluster storage. **PersistentVolumeClaim** is a Pod’s request for storage. **StorageClass** enables dynamic provisioning (EBS, Azure Disk, NFS, …).

> **PVC** ≈ named Docker volume request; **PV** ≈ actual disk/volume provisioned by the platform. Data survives Pod deletion when bound to a PVC.

> Hub: [K8s MOC](/learning/k8s-master-moc)

## PV and PVC binding

- [ ] Access modes: RWO, ROX, RWX
- [ ] Capacity requests

## StorageClass

- [ ] `provisioner`, `parameters`, `reclaimPolicy`
- [ ] Default StorageClass

## StatefulSet integration

- [ ] `volumeClaimTemplates` — Workloads and Compute/04 StatefulSets and Jobs

## Course notes

- [ ] 
- [ ] 

