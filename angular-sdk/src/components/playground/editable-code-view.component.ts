import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { COPY_ICON } from './playground-icons';

@Component({
  selector: 'pg-editable-code-view',
  standalone: true,
  template: `
    <div class="pg-code-view-wrap">
      <div class="pg-code-view-header">
        <button type="button" class="pg-copy-btn" (click)="onCopy.emit()" [title]="copyLabel" [attr.aria-label]="copyLabel">
          <span [innerHTML]="copyIconHtml"></span>
          <span>{{ isCopied ? 'Copied!' : 'Copy' }}</span>
        </button>
      </div>
      <div class="pg-code-view">
        <textarea
          class="pg-code-textarea"
          [value]="value"
          (input)="onChange.emit(textareaValue($event))"
          spellcheck="false"
          [attr.aria-label]="ariaLabel">
        </textarea>
      </div>
    </div>
  `,
})
export class EditableCodeViewComponent {
  @Input() value = '';
  @Input() isCopied = false;
  @Input() copyLabel = 'Copy';
  @Input() ariaLabel = '';
  @Output() onChange = new EventEmitter<string>();
  @Output() onCopy = new EventEmitter<void>();

  copyIconHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.copyIconHtml = this.sanitizer.bypassSecurityTrustHtml(COPY_ICON);
  }

  textareaValue(event: Event): string {
    return (event.target as HTMLTextAreaElement).value;
  }
}
