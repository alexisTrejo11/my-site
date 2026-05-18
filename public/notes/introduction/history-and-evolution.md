# History and Evolution of Backend Systems

> Understanding where we came from makes the decisions we make today legible.

---

## The Timeline

### 1993 — CGI (Common Gateway Interface)
The first server-side dynamic web. Every HTTP request spawned a **new OS process** to run a script (Perl, C, Shell). Brutally inefficient but conceptually revolutionary: the web could now compute, not just serve files.

```
Client → Web Server → fork() new process → Run script → Return HTML → Kill process
```

**Bottleneck:** Process creation overhead. Could not scale horizontally beyond a handful of users.

---

### 1994–2000 — Interpreted Languages & App Servers
PHP, ColdFusion, and early Java Servlets replaced CGI scripts. The key shift: **persistent processes** replace short-lived forks. Apache + PHP became the dominant stack (LAMP).

Java introduced the **Servlet Container** (Tomcat) — a persistent JVM that reuses threads per request.

---

### 2000–2006 — MVC Frameworks & ORMs
Rails (2004), Django (2005), Spring (2003) introduced structured MVC patterns. The **ORM** abstracted SQL into object graphs. Convention-over-configuration reduced boilerplate.

**Bottleneck:** Shared mutable state; horizontal scaling required sticky sessions or distributed caches.

---

### 2006–2012 — REST & the API Economy
Roy Fielding's PhD thesis (2000) on REST went mainstream. JSON replaced XML. The web became programmable. Mobile apps needed APIs, not HTML. The **stateless server** became the standard.

---

### 2012–2016 — Microservices & Docker
Netflix, Amazon, and Uber published their decomposition stories. Services became independently deployable units. Docker (2013) containerized the runtime environment. The **12-Factor App** manifesto defined cloud-native principles.

---

### 2016–2020 — Event-Driven & Stream Processing
Kafka (2011, open-sourced 2012) went mainstream. Services started publishing **events** instead of making direct calls. The **event log** became the source of truth. Reactive programming (RxJava, Project Reactor) gained traction.

---

### 2020–Present — Serverless & Platform Engineering
AWS Lambda, Google Cloud Run, and Vercel Edge Functions abstract away the server entirely. **Functions as a Service (FaaS)** charge per invocation. The boundary between backend and infrastructure dissolved.

Simultaneously, **Platform Engineering** emerged — internal developer platforms (IDPs) that standardize how teams deploy, observe, and scale services.

---

## Architectural Evolution Summary

| Era | Model | Key Idea |
|-----|-------|----------|
| 1993 | CGI | Process per request |
| 2000 | MVC Monolith | Single deployable app |
| 2006 | REST API | Stateless, JSON |
| 2012 | Microservices | Independent deployable services |
| 2016 | Event-Driven | Async, broker-mediated |
| 2020 | Serverless / Edge | No server management |

---

## Related Notes

- [[01_Monoliths_vs_Microservices]] — Detailed comparison
- [[01_Welcome_to_the_Machine]] — Current model overview
- [[01_What_is_Kafka]] — Why event-driven emerged
