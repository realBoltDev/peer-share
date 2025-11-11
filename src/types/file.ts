interface FileMetadata {
  filename: string
  size: string
  speed: string
  progress: number
  status: string
}

export type FileProps = FileMetadata[];
