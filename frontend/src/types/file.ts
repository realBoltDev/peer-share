import { FileWithPath } from '@mantine/dropzone';

export interface FileUploadProps {
  onFilesAdd: (files: FileWithPath[]) => void;
}

interface FileMetadata {
  filename: string
  size: string
  speed: string
  progress: number
  status: string
}

export type FileProps = FileMetadata[];
