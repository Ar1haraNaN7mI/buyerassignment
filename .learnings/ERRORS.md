# Errors

Command failures and integration errors.

---

## ERR-20260513-001

- **Status**: resolved
- **Priority**: medium
- **Area**: infra
- **Context**: `npm install` in `web` produced no output for over 2 minutes and stayed stuck.
- **Repro**: Run `npm install` in `C:\Users\MSIK\Desktop\ChatBot\buyerAssignment\web`.
- **Observed**: Process remained active with no stdout/stderr until manually terminated.
- **Next step**: Retry install with explicit registry and reduced extra steps (`--no-audit --no-fund`).

### Resolution

Re-ran install with `npm install --no-audit --no-fund --registry=https://registry.npmjs.org` and dependencies completed normally.
