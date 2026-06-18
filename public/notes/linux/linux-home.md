# Linux Fundamentals Master Node

## Quick Navigation
- [Process Management](/learning/linux-process-management) | Monitoring Tools | File System
- Permissions Guide | Basic Commands

## Core Topics at a Glance

### 🎯 [Process Management](/learning/linux-process-management)
- PIDs and process states
- Process priorities (nice/renice)
- Blocking vs Non-blocking operations
- Foreground/background jobs

### 📊 Monitoring Tools
- `htop` - Interactive process viewer
- `iotop` - I/O monitoring
- `vmstat` - Virtual memory stats
- `uptime` - System load averages

### 🗂️ File System
- FHS (Filesystem Hierarchy Standard)
- `/bin`, `/etc`, `/var`, `/home`, `/proc`
- Mount points and partitions


### 🔐 Permissions Guide
- Read/Write/Execute (755, 644, etc.)
- Owner/Group/Others
- Special bits (SUID, SGID, Sticky)
- `chmod`, `chown`, `umask`

### ⌨️ Basic Commands
- File operations (ls, cp, mv, rm, touch)
- Text processing (grep, awk, sed, cut)
- Redirections and pipes

## Learning Path
1. Start with Basic Commands and File System
2. Learn Permissions Guide (critical for security)
3. Move to [Process Management](/learning/linux-process-management) concepts
4. Master Monitoring Tools for troubleshooting

## Cheat Sheet
```bash
# View process tree
pstree -p
# Change process priority
nice -n 10 command
renice -n 5 -p PID
# Monitor system
watch -n 1 'ps aux --sort=-%cpu | head -20'
```
