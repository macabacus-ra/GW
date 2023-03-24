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
//============================================================================================================================
//============================================================================================================================

function stackRight(gapValue, unitValue) {
  let gap = gapValue;

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if (pageElementRange){

    let elements = pageElementRange.getPageElements()

    if(elements.length >= 2){  

      let nextShapePosition = 0;

      // sort arrays from left position to determine order for the iterative operation of setting gap
      let sorted = elements.sort((a, b) => b.getLeft() + b.getWidth() - (a.getLeft() + a.getWidth()));

      //for the sort above, since we do not have a shape.right property
      //a narrower width shape and a wider shape will not give the proper
      // "right-most" shape because we are only accessing its left position.
      // hence, we need to add it's width to ensure the right-most

      // for the first element in the sorted shapes array
      // we will not change its horizontal position
      // for the next elements we will change their left position accordingly

      let obj = {
        firstLeftPosition: sorted[0].left,
        nextLeft: null
      };

      for (let i = 0; i < sorted.length; i++) {
        if (i < 1) {
          // first, right-most shape position will not change, just being specific here
          sorted[i].left = obj.firstLeftPosition;
          //for the next iteration, set the position of the next right-most shape

          obj.nextLeft = sorted[i].getLeft() - gap - sorted[i + 1].getWidth();

        } else if (i === sorted.length - 1) {
          //for the last iteration, we are not incrementing,this was causing the whole code to fail.
          sorted[i].setLeft(obj.nextLeft)
          
        } else {
          //everything in between the first and last shapes  happens here...

          sorted[i].setLeft(obj.nextLeft);
          obj.nextLeft = sorted[i].getLeft() - gap - sorted[i + 1].getWidth();

        }
      }
    }else{
      SlidesApp.getUi().alert('Select two or more shapes to perform this operation');
    }
  }       
}
//============================================================================================================================
//============================================================================================================================
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
