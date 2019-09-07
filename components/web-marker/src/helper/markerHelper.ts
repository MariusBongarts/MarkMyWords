import { MyMarkerElement } from './../components/my-marker/my-marker.component';
import { Mark } from './../models/mark';

export function highlightText(range?: Range, mark?: Mark) {

  try {

    mark ? range = recreateRange(mark) : range = range;

    const markElement = document.createElement('mark');
    markElement.appendChild(range.extractContents());
    range.insertNode(markElement);

    const myMarkElement = document.createElement('my-marker') as MyMarkerElement;

    myMarkElement.id = mark.id;

    markElement.appendChild(myMarkElement);

    myMarkElement.show = true;

  } catch (error) {
    console.log(error);
  }
}

function recreateRange(mark) {
  let container = findSelectionNode(mark);
  container ? container = container : container = document.body;
  const startContainer = findStartEndContainer(container, mark, true);
  const endContainer = findStartEndContainer(document.body, mark, false);
  const range = document.createRange();
  range.setStart(startContainer, mark.startOffset);
  range.setEnd(endContainer, mark.endOffset);
  return range;
}

export function findSelectionNode(mark: Mark) {
  const elements = document.body.getElementsByTagName(mark.nodeTagName);
  if (elements && elements.length) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < elements.length; i++) {
      try {

        if (elements[i].innerHTML === mark.nodeHTML) {
          return elements[i] as HTMLElement;
        }

      } catch (error) {
        console.log(error);
      }
    }
  }
}

export function findStartEndContainer(container: HTMLElement, mark: Mark, start: boolean) {
  container ? container = container : container = document.body;
  let elements;
  try {
    elements = textNodesUnder(container);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent.includes(start ? mark.startContainerText : mark.endContainerText)) {
        return elements[i];
      }
    }
  } catch (error) {
    //
  }

}

export function textNodesUnder(node) {
  try {
    let all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
      if (node.nodeType === 3) all.push(node);
      else all = all.concat(textNodesUnder(node));
    }
    return all;
  } catch (error) {
    //
  }

}
