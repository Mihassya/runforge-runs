import type { RunStatus } from '../types/run'

export const RUN_STATUSES: RunStatus[] = ['queued', 'running', 'succeeded', 'failed']

export const STATUS_LABELS: Record<RunStatus, string> = {
  queued: 'Queued',
  running: 'Running',
  succeeded: 'Succeeded',
  failed: 'Failed',
}

export const STATUS_DESCRIPTIONS: Record<RunStatus, string> = {
  queued: 'Waiting to start',
  running: 'In progress',
  succeeded: 'Finished successfully',
  failed: 'Finished with an error',
}

export function isRunStatus(value: string | null): value is RunStatus {
  return RUN_STATUSES.includes(value as RunStatus)
}
