import Quill from 'quill';
import type { Range } from 'quill';
import type Toolbar from 'quill/modules/toolbar';

export class FormatPainter {
  static toolName = 'format-painter';
  static moduleName = 'format-painter';

  formatterBtn: HTMLElement | null;
  isFormatterLock = false;
  isFormating = false;
  rangeFormat: Record<string,any> = {}

  constructor(public quill: Quill) {
    this.quill = quill;

    const toolbar = this.quill.getModule('toolbar') as Toolbar;
    this.formatterBtn = toolbar.container.querySelector('.ql-format-painter');
    if (toolbar && this.formatterBtn) {
      this.formatterBtn.addEventListener('dblclick', () => {
        if (this.isFormatterLock) {
          this.unbindFormatSelect();
          return;
        }
        this.isFormatterLock = true;
        this.bindFormatSelect();
      });
      this.formatterBtn.addEventListener('click', () => {
        if (!this.isFormating) {
          this.bindFormatSelect();
        } else {
          this.unbindFormatSelect();
        }
      });
    }
  }

  btnActive = () => {
    setTimeout(() => {
      this.formatterBtn.classList.add('ql-active');
    }, 0);
  };

  btnRemoveActive = () => {
    setTimeout(() => {
      this.formatterBtn.classList.remove('ql-active');
    }, 0);
  };

  bindFormatSelect = () => {
    const range = this.quill.getSelection();
    if (range.length === 0) return;
    this.rangeFormat = this.quill.getFormat(range);
    this.isFormating = true;
    this.quill.on(Quill.events.SELECTION_CHANGE, this.formatRange);
    this.btnActive();
  };

  unbindFormatSelect = () => {
    this.quill.off(Quill.events.SELECTION_CHANGE, this.formatRange);
    this.rangeFormat = undefined;
    this.btnRemoveActive();
    this.isFormating = false;
    this.isFormatterLock = false;
  };

  formatRange = (range: Range | null) => {
    if (!range) return;
    this.quill.removeFormat(range.index, range.length);
    for (const format in this.rangeFormat) {
      this.quill.format(format, this.rangeFormat[format], Quill.sources.USER);
    }
    if (!this.isFormatterLock) {
      this.unbindFormatSelect();
    } else {
      this.btnActive();
    }
  };
}
