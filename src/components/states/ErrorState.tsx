import { Button } from '../ui/Button'
import { AlertIcon, RetryIcon } from '../ui/icons'
import { StateMessage } from './StateMessage'

type ErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <StateMessage
      role="alert"
      tone="danger"
      icon={<AlertIcon />}
      title="Couldn't load runs"
      description={`${message} Please try again.`}
      action={
        <Button onClick={onRetry}>
          <RetryIcon />
          Retry
        </Button>
      }
    />
  )
}
