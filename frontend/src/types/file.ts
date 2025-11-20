import { FileWithPath } from '@mantine/dropzone';

export interface FileUploadProps {
  onFilesAdd: (files: FileWithPath[]) => void;
}
