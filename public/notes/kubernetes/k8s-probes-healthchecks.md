# Kubernetes Probes: Standardizing Application Health

In Kubernetes, the cluster must know whether your **container** (the same process you would run with Docker) is **starting**, **ready for traffic**, or **stuck and needs a restart**. Probes bridge **application health endpoints** and **orchestrator behavior**.

> Related: Advanced Ops/02 Resource Management · Workloads and Compute/03 Deployments

---

## 1. The three probe types

### A. Startup probe

- **Purpose:** Detect when the application inside the container has **finished bootstrapping**.
- **Behavior:** Disables **liveness** and **readiness** until it succeeds. Prevents the kubelet from killing slow-starting apps (e.g. Spring Boot context, DB migrations, Kafka consumer join).

### B. Readiness probe

- **Purpose:** Decide if the container is ready to **receive network traffic** (Service / Ingress endpoints).
- **Behavior:** On failure, Kubernetes **removes the Pod from Service endpoints**. The Pod keeps running but is **drained** from load balancing.

### C. Liveness probe

- **Purpose:** Decide if the container should be **restarted**.
- **Behavior:** On repeated failure, the **kubelet** kills the container and recreates it per `restartPolicy` (same image, fresh process—similar in spirit to `docker restart`, but cluster-managed).

---

## Probe mechanisms

| Type | Typical use |
| ---- | ----------- |
| `httpGet` | REST health endpoints (`/health`, Spring Actuator) |
| `tcpSocket` | Open port check (no HTTP body) |
| `exec` | Run a command inside the container |
| `grpc` | gRPC health checking protocol |

### Tuning knobs (fill in from course)

- `initialDelaySeconds`
- `periodSeconds`
- `timeoutSeconds`
- `successThreshold` / `failureThreshold`

---

## Production manifest example

Balanced setup for a backend microservice (image built and pushed like any Docker image):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-service
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: api
        image: my-registry/backend:v1.0.0
        ports:
        - containerPort: 8080

        # 1. Wait for app to finish starting
        startupProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          failureThreshold: 30   # up to ~5 min if periodSeconds: 10
          periodSeconds: 10

        # 2. Ready to receive requests?
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10

        # 3. Catastrophic failure (e.g. deadlock)?
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          periodSeconds: 15
```

---

## Common pitfalls

- [ ] Liveness too aggressive → restart loops during GC or brief latency spikes
- [ ] Readiness checks downstream deps that flap → Pod removed from Service repeatedly
- [ ] Startup probe missing on slow JVM/Go cold start → liveness kills Pod before ready
- [ ] Health endpoint does heavy work → probes themselves cause load

---

## Course notes (add your own)

- 
- 
