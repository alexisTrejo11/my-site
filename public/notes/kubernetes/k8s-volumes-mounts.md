# Volumes and Mounts

Containers in a Pod can share **volumes**. Some volumes live only as long as the Pod (**emptyDir**); others map host paths or cloud disks.

> **emptyDir** ≈ anonymous volume tied to one container lifecycle. **hostPath** ≈ bind mount from node filesystem (use carefully in multi-tenant clusters).

> Hub: [K8s MOC](/learning/k8s-master-moc)

## Volume types (overview)

- [ ] `emptyDir`
- [ ] `hostPath`
- [ ] `configMap` / `secret` as volumes

## Mount paths

- [ ] `volumeMounts` in container spec
- [ ] Permissions and subPath

## When data must survive Pod restart

- [ ] → Configuration and Storage/03 Persistent Volumes PV PVC

## Course notes

- [ ] 
- [ ] 

