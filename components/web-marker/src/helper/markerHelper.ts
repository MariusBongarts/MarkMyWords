import { MyMarkerElement } from './../components/my-marker/my-marker.component';
import { Mark } from './../models/mark';

export function highlightText(range?: Range, mark?: Mark) {

  try {
    const markElement = createMarkElement(range, mark);
    addStyles();
    createMyMarkerComponent(markElement, mark);

  } catch (error) {
    console.log(error);
  }
}

/**
 * Creates the mark element to highlight text
 *
 * @param {Range} [range]
 * @param {Mark} [mark]
 * @returns
 */
function createMarkElement(range?: Range, mark?: Mark) {
  mark ? range = recreateRange(mark) : range = range;
  console.log(range);
  const markElement = document.createElement('mark');
  markElement.appendChild(range.extractContents());
  range.insertNode(markElement);
  return markElement;
}

/**
 * Creates the mark in the DOM. Afterwards it listenes for a deletion event to remove it.
 *
 * @param {HTMLElement} markElement
 * @param {Mark} mark
 */
function createMyMarkerComponent(markElement: HTMLElement, mark: Mark) {
  const myMarkElement = document.createElement('my-marker') as MyMarkerElement;
  myMarkElement.mark = mark;
  markElement.appendChild(myMarkElement);

  myMarkElement.addEventListener('deleted', (e: CustomEvent) => {
    myMarkElement.remove();
    deleteMarkFromDom(markElement);
    console.log(`Succesfully deleted mark ${e.detail}`);
  });

}

export function deleteMarkFromDom(markElement: HTMLElement) {
      // Unwraps the mark element
      const parent = markElement.parentNode;
      // move all children out of the element
      while (markElement.firstChild) parent.insertBefore(markElement.firstChild, markElement);
      // remove the empty element
      parent.removeChild(markElement);
}

function recreateRange(mark) {
  console.log(mark);
  const startContainer = findStartEndContainer(document.body, mark, true);
  const endContainer = findStartEndContainer(document.body, mark, false);
  const range = document.createRange();
  range.setStart(startContainer, mark.startOffset);
  range.setEnd(endContainer, mark.endOffset);
  return range;
}

/**
 * Returns the StartContainer or EndContainer to recreate the range of the given mark
 *
 * @export
 * @param {HTMLElement} container
 * @param {Mark} mark
 * @param {boolean} start true = searchs for StartContainer; false = searchs for EndContainer
 * @returns {HTMLElement}
 */
export function findStartEndContainer(container: HTMLElement, mark: Mark, start: boolean) {
  container ? container = container : container = document.body;
  let elements;
  try {
    elements = textNodesUnder(container);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent.includes(start ? mark.startContainerText : mark.endContainerText)) {
        return elements[i] as HTMLElement;
      }
    }
  } catch (error) {
    //
  }

}

/**
 * Returns all text nodes under an element
 *
 * @export
 * @param {Node} node
 * @returns {Node[]}
 */
export function textNodesUnder(node: Node) {
  try {
    let all: Node[] = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
      if (node.nodeType === 3) all.push(node);
      else all = all.concat(textNodesUnder(node));
    }
    return all;
  } catch (error) {
    //
  }

}

/**
 * Adds the style for the mark element.
 *
 */
function addStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
      mark {
        border-radius: 5px;
        padding: 2px 0px;
        background-color: #92ffaa;
        width: 100%;
      }

      mark > *:not(my-marker) {
        background-color: #92ffaa;
      }
      `;
  document.body.appendChild(style);
}