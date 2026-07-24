Git Note 01 — What is Git?
Definition

Git is a distributed version control system that tracks changes in a project over time, allowing developers to manage history, restore previous versions, and collaborate efficiently.

Why do we use Git?
Track project history
Undo mistakes
Restore old versions
Collaborate with teams
Experiment safely using branches
Real-world Example

Instead of creating folders like:

Project Final
Project Final 2
Project Final Latest

Git keeps all versions inside one repository.


Git Note 02 — Version Control
What is Version Control?

Version control is the process of managing changes to files over time, allowing developers to track history, compare versions, restore previous states, and collaborate safely.

Why is Version Control important?
Prevents accidental data loss
Makes collaboration easier
Keeps project history
Allows rollback to stable versions
Enables experimentation without losing work



Git Note 03 — Snapshot
What is a Snapshot?

A snapshot is the state of the project at a particular point in time.

Each commit creates a new snapshot that represents the project at that moment.

Interview Point

Git is snapshot-based, not just change-log based. Internally it stores snapshots efficiently by reusing unchanged objects instead of duplicating them.