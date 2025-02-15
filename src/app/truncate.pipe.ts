import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 20, completeWords: boolean = false, ellipsis: string = '...'): string {
    // Step 1: Handle empty values
    if (!value) return '';

    // Step 2: If the text is already within the limit, return it as is
    if (value.length <= limit) return value;

    // Step 3: Check if we should truncate at word boundaries
    if (completeWords) {
      let words = value.split(' '); // Split text into words
      let truncated = '';

      for (let word of words) {
        if ((truncated + word).length > limit) break; // Stop when limit is reached
        truncated += word + ' '; // Add word and a space
      }

      return truncated.trim() + ellipsis; // Return truncated text with ellipsis
    }

    // Step 4: Default truncation (cut at character limit)
    return value.substring(0, limit) + ellipsis;
  }

}
