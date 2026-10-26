import { Button } from '../ui/Button'
import { SearchOffIcon } from '../ui/icons'
import { StateMessage } from './StateMessage'

type EmptyStateProps = {
  // Без onReset показывается сообщение «запусков пока нет»
  onReset?: () => void
}

export function EmptyState({ onReset }: EmptyStateProps) {
  if (!onReset) {
    return (
      <StateMessage
        icon={<SearchOffIcon />}
        title="No runs yet"
        description="Runs will appear here once an agent starts working on a task."
      />
    )
  }

  return (
    <StateMessage
      icon={<SearchOffIcon />}
      title="No runs match your filters"
      description="Try a different search or status, or reset the filters to see all runs."
      action={
        <Button variant="secondary" onClick={onReset}>
          Reset filters
        </Button>
      }
    />
  )
}
