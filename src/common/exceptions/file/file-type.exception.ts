import { BadRequestException } from '@nestjs/common';

/** Used when the user inputs an invalid file type
 * uploading a picture
 */
export class FileTypeError extends BadRequestException {
  /** Throws exception with message 'File upload only supports the following
   * filetypes - {fileTypes}'.
   *
   * Used when the user inputs an invalid file type
   * uploading a picture
   */
  constructor(fileTypes: RegExp) {
    super(`File upload only supports the following filetypes - ${fileTypes}`);
  }
}
