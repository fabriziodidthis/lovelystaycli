import { QueryFailedError } from 'typeorm'

interface DetailedQueryFailedError extends QueryFailedError<any> {
  code: string
  detail: string
}

export function eachError(error: QueryFailedError<any>): string | undefined {
  if (error instanceof QueryFailedError && (error as any)['code'] === '23505') {
    const message = (error as any)['detail'].replace(
      /^Key \((.*)\)=\((.*)\) (.*)/,
      'This $1 $2 already exists.',
    )
    return message
  }
}
