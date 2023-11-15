import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, lines: number): string {
    const linesArray = value.split('\n');
    const truncatedLines = linesArray.slice(0, lines);
    let truncatedText = truncatedLines.join('\n');
    if (linesArray.length > lines) {
      truncatedText += '...';
    }
    return truncatedText;
  }
}
