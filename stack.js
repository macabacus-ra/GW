const userProperties = PropertiesService.getUserProperties();
const dialogWidth = 200;
const dialogHeight = 170;
const headingTitle = "Gap Size"

function stackLeftDialog() {
  userProperties.setProperty('stackDirection', "left");
  let html = HtmlService.createHtmlOutputFromFile('stackDialog').setWidth(dialogWidth).setHeight(dialogHeight);
  SlidesApp.getUi().showModalDialog(html, headingTitle);
}

function stackRightDialog() {
  userProperties.setProperty('stackDirection', "right");
  let html = HtmlService.createHtmlOutputFromFile('stackDialog').setWidth(dialogWidth).setHeight(dialogHeight);
  SlidesApp.getUi().showModalDialog(html, headingTitle);
}

function stackUpDialog() {
  userProperties.setProperty('stackDirection', "up");
  let html = HtmlService.createHtmlOutputFromFile('stackDialog').setWidth(dialogWidth).setHeight(dialogHeight);
  SlidesApp.getUi().showModalDialog(html, headingTitle);
}

function stackDownDialog() {
  userProperties.setProperty('stackDirection', "down");
  let html = HtmlService.createHtmlOutputFromFile('stackDialog').setWidth(dialogWidth).setHeight(dialogHeight);
  SlidesApp.getUi().showModalDialog(html, headingTitle);
}

function stack(gap, unit){
  const userProperties = PropertiesService.getUserProperties(); 
  const stackDirection = userProperties.getProperty('stackDirection');

  switch (stackDirection) {
    case 'left':
      stackLeft(gap, unit)
      break;
    case 'right':
      stackRight(gap, unit)
      break;
    case 'up':
      stackUp(gap, unit)
      break;
    case 'down':
      stackDown(gap, unit)
      break;
  }
}



function stackLeft(gapValue, unitValue) {
  let gap = gapValue;
  console.log(unitValue)

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ 
    SlidesApp.getUi().alert('Select select two or more shapes to perform this operation');
    return 
  }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length >= 2){  
      let nextShapePosition = 0;

      // sort arrays from left position to determine order for the iterative operation of setting gap
      let sorted = elements.sort((a, b) => a.getLeft() - b.getLeft());

      for (let i = 0; i < sorted.length; i++) {
        let leftPosition = nextShapePosition > 0 ? nextShapePosition : sorted[i].getLeft()
        
        sorted[i].setLeft(leftPosition);

        nextShapePosition = sorted[i].getLeft() + sorted[i].getWidth() + gap;
      }
    }else{
      SlidesApp.getUi().alert('Select two or more shapes to perform this operation');
    }
  }       
}

//============================================================================================================================


function stackRight(gapValue, unitValue) {
  let gap = gapValue;

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length >= 2){  
      let nextShapePosition = 0;
      let sorted = elements.sort((a, b) => (b.getLeft() + b.getWidth()) - (a.getLeft() + a.getWidth()));

      for (let i = 0; i < sorted.length; i++) {
        let rightPosition = nextShapePosition > 0 ? nextShapePosition : (sorted[i].getLeft() + sorted[i].getWidth())

        sorted[i].setLeft(rightPosition - sorted[i].getWidth());
        nextShapePosition = sorted[i].getLeft() - gap;
      }

    }else{
      SlidesApp.getUi().alert('Select two or more shapes to perform this operation');
    }
  }       
}
//============================================================================================================================


function stackUp(gapValue, unitValue) {
  let gap = gapValue;
  console.log(unitValue)

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ 
    SlidesApp.getUi().alert('Select select two or more shapes to perform this operation');
    return 
  }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length >= 2){  
      let nextShapePosition = 0;

      // sort arrays from left position to determine order for the iterative operation of setting gap
      let sorted = elements.sort((a, b) => a.getTop() - b.getTop());

      for (let i = 0; i < sorted.length; i++) {
        let topPosition = nextShapePosition > 0 ? nextShapePosition : sorted[i].getTop()

        sorted[i].setTop(topPosition);
        nextShapePosition = sorted[i].getTop() + sorted[i].getHeight() + gap;
      }
    }else{
      SlidesApp.getUi().alert('Select two or more shapes to perform this operation');
    }
  }       
}

//============================================================================================================================

function stackDown(gapValue, unitValue) {
  let gap = gapValue;
  console.log(unitValue)

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ 
    SlidesApp.getUi().alert('Select select two or more shapes to perform this operation');
    return 
  }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length >= 2){  
      let nextShapePosition = 0;

      // sort arrays from left position to determine order for the iterative operation of setting gap
      let sorted = elements.sort((a, b) => (b.getTop()+b.getHeight()) - (a.getTop()+a.getHeight()));

      for (let i = 0; i < sorted.length; i++) {
        let bottomPosition = nextShapePosition > 0 ? nextShapePosition : (sorted[i].getTop() + sorted[i].getHeight())

        sorted[i].setTop(bottomPosition - sorted[i].getHeight());
        nextShapePosition = sorted[i].getTop() - gap;
      }
    }else{
      SlidesApp.getUi().alert('Select two or more shapes to perform this operation');
    }
  }       
}
