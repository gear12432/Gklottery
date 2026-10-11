# Security Specification & Test Suite

## Data Invariants
1. A user can only access and modify their own sub-collections (`/notifications/{userId}`, `/checkIns/{userId}`, `/transactions/{userId}`, `/tickets/{userId}`, `/supportTickets/{userId}`).
2. User profile writes must enforce proper size bounds and user ID match.
3. System timestamps (`createdAt`) must be valid strings/ISO formats.
4. Directly setting administrative or elevated privilege fields is prohibited.

## The Dirty Dozen Payloads (Targeting Security Rules Failure Modes)
1. Cross-User Read: User A trying to read User B's `/transactions/userB/...`.
2. Cross-User Write: User A trying to write to User B's `/checkIns/userB/...`.
3. Unauthenticated Read: Anonymous user reading `/users/user1`.
4. Oversized Name Payload: Injecting 100KB string into `displayName`.
5. Invalid Path ID Injection: Attempting doc ID with invalid characters `../../admin`.
6. Self-Assigned Balance Modification: Modifying `balance` directly without transactional logic.
7. Unverified Email Access: Writing documents with unverified auth token where verification is mandated.
8. Unknown Extra Fields (Shadow Fields): Adding unexpected arbitrary data keys to profile.
9. Deleting Other User's Tickets: Attempting `delete` operation on foreign ticket ID.
10. System Record Tampering: Overwriting `createdAt` timestamp.
11. Unbounded Payload Exhaustion: Writing 1MB arrays in notification payloads.
12. Direct Permission Escalation: Injecting `isAdmin: true` on user document.

## Test Runner Verification
All rule paths mandate `request.auth != null && request.auth.uid == userId`.
