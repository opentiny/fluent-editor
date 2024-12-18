import { css } from '../utils'

// 配置
const GRID_SIZE = {
  ROWS: 10,
  COLS: 10,
  CELL_SIZE: 15,
}

const STYLES = {
  container: {
    'position': 'absolute',
    'z-index': '1000',
    'background': 'white',
    'border': '1px solid #ccc',
    'padding': '5px',
    'box-shadow': '0 2px 8px rgba(0,0,0,0.1)',
  },
  grid: {
    'display': 'grid',
    'grid-template-columns': `repeat(${GRID_SIZE.COLS}, ${GRID_SIZE.CELL_SIZE - 1}px)`,
    'grid-template-rows': `repeat(${GRID_SIZE.ROWS}, ${GRID_SIZE.CELL_SIZE - 1}px)`,
    'gap': '0px',
  },
  row: {
    display: 'contents',
  },
  cell: {
    'width': `${GRID_SIZE.CELL_SIZE}px`,
    'height': `${GRID_SIZE.CELL_SIZE}px`,
    'border': '1px solid #ddd',
    'background-color': '#fff',
    'box-sizing': 'border-box',
  },
  label: {
    'text-align': 'center',
    'margin-top': '5px',
    'font-size': '12px',
    'color': '#666',
  },
}

function createCell(
  row: number,
  col: number,
  handleMouseOver: (row: number, col: number) => void,
  handleClick: () => void,
): { cellDiv: HTMLDivElement, removeListeners: () => void } {
  const cellDiv = document.createElement('div')
  cellDiv.className = 'cell'
  css(cellDiv, STYLES.cell)

  const mouseOverListener = () => handleMouseOver(row + 1, col + 1)
  const clickListener = () => handleClick()

  cellDiv.addEventListener('mouseover', mouseOverListener)
  cellDiv.addEventListener('click', clickListener)

  const removeListeners = () => {
    cellDiv.removeEventListener('mouseover', mouseOverListener)
    cellDiv.removeEventListener('click', clickListener)
  }

  return { cellDiv, removeListeners }
}

function createRow(
  rowIndex: number,
  handleMouseOver: (row: number, col: number) => void,
  handleClick: () => void,
): { rowDiv: HTMLDivElement, removeListeners: () => void } {
  const rowDiv = document.createElement('div')
  rowDiv.className = 'row'
  css(rowDiv, STYLES.row)

  const fragment = document.createDocumentFragment()
  const removeListenersArray: (() => void)[] = []

  for (let col = 0; col < GRID_SIZE.COLS; col++) {
    const { cellDiv, removeListeners } = createCell(rowIndex, col, handleMouseOver, handleClick)
    fragment.appendChild(cellDiv)
    removeListenersArray.push(removeListeners)
  }

  rowDiv.appendChild(fragment)

  const removeListeners = () => {
    removeListenersArray.forEach(remove => remove())
  }

  return { rowDiv, removeListeners }
}

class TableSelector {
  private onSelect: (rows: number, cols: number) => void
  container: HTMLDivElement
  private grid: HTMLDivElement
  private label: HTMLDivElement
  private rows: number = 0
  private cols: number = 0
  private removeListenersArray: (() => void)[] = []

  constructor({ onSelect }: { onSelect: (rows: number, cols: number) => void }) {
    this.onSelect = onSelect
    this.initContainer()
    this.initGrid()
    this.initLabel()
  }

  // init table-selector container
  private initContainer() {
    this.container = document.createElement('div')
    this.container.className = 'table-selector'
    css(this.container, STYLES.container)
  }

  // init grid
  private initGrid() {
    this.grid = document.createElement('div')
    this.grid.className = 'grid'
    css(this.grid, STYLES.grid)

    const fragment = document.createDocumentFragment()

    for (let row = 0; row < GRID_SIZE.ROWS; row++) {
      const { rowDiv, removeListeners } = createRow(
        row,
        this.handleMouseOver.bind(this),
        this.handleClick.bind(this),
      )
      fragment.appendChild(rowDiv)
      this.removeListenersArray.push(removeListeners)
    }
    this.grid.appendChild(fragment)
    this.container.appendChild(this.grid)
  }

  // init label
  private initLabel() {
    this.label = document.createElement('div')
    this.label.className = 'label'
    css(this.label, STYLES.label)
    this.container.appendChild(this.label)
  }

  private handleMouseOver(row: number, col: number) {
    this.rows = row
    this.cols = col
    this.updateGrid()
  }

  private handleClick() {
    this.onSelect(this.rows, this.cols)
    this.hide()
  }

  updateGrid() {
    const cells = this.grid.getElementsByClassName('cell')
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i] as HTMLElement
      const row = Math.floor(i / GRID_SIZE.COLS)
      const col = i % GRID_SIZE.COLS
      css(cell, {
        'background-color': row < this.rows && col < this.cols ? '#e6f3ff' : '#fff',
      })
    }
    this.label.textContent = `${this.rows} x ${this.cols}`
  }

  show(x: number, y: number) {
    css(this.container, {
      'left': `${x}px`,
      'top': `${y}px`,
      'display': 'block',
      'margin-top': '1px',
    })
  }

  hide() {
    css(this.container, { display: 'none' })
  }

  destroy() {
    this.removeListenersArray.forEach(remove => remove())
    this.removeListenersArray = []

    this.hide()
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }
    this.rows = 0
    this.cols = 0
    return null
  }
}

export default TableSelector
