# Process Management

## Process Identification (PID)

### Viewing Processes
```bash
ps aux                    # All processes
ps -ef                    # Standard format
pgrep -l firefox          # Find PID by name
pidof nginx               # Direct PID lookup
```

### Process Tree
```bash
pstree -p                 # Tree with PIDs
pstree -u                 # Show user ownership
```

## Process Priority (Nice Values)

**Range:** -20 (highest) to +19 (lowest)  
**Default:** 0

### Setting Priority

```bash
# Launch with priority
nice -n 10 ./script.sh    # Lower priority
nice -n -15 ./critical    # Higher priority (requires sudo)

# Change running process
renice -n 5 -p 1234       # Decrease priority
sudo renice -n -10 -p 5678 # Increase priority
```

### Viewing Priority

```bash
top -p PID                # Show PR (priority) and NI (nice)
ps -o pid,ni,comm -p PID
```


## Process States

| State | Meaning                  | Example                   |
| ----- | ------------------------ | ------------------------- |
| R     | Running/runqueue         | Active CPU process        |
| S     | Sleeping (interruptible) | Waiting for I/O           |
| D     | Uninterruptible sleep    | Disk I/O waiting          |
| Z     | Zombie                   | Terminated but not reaped |
| T     | Stopped                  | Suspended by signal       |

```bash
ps aux | awk '$8 ~ /D/ {print}'  # Find D-state processes
```

## Blocking vs Non-blocking Operations

### 🔴 Blocking (Synchronous)

- Process waits until I/O completes
- CPU goes idle or context switches
- Common in: `read()`, `write()`, `accept()`

**Example:**
```c
// Blocking read - stops until data arrives
char buffer[100];
read(fd, buffer, 100); // Proccess blocks here
```

### 🟢 Non-blocking (Asynchronous)

- Immediate return with EAGAIN if no data
- Requires polling or select/epoll
- Used in high-performance servers
```c
// Non-blocking socket
fcntl(sockfd, F_SETFL, O_NONBLOCK);
while(1) {
    ret = read(sockfd, buffer, 100);
    if(ret == -1 && errno == EAGAIN) {
        // No data, do other work
        continue;
    }
    break;
}
```

### Checking Blocking Behavior

```bash
# Check open files for process
lsof -p PID
cat /proc/PID/fdinfo/2  # See flags
```


### Job Control
```bash
command &                # Run in background
Ctrl+Z                   # Suspend foreground job
jobs                    # List jobs
bg %1                   # Resume job 1 in background
fg %1                   # Bring to foreground
disown %1               # Remove from shell job control
```

