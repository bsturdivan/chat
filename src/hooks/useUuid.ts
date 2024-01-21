export const useUuid = (): { data: number } => {
  return { data: Math.floor(Math.random() * Date.now()) }
}
